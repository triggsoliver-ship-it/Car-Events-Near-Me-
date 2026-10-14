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
  // Three Castles Trial — added 14 Oct 2026. Organiser (Ian Crammond, Event
  // Director) confirmed by email reply the same day that a free listing was
  // welcome, with one correction: this is a limited-entry historic road
  // rally for competing crews, NOT a public ticketed spectator event like
  // Goodwood — so no tiers/bookingUrl are set. Dates, history and hero image
  // verified directly against three-castles.co.uk on 14 Oct 2026. The
  // Llandudno Promenade / Prologue Day spectating detail is Ian's own
  // wording, sent by a second email the same day asking for it to avoid
  // confusion.
  {
    id: 1703,
    name: "Three Castles Trial",
    type: "motorsport",
    region: "Wales",
    county: "Conwy",
    town: "Llandudno",
    venue: "Llandudno",
    start: "2027-06-08",
    end: "2027-06-11",
    img: 10373678,
    imgUrl:
      "https://www.three-castles.co.uk/media/up0lfac4/threecastlesday426wa-7119.jpg",
    organiser: "Three Castles Classic Rallies",
    desc:
      "A historic regularity rally across North Wales's mountains and historic houses, run by Three Castles Classic Rallies since 2002 — 2027 marks the 25th running. Entry is limited to competing crews rather than open to public ticket sales. No booking is needed to spectate free on Llandudno Promenade, which the event uses extensively on Prologue Day, Tuesday 8 June. The private venues used along the rest of the route are not open to the public.",
    tiers: [],
    free: true,
  },
  // Fowey Classic Car Show — added 14 Oct 2026. Organiser (Dennis Espley,
  // Fowey Classic Car Show chair) replied to prospecting email with the
  // 2027 running-order and a poster confirming Thursday 19 Aug 2027; venue
  // and "no dogs" rule cross-checked against foweyclassiccar.com the same
  // day (site still shows 2026 info but venue matches exactly). Eligibility
  // taken from the organiser's own 2027 poster, which supersedes the site's
  // older/inconsistent wording. Vehicle registration opens March 2027 — no
  // price published for spectators or entrants, so tiers left empty and no
  // bookingUrl set (nothing to book yet).
  {
    id: 1704,
    name: "Fowey Classic Car Show & Parade",
    type: "show",
    region: "South West",
    county: "Cornwall",
    town: "Fowey",
    venue: "Fowey River Academy, Windmill, Fowey, PL23 1HE",
    start: "2027-08-19",
    end: "2027-08-19",
    img: 10373678,
    imgUrl:
      "https://usercontent.one/wp/www.foweyclassiccar.com/wp-content/uploads/elementor/thumbs/FRG9073-scaled-rbbnvqf9ijnuw19v0va8gydt775hswapogmptk8s5k.jpg",
    organiser: "Fowey Classic Car Show",
    desc:
      "Cornwall's largest combined classic car show and parade returns to Fowey River Academy on Thursday 19 August 2027. Eligible vehicles: pre-1990 cars and bikes, and all sports cars of any era. On the day: cars arrive 11.30am-1pm, the show opens to the public 1.30pm, awards are at 4pm, and the parade through town sets off at 5pm. No dogs allowed on site. 2026 sold out its 550+ car registration within weeks — vehicle registration for 2027 opens March 2027 at foweyclassiccar.com.",
    tiers: [],
    free: true,
  },
];
