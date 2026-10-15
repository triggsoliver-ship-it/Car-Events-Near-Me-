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
  // Goodwood — so no tiers/bookingUrl are set. Dates and history verified
  // directly against three-castles.co.uk on 14 Oct 2026. The Llandudno
  // Promenade / Prologue Day spectating detail is Ian's own wording, sent by
  // a second email the same day asking for it to avoid confusion.
  // 15 Oct 2026: Ian sent genuine event photography (copyright Three
  // Castles / Will Aron — not stock/AI) and a further detail: spectators are
  // equally welcome at the Finish, also on the Promenade, from around 4pm on
  // the final day. imgUrl now points at that photo, hosted at /photos/ per
  // the project's organiser-photo convention — see public/photos/README.md
  // and the IMAGE_CREDITS entry in lib/venueImages.ts. He also asked to be
  // listed under both Motorsport and Classic — `type` stays "motorsport"
  // (the accurate primary category — this is a competitive rally, not a
  // static show) and `categories` adds "classic" so it's also found there.
  {
    id: 1703,
    name: "Three Castles Trial",
    type: "motorsport",
    categories: ["classic"],
    region: "Wales",
    county: "Conwy",
    town: "Llandudno",
    venue: "Llandudno",
    start: "2027-06-08",
    end: "2027-06-11",
    img: 10373678,
    imgUrl:
      "https://careventsnearme.uk/photos/ThreeCastles26WA-7807.jpeg",
    organiser: "Three Castles Classic Rallies",
    desc:
      "A historic regularity rally across North Wales's mountains and historic houses, run by Three Castles Classic Rallies since 2002 — 2027 marks the 25th running. Entry is limited to competing crews rather than open to public ticket sales. No booking is needed to spectate free on Llandudno Promenade, which the event uses extensively on Prologue Day, Tuesday 8 June. Spectators are equally welcome at the Finish, also on the Promenade, from around 4pm on the final day, Friday 11 June. The private venues used along the rest of the route are not open to the public.",
    tiers: [],
    free: true,
  },
  // Fowey Classic Car Show — added 14 Oct 2026. Organiser (Dennis Espley,
  // Fowey Classic Car Show chair) replied to prospecting email with the
  // 2027 running-order and a poster confirming Thursday 19 Aug 2027; venue
  // and "no dogs" rule cross-checked against foweyclassiccar.com the same
  // day (site still shows 2026 info but venue matches exactly). Eligibility
  // taken from the organiser's own 2027 poster, which supersedes the site's
  // older/inconsistent wording.
  // Pricing updated 15 Oct 2026: Dennis confirmed by email that cars pay a
  // small £5 donation at online registration (to speed up entry on the
  // day), while visitors remain free, with cash donations welcomed at the
  // entrance. (He first said "minimum" then corrected it to "small" the same
  // day — wording only, the £5 figure is unchanged.) No bookingUrl yet —
  // registration itself opens March 2027.
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
      "Cornwall's largest combined classic car show and parade returns to Fowey River Academy on Thursday 19 August 2027. Eligible vehicles: pre-1990 cars and bikes, and all sports cars of any era. On the day: cars arrive 11.30am-1pm, the show opens to the public 1.30pm, awards are at 4pm, and the parade through town sets off at 5pm. Visitor entry is free, with cash donations warmly welcomed at the entrance; cars entering pay a small £5 donation at online registration. No dogs allowed on site. 2026 sold out its 550+ car registration within weeks — vehicle registration for 2027 opens March 2027 at foweyclassiccar.com.",
    tiers: [{ name: "Car entry (small donation, online registration)", price: 5 }],
    free: false,
  },
  // Aynho Classic Car Show — added 15 Oct 2026. Returning prospect (tracker
  // row 82): warm-contacted 23 Sep 2026, when Jerry Stephenson said no 2027
  // date was fixed yet and asked to be re-contacted once it was set. He
  // emailed back 15 Oct 2026 with the date — Sunday 12 September 2027, 10am
  // start, per the organiser's own flyer — plus genuine photos from the 2026
  // show. No photo credit was requested, so none is shown (same approach as
  // godalming-classic-car-show.jpg). imgUrl uses the filenames Oli actually
  // uploaded via the GitHub web UI (AynhoClassicCarShow26-1/2/3.jpeg).
  // `categories` adds "classic" alongside the primary "show" type, per the
  // convention set for Three Castles.
  // Venue and pricing added 15 Oct 2026, same day, after Jerry replied with
  // the missing details: Aynho Sports Field, Charlton Road (what3words
  // washroom.mushroom.presses — no postcode was given for the field itself).
  // Exhibitors/car entry is free with an optional donation; general public
  // £2 cash on the gate; children free. His working reply address is
  // jerry@adayinthecountry.co.uk (not the aynho-pc.gov.uk addresses on file
  // — tracker row 82 updated to match).
  {
    id: 1705,
    name: "Aynho Classic Car Show",
    type: "show",
    categories: ["classic"],
    region: "South East",
    county: "Oxfordshire",
    town: "Aynho",
    venue: "Aynho Sports Field, Charlton Road, Aynho, Oxfordshire",
    start: "2027-09-12",
    end: "2027-09-12",
    img: 10373678,
    imgUrl:
      "https://careventsnearme.uk/photos/AynhoClassicCarShow26-2.jpeg",
    organiser: "Aynho Classic Car Show",
    desc:
      "Aynho's classic car show returns to Aynho Sports Field on Charlton Road on Sunday 12 September 2027, opening to visitors at 10am (find the field by what3words: washroom.mushroom.presses). General admission is £2 cash on the gate, with children going free. Entering a car costs nothing — a donation is welcomed but not required. It's an annual event that also welcomed entries in 2026.",
    tiers: [{ name: "General public (cash on the gate)", price: 2 }],
    free: false,
  },
];
