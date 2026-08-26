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
const SEED: CarEvent[] = [...SEED_1, ...SEED_2, ...SEED_3, ...SEED_4, ...SEED_5, ...SEED_6, ...SEED_7, ...SEED_8, ...SEED_9];
const today = () => new Date().toISOString().slice(0, 10);

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
        if (!error && data) return (data as EventRow[]).map(rowToEvent);
      }
    } catch {
      /* fall through to seed */
    }
  }
  return SEED.filter((e) => e.end >= today()).sort((a, b) => a.start.localeCompare(b.start));
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
        if (data) return rowToEvent(data as EventRow);
      }
    } catch {
      /* fall through to seed */
    }
  }
  return SEED.find((e) => e.id === id);
}
