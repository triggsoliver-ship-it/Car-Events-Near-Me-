export type EventType =
  | "show" | "meet" | "modified" | "classic"
  | "track day" | "auction" | "autojumble" | "motorsport";

export type Tier = { name: string; price: number };

export type CarEvent = {
  id: number;
  name: string;
  type: EventType;
  // Extra categories this event should ALSO be found under, besides `type`
  // (which stays the single "primary" category shown as the card/banner
  // badge). e.g. a historic road rally is primarily `motorsport` but an
  // organiser may reasonably also want it listed under `classic`. Optional,
  // and empty/absent for the vast majority of events. See
  // lib/util.ts matchesCategory() for how this is applied when filtering.
  categories?: EventType[];
  region: string;
  county: string;
  town: string;
  venue: string;
  start: string; // ISO yyyy-mm-dd
  end: string;   // ISO yyyy-mm-dd
  img: number;   // Pexels photo id (fallback)
  imgUrl?: string; // real official OG share image (preferred over Pexels)
  organiser: string;
  desc: string;
  tiers: Tier[];
  free?: boolean;
  bookingUrl?: string;
  status?: string; // pending | approved | rejected — undefined for bundled seed events (always treated as approved)
};
