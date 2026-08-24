import type { CarEvent } from "@/lib/types";

// Autumn/winter 2026 + 2027 refresh — added 24 Aug 2026.
// Every one-off event below was verified against the organiser's own site on
// 24 Aug 2026 (dates and, where published, prices). Prices exclude small
// per-ticket booking fees where the organiser charges one.

const ONE_OFFS: CarEvent[] = [
  {
    id: 1501,
    name: "FIA European Finals",
    type: "motorsport",
    region: "East Midlands",
    county: "Northamptonshire",
    town: "Wellingborough",
    venue: "Santa Pod Raceway",
    start: "2026-09-10",
    end: "2026-09-13",
    img: 10373678,
    organiser: "Santa Pod Raceway",
    desc:
      "The climax of the FIA European Drag Racing Championship — four days of 300mph Top Fuel dragsters, Pro Mod, Funny Cars and jet cars at the home of European drag racing. Early ticket rates end midnight 28 August; children under 5 go free. Grandstand seats and camping available.",
    tiers: [
      { name: "Saturday (early)", price: 44 },
      { name: "Sunday (early)", price: 44 },
      { name: "Weekend Sat-Sun (early)", price: 88 },
      { name: "3-Day Fri-Sun (early)", price: 118 },
      { name: "Child 5-15 (day)", price: 6 },
    ],
    free: false,
    bookingUrl: "https://santapodtickets.com/p/europeanfinals",
  },
  {
    id: 1502,
    name: "JapShow Finale",
    type: "modified",
    region: "East Midlands",
    county: "Northamptonshire",
    town: "Wellingborough",
    venue: "Santa Pod Raceway",
    start: "2026-10-11",
    end: "2026-10-11",
    img: 20406502,
    organiser: "Santa Pod Raceway",
    desc:
      "The season-closing celebration of Japanese performance cars at Santa Pod — show 'n' shine, club displays, drifting and Run What Ya Brung passes down the quarter mile for Japanese cars (£50 track voucher, helmet required). Advance prices end midnight 25 September; under 5s free. Weekend ticket includes Saturday camping.",
    tiers: [
      { name: "Adult (advance)", price: 26 },
      { name: "Child 5-15 (advance)", price: 7 },
      { name: "Weekend + camping", price: 36 },
      { name: "Track voucher (Jap cars)", price: 50 },
    ],
    free: false,
    bookingUrl: "https://santapodtickets.com/p/japshowfinale",
  },
  {
    id: 1503,
    name: "Flame & Thunder",
    type: "motorsport",
    region: "East Midlands",
    county: "Northamptonshire",
    town: "Wellingborough",
    venue: "Santa Pod Raceway",
    start: "2026-10-31",
    end: "2026-10-31",
    img: 10807493,
    organiser: "Santa Pod Raceway",
    desc:
      "Santa Pod's famous Halloween spectacular — jet cars, Top Fuel dragsters, monster trucks, stunt shows and a huge firework finale. A brilliant family day out to close the season. Early-bird prices end midnight 16 October; all tickets are sold online or by phone only. Weekend ticket includes Friday-Saturday camping.",
    tiers: [
      { name: "Adult (early)", price: 36 },
      { name: "Child 5-15 (early)", price: 10 },
      { name: "Family 2+2 (early)", price: 87 },
      { name: "Weekend + camping", price: 53 },
    ],
    free: false,
    bookingUrl: "https://santapodtickets.com/p/flameandthunder",
  },
  {
    id: 1504,
    name: "GR8 Ultimate Stance",
    type: "modified",
    region: "West Midlands",
    county: "Shropshire",
    town: "Telford",
    venue: "Telford International Centre",
    start: "2026-10-24",
    end: "2026-10-25",
    img: 20406502,
    organiser: "GR8 Events",
    desc:
      "The indoor show that closes the modified season — two halls of stance, VAG, JDM and show builds at Telford International Centre, now run over a full weekend. Standard tickets £30 a day / £60 the weekend, with a limited 50% early allocation. Kids under 12 go free with a paying adult.",
    tiers: [
      { name: "Day (early offer)", price: 15 },
      { name: "Weekend (early offer)", price: 30 },
      { name: "Day (standard)", price: 30 },
    ],
    free: false,
    bookingUrl: "https://www.gr8ultimatestance.co.uk/tickets",
  },
  {
    id: 1505,
    name: "Regent Street Motor Show",
    type: "show",
    region: "London",
    county: "Greater London",
    town: "London",
    venue: "Regent Street (Oxford Circus to Piccadilly Circus)",
    start: "2026-10-31",
    end: "2026-10-31",
    img: 29831803,
    organiser: "Regent Street Motor Show",
    desc:
      "London's Regent Street closes to traffic for a free celebration of 125 years of motoring — from the pre-1905 veterans heading out on the RM Sotheby's London to Brighton Run the next morning to the latest EVs and supercars. No ticket needed; just turn up and wander the displays.",
    tiers: [{ name: "Free Entry", price: 0 }],
    free: true,
    bookingUrl: "https://regentstreetmotorshow.com/",
  },
  {
    id: 1506,
    name: "London Concours",
    type: "classic",
    region: "London",
    county: "Greater London",
    town: "London",
    venue: "Honourable Artillery Company, City of London",
    start: "2027-06-08",
    end: "2027-06-10",
    img: 2272281,
    organiser: "Thorough Events",
    desc:
      "An automotive garden party in the heart of the Square Mile — around a hundred of the world's finest classics, supercars and one-offs gathered on the lawns of the Honourable Artillery Company over three days, with champagne, street food and luxury exhibitors. Adult day tickets include the show catalogue.",
    tiers: [
      { name: "Adult Day", price: 65 },
      { name: "Afternoon (2pm-8pm)", price: 45 },
      { name: "Evening (4pm-8pm)", price: 35 },
      { name: "Child 5-16", price: 35 },
    ],
    free: false,
    bookingUrl: "https://londonconcours.co.uk/tickets/",
  },
  {
    id: 1507,
    name: "Goodwood Festival of Speed",
    type: "motorsport",
    region: "South East",
    county: "West Sussex",
    town: "Chichester",
    venue: "Goodwood House",
    start: "2027-07-15",
    end: "2027-07-18",
    img: 10807493,
    organiser: "Goodwood",
    desc:
      "The world's greatest celebration of motorsport returns 15-18 July 2027 — F1 cars, hypercars, rally legends and record-breakers tackling the famous hillclimb in the grounds of Goodwood House. 2027 tickets go on sale via Goodwood's ticket alert; the price shown is the 2026 starting rate and final 2027 pricing is still to be confirmed.",
    tiers: [{ name: "Day from (2026 rate)", price: 39 }],
    free: false,
    bookingUrl: "https://www.goodwood.com/motorsport/festival-of-speed/",
  },
];

// CBS Automotive — Cars and Coffee Cambridge, continued into 2027.
// Organiser-verified series (permission on file, see seed7). Runs 10am-1pm on
// the first Saturday of the month — or the second Saturday when a bank holiday
// falls that weekend, which is why January is the 9th. Current Eventbrite
// listing checked 24 Aug 2026.
const CBS_2027_DATES = ["2027-01-09", "2027-02-06", "2027-03-06", "2027-04-03"];

const cbs2027: CarEvent[] = CBS_2027_DATES.map((iso, i) => ({
  id: 1521 + i,
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
    "A monthly gathering of classics, supercars, modified builds and everything in between at CBS Automotive's 11,000 sq ft facility just outside Cambridge. Runs 10am-1pm on the first Saturday of the month (second Saturday when a bank holiday falls that weekend). Entry from £3 per vehicle and includes a free tea or coffee and nibbles. Indoor and outdoor space, PS5 racing simulator and the DriftMist competition on site.",
  tiers: [{ name: "Per vehicle (from)", price: 3 }],
  free: false,
  bookingUrl: "https://www.eventbrite.co.uk/e/cars-and-coffee-cambridge-tickets-1977292656563",
}));

// Weekly Sunday cars & coffee at partner venues, continued through the winter
// (Nov 2026 - Mar 2027). Same venues as seed5 — all four run their free Sunday
// meets year-round, indoors-friendly, drop in or reserve via the venue.
const SUNDAYS_W: string[] = [
  "2026-11-01", "2026-11-08", "2026-11-15", "2026-11-22", "2026-11-29",
  "2026-12-06", "2026-12-13", "2026-12-20", "2026-12-27",
  "2027-01-03", "2027-01-10", "2027-01-17", "2027-01-24", "2027-01-31",
  "2027-02-07", "2027-02-14", "2027-02-21", "2027-02-28",
  "2027-03-07", "2027-03-14", "2027-03-21", "2027-03-28",
];

type WVenue = { name: string; venue: string; region: string; county: string; town: string; organiser: string; url: string; desc: string };

const WVENUES: WVenue[] = [
  { name: "Podium Place Cars & Coffee", venue: "Podium Place", region: "South East", county: "Berkshire", town: "Newbury", organiser: "Podium Place", url: "https://podiumplace.co.uk/pages/events", desc: "Free weekly cars & bikes meet at Podium Place, Newbury. Coffee, community and all machines welcome — no ticket needed." },
  { name: "Caffeine & Machine — The Hut", venue: "The Hut", region: "South East", county: "Hampshire", town: "Petersfield", organiser: "Caffeine & Machine", url: "https://caffeineandmachine.com/thehut/book-a-table/", desc: "Cars & coffee at Caffeine & Machine's Hampshire site. Drop in free or reserve a parking space in advance." },
  { name: "Caffeine & Machine — The Hill", venue: "The Hill", region: "West Midlands", county: "Warwickshire", town: "Stratford-upon-Avon", organiser: "Caffeine & Machine", url: "https://caffeineandmachine.com/thehill/book-a-table/", desc: "Cars & coffee at the original Caffeine & Machine in Warwickshire. Drop in free or reserve a parking space in advance." },
  { name: "Caffeine & Machine — The Bowl", venue: "The Bowl", region: "East of England", county: "Bedfordshire", town: "Bedford", organiser: "Caffeine & Machine", url: "https://caffeineandmachine.com/thebowl/book-a-table/", desc: "Cars & coffee at Caffeine & Machine's Bedfordshire site. Drop in free or reserve a parking space in advance." },
];

const winterMeets: CarEvent[] = WVENUES.flatMap((v, vi) =>
  SUNDAYS_W.map((iso, si): CarEvent => ({
    id: 1531 + vi * SUNDAYS_W.length + si,
    name: v.name,
    type: "meet",
    region: v.region,
    county: v.county,
    town: v.town,
    venue: v.venue,
    start: iso,
    end: iso,
    img: 33419743,
    organiser: v.organiser,
    desc: v.desc,
    tiers: [{ name: "Entry", price: 0 }],
    free: true,
    bookingUrl: v.url,
  }))
);

export const SEED_8: CarEvent[] = [...ONE_OFFS, ...cbs2027, ...winterMeets];
