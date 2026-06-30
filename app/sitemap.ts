import type { MetadataRoute } from "next";
import type { CarEvent } from "@/lib/types";
import { getUpcomingEvents, REGIONS } from "@/lib/events";
import { slugify, countiesFromEvents } from "@/lib/seo";

export const revalidate = 3600;
const BASE = "https://careventsnearme.uk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let events: CarEvent[] = [];
  try {
    events = await getUpcomingEvents();
  } catch {
    /* ignore — fall back to empty list */
  }

  const today = new Date().toISOString().slice(0, 10);
  const upcoming = events.filter((e) => e.end >= today);
  const counties = countiesFromEvents(upcoming);

  return [
    { url: BASE, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/track-days`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/list`, changeFrequency: "monthly", priority: 0.5 },
    ...REGIONS.map((r) => ({
      url: `${BASE}/car-events/${slugify(r)}`,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...counties.map((c) => ({
      url: `${BASE}/car-events/county/${slugify(c)}`,
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
    ...upcoming.map((e) => ({
      url: `${BASE}/events/${e.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
