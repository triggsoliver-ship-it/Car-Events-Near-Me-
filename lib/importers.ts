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
  kind: "ical" | "jsonld" | "json" | "csv";
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

async function fetchText(url: string): Promise<string> {
  const res = await fetch(url, { headers: { "User-Agent": "CarEventsNearMeBot/1.0 (+https://careventsnearme.uk)" } });
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
