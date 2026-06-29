export type EventType =
  | "show" | "meet" | "modified" | "classic"
  | "track day" | "auction" | "autojumble" | "motorsport";

export type Tier = { name: string; price: number };

export type CarEvent = {
  id: number;
  name: string;
  type: EventType;
  region: string;
  county: string;
  town: string;
  venue: string;
  start: string; // ISO yyyy-mm-dd
  end: string;   // ISO yyyy-mm-dd
  img: number;   // Pexels photo id
  organiser: string;
  desc: string;
  tiers: Tier[];
  free?: boolean;
  bookingUrl?: string;
};
