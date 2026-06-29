import type { EventType } from "@/lib/types";

/** A normalised event ready to upsert into the DB. */
export type ImportRow = {
  name: string;
  type: EventType;
  region: string | null;
  county: string | null;
  town: string | null;
  venue: string | null;
  start_date: string;
  end_date: string;
  organiser: string | null;
  description: string | null;
  booking_url: string | null;
  img: number;
  tiers: { name: string; price: number }[];
  free: boolean;
  status: "approved";
  source: string;
  external_id: string;
};

/** A curated source. Supports organiser iCal feeds, schema.org JSON-LD pages,
 *  and mapped affiliate product feeds (JSON or CSV). Add entries here (SETUP.md). */
export type Source = {
  name: string;
  url: string;
  kind: "ical" | "jsonld" | "json" | "csv" | "trackdays";
  type: EventType;
  region: string;
  county?: string;
  town?: string;
  venue?: string;
  organiser?: string;
  img?: number;
  root?: string;                 // json: dot-path to the array of events
  map?: Record<string, string>;  // our field -> their key/column (name,start,end,town,venue,region,county,price,bookingUrl,description)
};

// Add real, permitted sources here (affiliate feeds, organiser iCal feeds, etc.).
export const SOURCES: Source[] = [
  { name: "TrackDays", url: "https://www.trackdays.co.uk/rss-feeds/car-trackdays/", kind: "trackdays", type: "track day", region: "Other", organiser: "TrackDays.co.uk", img: 15155737 },
  // Affiliate product feed example (fill in once you have the feed URL + field names):
  // { name: "TrackDays", url: "https://feed.example.com/trackdays.json", kind: "json", type: "track day",
  //   region: "Other", organiser: "TrackDays.co.uk", img: 15155737, root: "events",
  //   map: { name: "title", start: "date", town: "venueTown", venue: "venue", region: "region",
  //          price: "fromPrice", bookingUrl: "url", description: "summary" } },
];

const isoDate = (raw: string): string => {
  const s = String(raw).trim();
  let m = s.match(/(\d{4})-(\d{2})-(\d{2})/);            // ISO yyyy-mm-dd
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = s.match(/^(\d{1,2})[\/.](\d{1,2})[\/.](\d{2,4})/); // UK dd/mm/yyyy
  if (m) { let [, d, mo, y] = m; if (y.length === 2) y = "20" + y; return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`; }
  const t = Date.parse(s);
  if (!isNaN(t)) return new Date(t).toISOString().slice(0, 10);
  const dig = s.replace(/[^0-9]/g, "");                    // iCal yyyymmdd
  if (dig.length >= 8 && (dig.startsWith("20") || dig.startsWith("19"))) return `${dig.slice(0,4)}-${dig.slice(4,6)}-${dig.slice(6,8)}`;
  return "";
};

const tiersFor = (price: number) =>
  price > 0 ? [{ name: "Entry", price }] : [{ name: "Free Entry", price: 0 }];

/** Read a value by dot/bracket path from a nested object. */
function getPath(obj: any, path: string): any {
  if (!path) return undefined;
  return path.split(/[.\[\]]+/).filter(Boolean).reduce((o, k) => (o == null ? o : o[k]), obj);
}

/** Minimal iCalendar VEVENT parser (handles the common case). */
export function parseICS(ics: string) {
  const out: { uid: string; title: string; start: string; end: string; location: string; url: string; desc: string }[] = [];
  const blocks = ics.split("BEGIN:VEVENT").slice(1);
  for (const raw of blocks) {
    const body = raw.split("END:VEVENT")[0];
    const get = (k: string) => {
      const m = body.match(new RegExp("(?:^|\\n)" + k + "[^:\\n]*:(.*)"));
      return m ? m[1].trim().replace(/\\r$/, "") : "";
    };
    const start = isoDate(get("DTSTART"));
    if (!start) continue;
    out.push({
      uid: get("UID"),
      title: get("SUMMARY"),
      start,
      end: isoDate(get("DTEND")) || start,
      location: get("LOCATION"),
      url: get("URL"),
      desc: get("DESCRIPTION"),
    });
  }
  return out;
}

/** Extract schema.org Event objects from a page's JSON-LD blocks. */
export function parseJsonLd(html: string) {
  const out: any[] = [];
  const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    try {
      const json = JSON.parse(m[1].trim());
      const items = Array.isArray(json) ? json : json["@graph"] || [json];
      for (const it of items) {
        const t = it["@type"];
        if (t === "Event" || (Array.isArray(t) && t.includes("Event"))) out.push(it);
      }
    } catch {
      /* ignore malformed JSON-LD */
    }
  }
  return out;
}

/** Parse simple CSV into row objects keyed by header. Handles quotes + commas. */
export function parseCsv(text: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [], cur = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') q = false;
      else cur += c;
    } else if (c === '"') q = true;
    else if (c === ",") { row.push(cur); cur = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cur); cur = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    } else cur += c;
  }
  if (cur !== "" || row.length) { row.push(cur); rows.push(row); }
  if (!rows.length) return [];
  const headers = rows[0].map((h) => h.trim());
  return rows.slice(1).map((r) => Object.fromEntries(headers.map((h, i) => [h, (r[i] ?? "").trim()])));
}

function mappedRow(rec: any, s: Source): ImportRow | null {
  const map = s.map || {};
  const pick = (k: string) => (map[k] ? getPath(rec, map[k]) : undefined);
  const name = pick("name");
  const start = isoDate(String(pick("start") || ""));
  if (!name || !start) return null;
  const priceRaw = pick("price");
  const price = priceRaw != null && priceRaw !== "" ? parseFloat(String(priceRaw).replace(/[^0-9.]/g, "")) : 0;
  const booking = pick("bookingUrl") || s.url;
  return {
    name: String(name).slice(0, 200),
    type: s.type,
    region: (pick("region") as string) || s.region,
    county: (pick("county") as string) || s.county || null,
    town: (pick("town") as string) || s.town || null,
    venue: (pick("venue") as string) || s.venue || null,
    start_date: start,
    end_date: isoDate(String(pick("end") || "")) || start,
    organiser: s.organiser || s.name,
    description: pick("description") ? String(pick("description")).slice(0, 500) : null,
    booking_url: booking,
    img: s.img || 10373678,
    tiers: tiersFor(isNaN(price) ? 0 : price),
    free: !price,
    status: "approved",
    source: "import:" + s.name,
    external_id: "feed-" + s.name + "-" + String(booking || name + start).slice(0, 80),
  };
}


// ---- TrackDays.co.uk affiliate feed (HTML table) ----
const TD_VENUES: Record<string, { region: string; county: string; town: string }> = {
  "Brands Hatch": { region: "South East", county: "Kent", town: "West Kingsdown" },
  "Snetterton": { region: "East of England", county: "Norfolk", town: "Norwich" },
  "Oulton Park": { region: "North West", county: "Cheshire", town: "Little Budworth" },
  "Cadwell Park": { region: "East Midlands", county: "Lincolnshire", town: "Louth" },
  "Donington Park": { region: "East Midlands", county: "Leicestershire", town: "Castle Donington" },
  "Silverstone": { region: "East Midlands", county: "Northamptonshire", town: "Towcester" },
  "Castle Combe": { region: "South West", county: "Wiltshire", town: "Chippenham" },
  "Bedford Autodrome": { region: "East of England", county: "Bedfordshire", town: "Bedford" },
  "Anglesey": { region: "Wales", county: "Anglesey", town: "Ty Croes" },
  "Croft": { region: "North East", county: "North Yorkshire", town: "Darlington" },
  "Thruxton": { region: "South East", county: "Hampshire", town: "Andover" },
  "Mallory Park": { region: "East Midlands", county: "Leicestershire", town: "Hinckley" },
  "Blyton Park": { region: "Yorkshire", county: "Lincolnshire", town: "Gainsborough" },
  "Lydden Hill": { region: "South East", county: "Kent", town: "Dover" },
  "Goodwood": { region: "South East", county: "West Sussex", town: "Chichester" },
  "Abingdon Track Days": { region: "South East", county: "Oxfordshire", town: "Abingdon" },
  "Abingdon": { region: "South East", county: "Oxfordshire", town: "Abingdon" },
  "Seighford": { region: "West Midlands", county: "Staffordshire", town: "Stafford" },
};
const TD_VENUE_KEYS = Object.keys(TD_VENUES).sort((a, b) => b.length - a.length);

/** Parse the TrackDays.co.uk car-track-days feed. Date-anchored so it is robust
 *  to table markup: each row begins with a dd/mm/yy date; bookable rows contain a
 *  /book/cartrackday/<id>/ link with a price. Non-UK venues and "Full" rows are skipped. */
export function parseTrackdaysHtml(html: string, s: Source): ImportRow[] {
  const rows: ImportRow[] = [];
  const clean = html.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
  const dates = [...clean.matchAll(/(\d{2})\/(\d{2})\/(\d{2})/g)];
  for (let i = 0; i < dates.length; i++) {
    const d = dates[i];
    const seg = clean.slice(d.index!, dates[i + 1]?.index ?? clean.length);
    const link = seg.match(/href="(https?:\/\/www\.trackdays\.co\.uk\/book\/cartrackday\/(\d+)\/)"[^>]*>\s*£?\s*([\d,]+(?:\.\d+)?)/i);
    if (!link) continue; // not bookable
    const text = seg.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/\s+/g, " ");
    const venue = TD_VENUE_KEYS.find((v) => text.includes(v));
    if (!venue) continue; // non-UK / unknown venue
    const loc = TD_VENUES[venue];
    const start = `20${d[3]}-${d[2]}-${d[1]}`;
    const price = parseFloat(link[3].replace(/,/g, ""));
    const after = text.slice(text.indexOf(venue) + venue.length).trim();
    const fmt = after.split(/\d+\s*dB/)[0].replace(/N\/A|Full|Static|Drive By/gi, "").trim();
    rows.push({
      name: `${venue} Track Day`,
      type: s.type,
      region: loc.region,
      county: loc.county,
      town: loc.town,
      venue,
      start_date: start,
      end_date: start,
      organiser: "TrackDays.co.uk",
      description: (fmt ? fmt + " — " : "") + "Take your own car on track. Booked via TrackDays.co.uk.",
      booking_url: link[1],
      img: s.img || 15155737,
      tiers: [{ name: "Driver", price: isNaN(price) ? 0 : price }],
      free: false,
      status: "approved",
      source: "import:" + s.name,
      external_id: "trackdays-" + link[2],
    });
  }
  return rows;
}

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-GB,en;q=0.9",
      "Referer": "https://careventsnearme.uk/",
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.text();
}

async function importSource(s: Source): Promise<ImportRow[]> {
  const rows: ImportRow[] = [];
  const text = await fetchText(s.url);
  if (s.kind === "ical") {
    for (const e of parseICS(text)) {
      if (!e.title) continue;
      rows.push({
        name: e.title, type: s.type, region: s.region, county: s.county || null,
        town: s.town || null, venue: s.venue || e.location || null,
        start_date: e.start, end_date: e.end, organiser: s.organiser || s.name,
        description: e.desc ? e.desc.slice(0, 500) : null, booking_url: e.url || s.url,
        img: s.img || 10373678, tiers: tiersFor(0), free: true, status: "approved",
        source: "import:" + s.name, external_id: "ics-" + s.name + "-" + (e.uid || e.start + e.title),
      });
    }
  } else if (s.kind === "jsonld") {
    for (const e of parseJsonLd(text)) {
      const start = isoDate(String(e.startDate || ""));
      if (!start || !e.name) continue;
      rows.push({
        name: String(e.name), type: s.type, region: s.region, county: s.county || null,
        town: s.town || null, venue: s.venue || (e.location && e.location.name) || null,
        start_date: start, end_date: isoDate(String(e.endDate || "")) || start,
        organiser: s.organiser || s.name, description: e.description ? String(e.description).slice(0, 500) : null,
        booking_url: e.url || s.url, img: s.img || 10373678, tiers: tiersFor(0), free: true,
        status: "approved", source: "import:" + s.name,
        external_id: "jsonld-" + s.name + "-" + start + "-" + String(e.name).slice(0, 40),
      });
    }
  } else if (s.kind === "trackdays") {
    rows.push(...parseTrackdaysHtml(text, s));
  } else {
    // json | csv mapped product feed
    let records: any[] = [];
    if (s.kind === "csv") records = parseCsv(text);
    else {
      const json = JSON.parse(text);
      records = s.root ? getPath(json, s.root) : json;
      if (!Array.isArray(records)) records = [];
    }
    for (const rec of records) {
      const r = mappedRow(rec, s);
      if (r) rows.push(r);
    }
  }
  return rows;
}

/** Run every configured source. Each is isolated so one failure never breaks the rest. */
export async function runImport(): Promise<{ rows: ImportRow[]; errors: string[] }> {
  const rows: ImportRow[] = [];
  const errors: string[] = [];
  for (const s of SOURCES) {
    try {
      rows.push(...(await importSource(s)));
    } catch (err: any) {
      errors.push(s.name + ": " + (err?.message || "failed"));
    }
  }
  return { rows, errors };
}
