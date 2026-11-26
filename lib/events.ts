import type { CarEvent, EventType } from "@/lib/types";
import { SEED_1 } from "@/lib/seed1";
import { SEED_2 } from "@/lib/seed2";
import { SEED_3 } from "@/lib/seed3";
import { SEED_4 } from "@/lib/seed4";
import { SEED_5 } from "@/lib/seed5";
import { SEED_6 } from "@/lib/seed6";
import { SEED_7 } from "@/lib/seed7";
import { SEED_8 } from "@/lib/seed8";
import { SEED_9 } from "@/lib/seed9";
import { SEED_10 } from "@/lib/seed10";
import { SEED_11 } from "@/lib/seed11";
import { SEED_12 } from "@/lib/seed12";
import { dbEnabled, getClient, rowToEvent, EventRow } from "@/lib/db";

export const CATEGORIES: { type: EventType; label: string; img: number }[] = [
  { type: "show", label: "Car Shows", img: 17075732 },
  { type: "meet", label: "Meets", img: 33419743 },
  { type: "track day", label: "Track Days", img: 15155737 },
  { type: "classic", label: "Classic", img: 2272281 },
  { type: "modified", label: "Modified", img: 20406502 },
  { type: "motorsport", label: "Motorsport", img: 10373678 },
  { type: "auction", label: "Auctions", img: 34879476 },
  { type: "autojumble", label: "Autojumbles", img: 17356337 },
];

export const TYPES: EventType[] = [
  "show", "meet", "modified", "classic", "track day", "auction", "autojumble", "motorsport",
];

export const REGIONS: string[] = [
  "East Midlands", "East of England", "London", "North East", "North West",
  "Northern Ireland", "Scotland", "South East", "South West", "Wales",
  "West Midlands", "Yorkshire",
];

// Bundled seed events. When Supabase is connected the live data comes from the
// database (which was pre-seeded from this same data and now also holds
// partner events + public submissions). This array is the fallback used only
// if the database is unreachable, so the site never breaks.
const SEED: CarEvent[] = [...SEED_1, ...SEED_2, ...SEED_3, ...SEED_4, ...SEED_5, ...SEED_6, ...SEED_7, ...SEED_8, ...SEED_9, ...SEED_10, ...SEED_11, ...SEED_12];
const today = () => new Date().toISOString().slice(0, 10);

// "Dates TBA" lives only in the bundled seed (no DB column needed): DB rows
// for seed events carry external_id "seed-<id>", so the label is re-attached
// here, and those rows are fetched even though their end_date has passed.
const TBA = new Map(SEED.filter((e) => e.datesTBA).map((e) => ["seed-" + e.id, e.datesTBA as string]));
const withTBA = (r: EventRow): CarEvent => {
  const e = rowToEvent(r);
  const t = r.external_id ? TBA.get(r.external_id) : undefined;
  return t ? { ...e, datesTBA: t } : e;
};
const byDateTBA = (a: CarEvent, b: CarEvent) =>
  (a.datesTBA ? 1 : 0) - (b.datesTBA ? 1 : 0) || a.start.localeCompare(b.start);

/** Bundled seed events (fallback + used to pre-seed the database). */
export function getSeedEvents(): CarEvent[] {
  return SEED;
}

/** Upcoming, approved events — from Supabase if configured, else seed. */
export async function getUpcomingEvents(): Promise<CarEvent[]> {
  if (dbEnabled) {
    try {
      const sb = getClient();
      if (sb) {
        const { data, error } = await sb
          .from("events")
          .select("*")
          .eq("status", "approved")
          .gte("end_date", today())
          .order("start_date", { ascending: true })
          .limit(5000);
        if (!error && data) {
          const rows = data as EventRow[];
          if (TBA.size) {
            const have = new Set(rows.map((r) => r.external_id));
            const { data: tba } = await sb
              .from("events")
              .select("*")
              .eq("status", "approved")
              .in("external_id", [...TBA.keys()]);
            for (const r of (tba || []) as EventRow[]) if (!have.has(r.external_id)) rows.push(r);
          }
          return rows.map(withTBA).sort(byDateTBA);
        }
      }
    } catch {
      /* fall through to seed */
    }
  }
  return SEED.filter((e) => e.datesTBA || e.end >= today()).sort(byDateTBA);
}

/**
 * A single event by id, for the /events/[id] detail page.
 *
 * Deliberately NOT filtered by status: this is what makes a direct link to a
 * pending event work as a private preview (e.g. sending an organiser a link
 * to check their listing before it's published) while getUpcomingEvents()
 * above — which powers browse, search and the sitemap — stays approved-only.
 * A pending event is reachable only by someone who already has the exact
 * URL; it is not listed, searched, or indexed anywhere (see generateMetadata
 * in app/events/[id]/page.tsx, which sets noindex/nofollow for non-approved
 * events).
 */
export async function getEventById(id: number): Promise<CarEvent | undefined> {
  if (dbEnabled) {
    try {
      const sb = getClient();
      if (sb) {
        const { data } = await sb
          .from("events")
          .select("*")
          .eq("id", id)
          .maybeSingle();
        if (data) return withTBA(data as EventRow);
      }
    } catch {
      /* fall through to seed */
    }
  }
  return SEED.find((e) => e.id === id);
}
