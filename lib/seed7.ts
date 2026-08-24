import type { CarEvent } from "@/lib/types";

// Organiser-verified listings — built from the organiser's own pages, with permission.
//
// NOTE ON IMAGES: several organisers (Beaulieu included) redirect direct image requests
// to their homepage (anti-hotlinking), so imgUrl is omitted and the stock category photo
// is used. When an organiser replies, ask them for a photo we can host ourselves — better
// looking and properly licensed.

// CBS Automotive — Cars and Coffee Cambridge.
// Permission given by CBS Automotive (Saffan Ltd) 28 Jul 2026: "please proceed with listing
// our Cars & Coffee event using the information from our Eventbrite page."
// First Saturday of the month, 10am-1pm, Grange Farm, Horningsea. From £3 per vehicle.
const CBS_DATES = ["2026-08-01", "2026-09-05", "2026-10-03", "2026-11-07", "2026-12-05"];

const cbs: CarEvent[] = CBS_DATES.map((iso, i) => ({
  id: 1418 + i,
  name: "Cars and Coffee Cambridge",
  type: "meet",
  region: "East of England",
  county: "Cambridgeshire",
  town: "Horningsea",
  venue: "CBS Automotive, Grange Farm, Horningsea, CB25 9JD",
  start: iso,
  end: iso,
  img: 33419743,
  organiser: "CBS Automotive",
  desc:
    "A monthly gathering of classics, supercars, modified builds and everything in between at CBS Automotive's 11,000 sq ft facility just outside Cambridge. Runs 10am-1pm on the first Saturday of the month. Entry from £3 per vehicle and includes a free tea or coffee and nibbles. Indoor and outdoor space, PS5 racing simulator and the DriftMist competition on site.",
  tiers: [{ name: "Per vehicle (from)", price: 3 }],
  free: false,
  bookingUrl: "https://www.eventbrite.co.uk/e/cars-and-coffee-cambridge-tickets-1977292656563",
}));

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
  ...cbs,
];
