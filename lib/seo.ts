import type { CarEvent } from "@/lib/types";

/** Lowercase, trim, spaces/punctuation -> single hyphen. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Distinct county names present in the supplied events. */
export function countiesFromEvents(events: CarEvent[]): string[] {
  const set = new Set<string>();
  for (const e of events) if (e.county) set.add(e.county);
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

/** Map a slug back to a name using a list of candidate names. */
export function nameFromSlug(slug: string, names: string[]): string | undefined {
  return names.find((n) => slugify(n) === slug);
}
