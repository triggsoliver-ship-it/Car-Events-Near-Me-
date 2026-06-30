import { resolveEventImage } from "@/lib/venueImages";
import type { CarEvent } from "@/lib/types";

// Pexels image helper (license-free; commercial use OK)
export const px = (id: number, w = 900, h = 600) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

// Prefer an event's real official OG share image when present, then a
// code-level venue/organiser/category match (covers DB events that only carry
// a Pexels id), otherwise fall back to the licence-free Pexels photo.
export const eventImg = (
  e: CarEvent,
  w = 900,
  h = 600
) => e.imgUrl || resolveEventImage(e) || px(e.img, w, h);

export const GRAD = [
  "linear-gradient(135deg,#ff5118,#ffb800)",
  "linear-gradient(135deg,#22d3ee,#3b82f6)",
  "linear-gradient(135deg,#8b5cf6,#ec4899)",
  "linear-gradient(135deg,#ef4444,#f59e0b)",
  "linear-gradient(135deg,#10b981,#06b6d4)",
  "linear-gradient(135deg,#6366f1,#a855f7)",
];

export const fmtPrice = (n: number) =>
  n === 0 ? "Free" : "£" + n.toFixed(2).replace(/\.00$/, "");

export function dateRange(start: string, end: string) {
  const o: Intl.DateTimeFormatOptions = { day: "numeric", month: "short" };
  const s = new Date(start), e = new Date(end);
  return start === end
    ? s.toLocaleDateString("en-GB", { ...o, year: "numeric" })
    : s.toLocaleDateString("en-GB", o) + "–" + e.toLocaleDateString("en-GB", { ...o, year: "numeric" });
}

export const priceFrom = (e: { tiers: { price: number }[] }) =>
  Math.min(...e.tiers.map((t) => t.price));
