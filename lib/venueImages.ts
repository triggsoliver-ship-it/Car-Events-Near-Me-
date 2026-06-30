import type { CarEvent, EventType } from "@/lib/types";

/**
 * Code-level image resolver keyed on each event's name / venue / organiser.
 *
 * The live site serves events from Supabase (ids 1000+) that only carry a
 * Pexels stock-photo id, so without this resolver almost every event shows the
 * same handful of generic stock images. Because `imgUrl` only exists on a few
 * seed rows, we instead match on strings that EVERY event has — `name`,
 * `venue` and `organiser` — and pull a real, relevant photo through.
 *
 * Where an event has an official / booking website with a usable photographic
 * og:image (or hero photo), we copy that exact image URL and serve it through
 * our own /img proxy so it loads regardless of cross-origin hotlink protection.
 * Only photos actually retrieved and verified from each event's own site are
 * used here; anything without a usable real photo falls back to a relevant,
 * licence-free Pexels image from CATEGORY_IMAGES.
 *
 * This module is intentionally plain TypeScript data plus one pure function so
 * it can be imported by client components (e.g. components/Explore.tsx) as well
 * as server components. No server-only APIs, no new dependencies.
 */

// Pexels helper mirroring lib/util.ts `px` but producing a wide hero crop.
const pex = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=800`;

// Real photos are served through our own /img proxy when the source blocks
// cross-origin hotlinking (see app/img/route.ts). Every host wrapped here must
// be present in that route's ALLOW set.
const proxy = (url: string) => `/img?u=${encodeURIComponent(url)}`;

// Genuine track-day photography from trackdays.co.uk — the booking partner most
// track days link to. Their CDN blocks cross-origin hotlinking, so these are
// served via the /img proxy. Rotated per event so they don't all look identical.
export const TRACKDAY_PHOTOS = [
  proxy("https://cdn.trackdays.co.uk/cdn-cgi/image/format=auto,fit=cover,width=1200,height=800/imgs/book-car-trackday.jpg"),
  proxy("https://cdn.trackdays.co.uk/cdn-cgi/image/format=auto,fit=cover,width=1200,height=800/imgs/book-driving-experience.jpg"),
  proxy("https://cdn.trackdays.co.uk/cdn-cgi/image/format=auto,fit=cover,width=1200,height=800/imgs/driving-experiences/driving-experience-calendar.jpg"),
];

export type VenueImageRule = { test: RegExp; url: string };

/**
 * Ordered list of rules. The first rule whose `test` matches the combined
 * lowercased `${name} ${venue} ${organiser}` string wins, so put more specific
 * patterns before broader ones.
 */
export const VENUE_IMAGE_RULES: VenueImageRule[] = [
  // ── Goodwood (FoS / Revival / Members' Meeting / Breakfast Club) ──────────
  // Real Goodwood hero photography (Jayson Fong) pulled from goodwood.com via
  // an in-browser DOM read, served through /img. Breakfast Club's own page is
  // a 404 with no usable photo, so it keeps a relevant licence-free image.
  { test: /goodwood breakfast club/, url: pex(10809693) },
  { test: /goodwood revival/, url: proxy("https://www.goodwood.com/bynderassets/90937/Website-Revival2018_JaysonFong_0031.jpg") },
  { test: /goodwood/, url: proxy("https://www.goodwood.com/bynderassets/5498/Website-FOS2022_JaysonFong_0292.jpg") },

  // ── Venues / shows (real photo from each event's own official site) ───────
  { test: /beaulieu|national motor museum/, url: "https://www.beaulieu.co.uk/wp-content/uploads/2016/11/2-e1740762014153.jpg" },
  // NEC Classic Motor Show — real hero of classic cars from the official site's
  // ASP Events CDN, served via /img.
  { test: /\bnec\b|necbirmingham|birmingham nec/, url: proxy("https://cdn.asp.events/CLIENT_CL_EE_9A415A31_C601_41ED_1AF7C7E527DCB474/sites/classic-motor-show-2025/media/graphics/CMS-DYNAMIC-BACKGROUND-2026-3-main-cars.png") },
  // The British Motor Show — real crowd photo from their official site.
  { test: /farnborough|british motor show/, url: proxy("https://www.thebritishmotorshow.live/wp-content/uploads/2026/02/Crowd-1.png") },
  { test: /blenheim|salon priv/, url: "https://www.salonpriveconcours.com/wp-content/uploads/2021/03/salonprive-facebook-blue.jpg" },
  // Concours of Elegance (Hampton Court Palace) — real car photo from the
  // official concoursofelegance.co.uk media library, served via /img.
  { test: /hampton court|concours of elegance/, url: proxy("https://concoursofelegance.co.uk/wp-content/uploads/2025/11/Concours-of-Elegance-Side-Exhaust.jpg") },
  { test: /brooklands/, url: "https://www.brooklandsmuseum.com/media/bx3fphxr/brooklands-museum-surrey-concorde-aviation-aircraft-family.jpg" },
  // Bonhams Cars / "THE MARKET" (MPH, Bicester) — real Ferrari Testarossa
  // hero photo from their official CDN, served via /img.
  { test: /bonhams|\bmph\b|bicester/, url: proxy("https://cdn.themarket.co.uk/content/2688x800/7a9486ac15/ferrari-testarossa.jpg") },
  // Race Retro (Stoneleigh Park) — real event photo from the official site's
  // ASP Events CDN, served via /img.
  { test: /stoneleigh|race retro/, url: proxy("https://cdn.asp.events/CLIENT_CL_EE_9A415A31_C601_41ED_1AF7C7E527DCB474/sites/race-retro-2026/media/pages/welcome/220225_RAC_0939.jpg/fit-in/1920x9999/filters:no_upscale()") },
  // Iconic Auctioneers — real classic-car photo from their official site
  // (og:image). Served directly; host is allow-listed in /img anyway.
  { test: /iconic auctioneers|iconic auction/, url: proxy("https://www.iconicauctioneers.com/images/2023/08/09/ia002_brochure_2023_02_dg-pt-amends_page_10_image_0001.jpg") },
  { test: /telford/, url: pex(20406502) },
  { test: /eikon/, url: pex(20406502) },
  { test: /olympia/, url: "https://www.thelondonclassiccarshow.co.uk/wp-content/uploads/Main-Slider-shots-1-1.jpg" },

  // ── Meet series ───────────────────────────────────────────────────────────
  { test: /caffeine ?(&|and)? ?machine/, url: "https://media.caffeineandmachine.com/20250311150854/Caffeine-and-Machine-1024x576.jpg" },
  { test: /cars ?(&|and)? ?coffee/, url: pex(33419743) },
  { test: /podium place/, url: pex(3608542) },
  { test: /ace cafe/, url: pex(2533092) },
  { test: /crystal palace/, url: pex(2127733) },
  { test: /newlands corner/, url: pex(33419743) },
  { test: /shift social/, url: pex(3608542) },
];

/**
 * Relevant licence-free Pexels photos per category, used when no venue rule
 * matches. A stable per-event index spreads events across each array so
 * visually-similar events don't all repeat one picture. Each category keeps
 * four DISTINCT, on-topic automotive photographs so the long-tail catch-all
 * still looks varied and relevant.
 */
export const CATEGORY_IMAGES: Record<EventType, string[]> = {
  show: [pex(17075732), pex(29252120), pex(12801211), pex(112452)],
  meet: [pex(33419743), pex(3608542), pex(2533092), pex(1335077)],
  modified: [pex(20406502), pex(3729464), pex(2127733), pex(170811)],
  classic: [pex(2272281), pex(248687), pex(13683840), pex(112460)],
  "track day": [pex(15155737), pex(11488012), pex(12789344), pex(3354648)],
  auction: [pex(34879476), pex(29831803), pex(112452), pex(2127015)],
  autojumble: [pex(17356337), pex(13683840), pex(2244746), pex(190574)],
  motorsport: [pex(10373678), pex(10807493), pex(12801211), pex(2526128)],
};

/**
 * Resolve a real, relevant image URL for an event.
 *
 * 1. Track-day events get a genuine trackdays.co.uk photo (rotated by id).
 * 2. Otherwise the first VENUE_IMAGE_RULES rule whose `test` matches wins.
 * 3. Otherwise pick from CATEGORY_IMAGES[e.type] using a stable id-based index.
 * 4. Returns undefined if nothing applies (caller falls back to the Pexels id).
 */
export function resolveEventImage(e: CarEvent): string | undefined {
  if (e.type === "track day") {
    const i = ((e.id % TRACKDAY_PHOTOS.length) + TRACKDAY_PHOTOS.length) % TRACKDAY_PHOTOS.length;
    return TRACKDAY_PHOTOS[i];
  }
  const hay = `${e.name} ${e.venue} ${e.organiser}`.toLowerCase();
  for (const rule of VENUE_IMAGE_RULES) {
    if (rule.test.test(hay)) return rule.url;
  }
  const pool = CATEGORY_IMAGES[e.type];
  if (pool && pool.length) {
    const idx = ((e.id % pool.length) + pool.length) % pool.length;
    return pool[idx];
  }
  return undefined;
}
