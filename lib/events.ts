import type { CarEvent, EventType } from "@/lib/types";
import { SEED_1 } from "@/lib/seed1";
import { SEED_2 } from "@/lib/seed2";
import { SEED_3 } from "@/lib/seed3";

export const CATEGORIES: { type: EventType; label: string; img: number }[] = [
  { type: "show", label: "Car Shows", img: 17075732 },
  { type: "meet", label: "Meets", img: 16896020 },
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

const SEED: CarEvent[] = [...SEED_1, ...SEED_2, ...SEED_3];

export function getAllEvents(): CarEvent[] { return SEED; }

// Only events whose end date is today or later — past events expire automatically.
export function getUpcomingEvents(): CarEvent[] {
  const today = new Date().toISOString().slice(0, 10);
  return SEED.filter((e) => e.end >= today).sort((a, b) => a.start.localeCompare(b.start));
}

export function getEventById(id: number): CarEvent | undefined {
  return SEED.find((e) => e.id === id);
}

export const REGIONS: string[] = Array.from(new Set(SEED.map((e) => e.region))).sort();
