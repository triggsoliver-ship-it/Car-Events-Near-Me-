import type { CarEvent } from "@/lib/types";

// Organiser-verified listings — built from the organiser's own pages, with permission.
//
// NOTE ON IMAGES: several organisers (Beaulieu included) redirect direct image requests
// to their homepage (anti-hotlinking), so imgUrl is omitted and the stock category photo
// is used. When an organiser replies, ask them for a photo we can host ourselves — better
// looking and properly licensed. (Hills Ford Stages offered us images on
// 14 Sep 2026 — one of the three sent was a Weston Park "BOOK YOUR TICKETS
// TODAY" promo carrying a See Tickets QR code, which we must not publish: it
// would make the site look like part of the ticket chain, the one thing the
// organiser asked us to stay clear of. Ask for a plain action photo instead.)

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
  // Hills Ford Stages Rally — organised by Cheltenham Motor Club.
  //
  // Permission given by Steve Andrews, Media Officer, on 14 Sep 2026: "happy
  // for you to highlight our event ... As long as your not connected to any
  // ticket sales as Weston Park owns the rights there and spectator areas are
  // fees collected by local charities".
  //
  // That constraint shapes this row, so keep it intact:
  //  - bookingUrl points at the ORGANISER'S OWN page. Do not "improve" it by
  //    deep-linking See Tickets or weston-park.com — those are the sellers, and
  //    linking straight into a checkout is exactly what we agreed not to do.
  //  - the description names who actually takes the money for each day.
  //  - the tiers deliberately omit the free under-16 ticket: priceFrom() takes
  //    the MINIMUM tier, so a £0 tier would show the whole rally as "Free" on
  //    cards and sweep it into the free-only filter.
  // Dates, times and prices verified against hillsfordstages.co.uk on
  // 14 Sep 2026. (Their spectators page lists Weston Park as "Sunday 19
  // September"; 19 Sep 2026 is a Saturday, and the See Tickets listing and the
  // ceremonial-start page both confirm Saturday.)
  {
    id: 1423,
    name: "Hills Ford Stages Rally",
    type: "motorsport",
    region: "West Midlands",
    county: "Shropshire",
    town: "Shrewsbury",
    venue: "Weston Park, Shrewsbury town centre & South Shropshire closed roads",
    start: "2026-09-19",
    end: "2026-09-20",
    img: 10373678,
    organiser: "Cheltenham Motor Club",
    desc:
      "Cheltenham Motor Club's closed-road stage rally, spread across Shropshire over two days. Saturday opens with a free ceremonial start on Claremont Street in Shrewsbury town centre from 1pm, where around 150 crews are flagged away, before the competition moves to Weston Park — gates from midday, stages past the famous water splash, trade stands, the PATHWAYS motorsport careers zone, the DriveWise road-safety zone, and food and family entertainment until late. Sunday takes the rally onto closed public roads in South Shropshire, with spectator areas at Clee Hill (Ditton Priors), Linley J4, Linley-Kinnerton and Lawley-Gretton. Under 16s go free at Weston Park; adult entry is £10 in advance or £15 on the gate, sold by See Tickets and weston-park.com, and the official spectator programme is £5. Sunday's spectator areas charge £10 per car, with the proceeds going to local groups and charities — the rally supports Midlands Air Ambulance, Wales Air Ambulance and Shropshire Rural Support. Car Events Near Me lists this event free of charge and takes no part in ticket sales.",
    tiers: [
      { name: "Weston Park adult (advance)", price: 10 },
      { name: "Weston Park adult (on the gate)", price: 15 },
      { name: "Sunday spectator areas (per car)", price: 10 },
    ],
    free: false,
    bookingUrl: "https://hillsfordstages.co.uk/weston-park/",
  },
  ...cbs,
];
