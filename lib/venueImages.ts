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
 * This module is intentionally plain TypeScript data plus one pure function so
 * it can be imported by client components (e.g. components/Explore.tsx) as well
 * as server components. No server-only APIs, no new dependencies.
 *
 * URL sourcing:
 *  - Venue / series URLs marked "og:image" below were copied verbatim from the
 *    publisher's own Open Graph / Twitter share meta tags (retrieved live), so
 *    they are publisher-provided share images and fine to hotlink alongside the
 *    outbound booking link each event already carries.
 *  - Everywhere else we use licence-free Pexels photos in the exact format the
 *    repo already uses, choosing automotive imagery relevant to the category.
 */

// Pexels helper mirroring lib/util.ts `px` but producing a wide hero crop.
const pex = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1200&h=800`;

export type VenueImageRule = { test: RegExp; url: string };

/**
 * Ordered list of rules. The first rule whose `test` matches the combined
 * lowercased `${name} ${venue} ${organiser}` string wins, so put more specific
 * patterns before broader ones.
 */
export const VENUE_IMAGE_RULES: VenueImageRule[] = [
  // ── Goodwood (FoS / Revival / Members' Meeting / Breakfast Club) ──────────
  // Goodwood's site is a JS app that exposes no usable og:image; use relevant
  // motorsport / historic-racing Pexels photos instead.
  { test: /goodwood breakfast club/, url: pex(10809693) },
  { test: /goodwood/, url: pex(10807493) },

  // ── UK circuits (MSV circuits use video heroes with no og:image) ─────────
  { test: /brands hatch/, url: pex(12801211) },
  { test: /silverstone/, url: "https://www.silverstone.co.uk/sites/default/files/images/festival-hero.jpg" }, // og:image (seed-confirmed)
  { test: /thruxton/, url: pex(2127733) },
  { test: /donington/, url: "https://motorracinglegends.com/wp-content/uploads/website-DHF-poster-news-featured-1024x614.png" }, // og:image (seed-confirmed)
  { test: /oulton park/, url: pex(12789344) },
  { test: /snetterton/, url: pex(15155737) },
  { test: /cadwell park/, url: pex(2526128) },
  { test: /castle combe/, url: pex(3786091) },
  { test: /anglesey/, url: pex(2526127) },
  { test: /pembrey/, url: pex(3954425) },
  { test: /knockhill/, url: "https://media.knockhill.com/o/idc/2000x/f/2024/05/14/20240514131301-ade67071.jpg" }, // og:image (live-confirmed)
  { test: /lydden hill/, url: pex(12789347) },
  { test: /mallory park/, url: pex(3354648) },
  { test: /blyton park/, url: pex(2127733) },
  { test: /croft/, url: pex(12789344) },
  { test: /bedford autodrome|palmersport/, url: pex(3954425) },
  { test: /three sisters/, url: pex(12801211) },
  { test: /curborough/, url: pex(2526128) },
  { test: /santa pod/, url: pex(12790000) },
  { test: /abingdon/, url: pex(3786091) },
  { test: /llandow/, url: pex(2526127) },

  // ── Venues / shows ───────────────────────────────────────────────────────
  { test: /beaulieu|national motor museum/, url: "https://www.beaulieu.co.uk/wp-content/uploads/2016/11/2-e1740762014153.jpg" }, // og:image (seed-confirmed)
  { test: /\bnec\b|necbirmingham|birmingham nec/, url: pex(17075732) },
  { test: /farnborough|british motor show/, url: "https://www.thebritishmotorshow.live/wp-content/uploads/2026/02/Crowd-1.png" }, // og:image (seed-confirmed)
  { test: /blenheim|salon priv/, url: "https://www.salonpriveconcours.com/wp-content/uploads/2021/03/salonprive-facebook-blue.jpg" }, // og:image (seed-confirmed)
  { test: /hampton court|concours of elegance/, url: pex(112460) },
  { test: /brooklands/, url: "https://www.brooklandsmuseum.com/media/bx3fphxr/brooklands-museum-surrey-concorde-aviation-aircraft-family.jpg" }, // og:image (live-confirmed)
  { test: /stoneleigh|race retro/, url: pex(10373678) },
  { test: /telford/, url: pex(20406502) },
  { test: /eikon/, url: pex(20406502) },
  { test: /olympia/, url: "https://www.thelondonclassiccarshow.co.uk/wp-content/uploads/Main-Slider-shots-1-1.jpg" }, // og:image (seed-confirmed)

  // ── Meet series ───────────────────────────────────────────────────────────
  { test: /caffeine ?(&|and)? ?machine/, url: "https://media.caffeineandmachine.com/20250311150854/Caffeine-and-Machine-1024x576.jpg" }, // og:image (live-confirmed)
  { test: /cars ?(&|and)? ?coffee/, url: pex(33419743) },
  { test: /podium place/, url: pex(3608542) },
  { test: /ace cafe/, url: pex(2533092) },
  { test: /crystal palace/, url: pex(2127733) },
  { test: /newlands corner/, url: pex(33419743) },
  { test: /shift social/, url: pex(3608542) },
];

/**
 * Relevant licence-free Pexels photos per category, used when no venue rule
 * matches. A stable per-event index (see resolveEventImage) spreads events
 * across each array so visually-similar events don't all repeat one picture.
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
 * 1. First VENUE_IMAGE_RULES rule whose `test` matches `${name} ${venue}
 *    ${organiser}` (lowercased) wins.
 * 2. Otherwise pick from CATEGORY_IMAGES[e.type] using a stable index derived
 *    from the event id, so similar events don't all share one photo.
 * 3. Returns undefined if nothing applies (caller falls back to the Pexels id).
 */
export function resolveEventImage(e: CarEvent): string | undefined {
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
