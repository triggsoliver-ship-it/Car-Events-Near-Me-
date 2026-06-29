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
  free: boolean;
  status: "approved";
  source: string;
  external_id: string;
};

/** A curated feed source. iCal/RSS feeds and JSON-LD pages an organiser
 *  publishes. Add real feed URLs here (see SETUP.md) — each is tagged with
 *  metadata so imported events get a region/venue for filtering. */
export type Source = {
  name: string;
  url: string;
  kind: "ical" | "jsonld";
  type: EventType;
  region: string;
  county?: string;
  town?: string;
  venue?: string;
  organiser?: string;
  img?: number;
};

// Example sources — replace/extend with real feed URLs you have permission to use.
export const SOURCES: Source[] = [
  // { name: "Brands Hatch", url: "https://example.com/brands-hatch.ics", kind: "ical", type: "track day", region: "South East", county: "Kent", town: "West Kingsdown", venue: "Brands Hatch", organiser: "MSV", img: 15155737 },
];

const isoDate = (raw: string): string => {
  const d = raw.replace(/[^0-9]/g, "").slice(0, 8);
  return d.length === 8 ? `${d.slice(0, 4)}-${d.slice(4, 6)}-${d.slice(6, 8)}` : "";
};

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
        name: e.title,
        type: s.type,
        region: s.region,
        county: s.county || null,
        town: s.town || null,
        venue: s.venue || e.location || null,
        start_date: e.start,
        end_date: e.end,
        organiser: s.organiser || s.name,
        description: e.desc ? e.desc.slice(0, 500) : null,
        booking_url: e.url || s.url,
        img: s.img || 10373678,
        free: false,
        status: "approved",
        source: "import:" + s.name,
        external_id: "ics-" + s.name + "-" + (e.uid || e.start + e.title),
      });
    }
  } else {
    for (const e of parseJsonLd(text)) {
      const start = isoDate(String(e.startDate || ""));
      if (!start || !e.name) continue;
      rows.push({
        name: String(e.name),
        type: s.type,
        region: s.region,
        county: s.county || null,
        town: s.town || null,
        venue: s.venue || (e.location && e.location.name) || null,
        start_date: start,
        end_date: isoDate(String(e.endDate || "")) || start,
        organiser: s.organiser || s.name,
        description: e.description ? String(e.description).slice(0, 500) : null,
        booking_url: e.url || s.url,
        img: s.img || 10373678,
        free: false,
        status: "approved",
        source: "import:" + s.name,
        external_id: "jsonld-" + s.name + "-" + start + "-" + String(e.name).slice(0, 40),
      });
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
      const r = await importSource(s);
      rows.push(...r);
    } catch (err: any) {
      errors.push(s.name + ": " + (err?.message || "failed"));
    }
  }
  return { rows, errors };
}
