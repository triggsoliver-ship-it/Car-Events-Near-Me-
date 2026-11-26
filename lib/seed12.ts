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

  // The Sandown Motor Show — added 26 Nov 2026. Jay Jones (Daily Driven
  // Events, info@dailydrivenevents.com) replied 17:06 to that morning's
  // outreach: "Thanks Oli, please do share the event on your platforms."
  //
  // Verified 26 Nov 2026 on dailydrivenevents.com (homepage and
  // sandown-display-your-vehicle) and the Ticket Tailor event page
  // (tickettailor.com/events/dailydrivenbrit/2265202):
  // - Saturday 19 June 2027 at Sandown Park, Esher, Surrey.
  // - "hundreds of cars, bikes, trucks and customs"; "Displaying is free,
  //   with entry for you and a guest."
  // - Adult £20 until 31 Dec 2026, £24 from 1 Jan to 18 Jun 2027, £28 on
  //   the gate (Ticket Tailor). Child prices not captured, so not listed.
  {
    id: 1728,
    name: "The Sandown Motor Show",
    type: "show",
    region: "South East",
    county: "Surrey",
    town: "Esher",
    venue: "Sandown Park, Esher, Surrey",
    start: "2027-06-19",
    end: "2027-06-19",
    img: 17075732,
    organiser: "Daily Driven Events",
    desc:
      "Daily Driven Events' flagship Sandown Motor Show takes over Sandown Park in Esher on Saturday 19 June 2027, with hundreds of cars, bikes, trucks and customs on display. Got a car, bike or truck worth showing? Displaying is free and includes entry for you and a guest. Adult tickets are cheapest booked early: £20 until 31 December 2026, then £24 from 1 January, with gate tickets at £28.",
    tiers: [
      { name: "Adult, advance (until 31 Dec 2026)", price: 20 },
      { name: "Adult, advance (1 Jan to 18 Jun 2027)", price: 24 },
      { name: "Adult, on the gate", price: 28 },
    ],
    free: false,
    bookingUrl: "https://www.tickettailor.com/events/dailydrivenbrit/2265202",
  },
];
