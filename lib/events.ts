import type { CarEvent, EventType } from "@/lib/types";
import { SEED_1 } from "@/lib/seed1";
import { SEED_2 } from "@/lib/seed2";
import { SEED_3 } from "@/lib/seed3";
import { SEED_4 } from "@/lib/seed4";
import { SEED_5 } from "@/lib/seed5";
import { SEED_6 } from "@/lib/seed6";
import { SEED_7 } from "@/lib/seed7";
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

const SEED: CarEvent[] = [...SEED_1, ...SEED_2, ...SEED_3, ...SEED_4, ...SEED_5, ...SEED_6, ...SEED_7];
const today = () => new Date().toISOString().slice(0, 10);

/** Bundled seed events (used as the always-on base and to pre-seed the database). */
export function getSeedEvents(): CarEvent[] {
  return SEED;
}

/** Approved Supabase submissions, if the database is connected. Never throws. */
async function getDbEvents(): Promise<CarEvent[]> {
  if (!dbEnabled) return [];
  try {
    const sb = getClient();
    if (!sb) return [];
    const { data, error } = await sb
      .from("events")
      .select("*")
      .eq("status", "approved")
      .gte("end_date", today())
      .order("start_date", { ascending: true })
      .limit(5000);
    if (!error && data) return (data as EventRow[]).map(rowToEvent);
  } catch {
    /* ignore — just return seed */
  }
  return [];
}

/**
 * Upcoming, approved events. Always includes the bundled seed events, and
 * MERGES in approved Supabase submissions on top when the database is
 * connected. DB identity ids start at 500000 (see schema.sql) so they never
 * clash with seed ids — so the live site never goes blank and existing event
 * URLs stay valid even after the public submission form is switched on.
 */
export async function getUpcomingEvents(): Promise<CarEvent[]> {
  const seedUpcoming = SEED.filter((e) => e.end >= today());
  const dbEvents = await getDbEvents();
  const seen = new Set(seedUpcoming.map((e) => e.id));
  const merged = [...seedUpcoming, ...dbEvents.filter((e) => !seen.has(e.id))];
  return merged.sort((a, b) => a.start.localeCompare(b.start));
}

export async function getEventById(id: number): Promise<CarEvent | undefined> {
  const seedHit = SEED.find((e) => e.id === id);
  if (seedHit) return seedHit;
  if (dbEnabled) {
    try {
      const sb = getClient();
      if (sb) {
        const { data } = await sb
          .from("events")
          .select("*")
          .eq("id", id)
          .eq("status", "approved")
          .maybeSingle();
        if (data) return rowToEvent(data as EventRow);
      }
    } catch {
      /* ignore */
    }
  }
  return undefined;
}
