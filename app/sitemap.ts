import type { MetadataRoute } from "next";
import { getUpcomingEvents } from "@/lib/events";

export const revalidate = 3600;
const BASE = "https://careventsnearme.uk";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let events: { id: number }[] = [];
  try { events = await getUpcomingEvents(); } catch { /* ignore */ }
  return [
    { url: BASE, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/list`, changeFrequency: "monthly", priority: 0.5 },
    ...events.map((e) => ({ url: `${BASE}/events/${e.id}`, changeFrequency: "weekly" as const, priority: 0.7 })),
  ];
}
