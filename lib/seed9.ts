import type { CarEvent } from "@/lib/types";

// BTCC autumn 2026 rounds — dates and prices verified against the circuits'
// own ticket pages on 24 Aug 2026. (The Silverstone round, 26-27 Sep, is
// deliberately not listed yet: their new site hides prices inside the ticket
// shop — add it once adult prices are confirmed.)
export const SEED_9: CarEvent[] = [
  {
    id: 1701,
    name: "British Touring Car Championship — Croft",
    type: "motorsport",
    region: "North East",
    county: "North Yorkshire",
    town: "Darlington",
    venue: "Croft Circuit",
    start: "2026-09-05",
    end: "2026-09-06",
    img: 10373678,
    organiser: "Croft Circuit",
    desc:
      "The Kwik Fit British Touring Car Championship thunders into Croft for round eight — three BTCC races on Sunday plus a packed support bill across the weekend. Children 12 and under go free with a paying adult; teen (13-15) tickets from £12 and grandstand seats from £6. Saturday £25 / Sunday £39 / weekend £60 in advance.",
    tiers: [
      { name: "Saturday Adult", price: 25 },
      { name: "Sunday Adult (race day)", price: 39 },
      { name: "Weekend Adult", price: 60 },
      { name: "Teen 13-15 (Sunday)", price: 15 },
    ],
    free: false,
    bookingUrl: "https://croftcircuit.co.uk/racing/btcc",
  },
  {
    id: 1702,
    name: "BTCC Season Finale — Brands Hatch",
    type: "motorsport",
    region: "South East",
    county: "Kent",
    town: "West Kingsdown",
    venue: "Brands Hatch (GP Circuit)",
    start: "2026-10-10",
    end: "2026-10-11",
    img: 10807493,
    organiser: "Brands Hatch (MSV)",
    desc:
      "The 2026 British Touring Car Champion is crowned on the full Brands Hatch Grand Prix circuit — three title-deciding races on Sunday and a huge support programme. Children under 13 go free. Online prices shown (advance booking closes 4pm Thursday 8 October; gate prices higher — £60 adult weekend on the day).",
    tiers: [
      { name: "Weekend Adult (online)", price: 49 },
      { name: "Sunday Adult (online)", price: 36 },
      { name: "Saturday Adult (online)", price: 23 },
      { name: "Teen 13-15 Sunday (online)", price: 22 },
    ],
    free: false,
    bookingUrl: "https://www.brandshatch.co.uk/2026/october/kwik-fit-british-touring-car-championship",
  },
];
