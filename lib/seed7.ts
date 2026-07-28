import type { CarEvent } from "@/lib/types";

// Organiser-verified listings built from the organiser's own event pages before outreach.
// Beaulieu: International Autojumble was missing from SEED_6 — dates, times and ticket
// prices below taken from beaulieu.co.uk/events/international-autojumble/ (checked 28 Jul 2026).
//
// NOTE ON IMAGES: beaulieu.co.uk redirects direct image requests to their homepage
// (anti-hotlinking), so imgUrl is deliberately omitted and the stock autojumble photo is
// used instead. When an organiser replies, ask them for a photo we can host ourselves —
// that's both better looking and properly licensed.
export const SEED_7: CarEvent[] = [
  {
    id: 1417,
    name: "Beaulieu International Autojumble",
    type: "autojumble",
    region: "South East",
    county: "Hampshire",
    town: "Beaulieu",
    venue: "National Motor Museum, Beaulieu",
    start: "2026-09-12",
    end: "2026-09-13",
    img: 17356337,
    organiser: "Beaulieu",
    desc:
      "The biggest outdoor sale of motoring items this side of the Atlantic. Hundreds of stands across the Beaulieu event fields packed with spares, automobilia, tools, books, models, engines, body panels and trim — plus Automart and Dealermart for classic and vintage vehicles for sale, and the annual Bonhams|Cars auction. Entry includes admission to the National Motor Museum, Palace House and Beaulieu Abbey. Saturday 9.30am–5pm, Sunday 9am–4.30pm. Classic Car Park open to pre-2000 vehicles.",
    tiers: [
      { name: "One Day Adult (advance)", price: 15.3 },
      { name: "One Day Child 4-16 (advance)", price: 10.84 },
      { name: "Two Day Adult (advance)", price: 28.05 },
      { name: "Two Day Child 4-16 (advance)", price: 16.15 },
      { name: "Sunday Premium", price: 80 },
      { name: "Two Day Premium", price: 110 },
    ],
    free: false,
    bookingUrl: "https://www.beaulieu.co.uk/events/international-autojumble/",
  },
];
