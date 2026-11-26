import type { CarEvent } from "@/lib/types";

// Organiser-confirmed listings from Car Events Near Me outreach replies,
// continued from lib/seed11.ts (same id sequence). Added 26 Nov 2026.
export const SEED_12: CarEvent[] = [
  // Sizewell Classic & Vintage Vehicle Show — added 26 Nov 2026. Sonny
  // Cracknell (Leiston Events Group, leistonevents@outlook.com) replied 14:57
  // to that morning's outreach: "This sounds great, we haven't advertised
  // next year's date yet, however it's 20th June 2027." Oli asked for it to
  // go live.
  //
  // Verified 26 Nov 2026 on leistoneventsgroup.com (show page and homepage)
  // and visit-leiston.co.uk (2026 listing, Sun 21 June 2026):
  // - "Vehicle exhibitors are welcome to attend free of charge."
  // - "Public entry is just £1 per person." ... "with no booking required".
  // - Venue Sizewell Sports & Social Club; the group also runs monthly coffee
  //   mornings at the Leiston Community Centre.
  // - Times not captured, so none are stated.
  {
    id: 1727,
    name: "Sizewell Classic & Vintage Vehicle Show",
    type: "show",
    categories: ["classic"],
    region: "East of England",
    county: "Suffolk",
    town: "Sizewell",
    venue: "Sizewell Sports & Social Club, Sizewell, Suffolk",
    start: "2027-06-20",
    end: "2027-06-20",
    img: 2272281,
    organiser: "Leiston Events Group",
    desc:
      "The Leiston Events Group's Sizewell Classic & Vintage Vehicle Show returns on Sunday 20 June 2027 at the Sizewell Sports & Social Club on the Suffolk coast. It's a friendly, low-cost day out: vehicle exhibitors are welcome free of charge with no booking needed, and public entry was just £1 per person in 2026 (2027 price to be confirmed). The group also runs monthly coffee mornings at the Leiston Community Centre.",
    tiers: [{ name: "Public entry (2026 price; 2027 not yet confirmed)", price: 1 }],
    free: false,
    bookingUrl: "https://leistoneventsgroup.com/sizewell-vintage-classic-vehicle-show/",
  },
];
