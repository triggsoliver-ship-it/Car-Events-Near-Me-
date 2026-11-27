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

  // Ripon Classic Car Gathering — added 27 Nov 2026. Phill (Ripon Old Cars,
  // riponclassiccargathering@gmail.com) replied 15:02 to that morning's
  // outreach: "List me".
  //
  // Verified 27 Nov 2026 on riponclassiccargathering.co.uk (homepage):
  // - "Sunday 25th July 2027", Ripon Racecourse, Boroughbridge Road, Ripon
  //   HG4 1UG. Gates from 9:00am (free car park), entertainment from about
  //   10:15am, ends 5:00pm.
  // - £5 to enter a car in advance, £3 a motorbike; £10 late entry on the day
  //   (not judged). Visitors £5, children under 14 free with an adult.
  //   Entries by PDF form, cheque or BACS only, closing 11 July 2027.
  // - Vehicles up to December 2002; cars, motorbikes, vintage tractors,
  //   commercial & military, kit cars, owners' club stands.
  // - "nearly one thousand exhibitors" last year; proceeds go to charity.
  {
    id: 1729,
    name: "Ripon Classic Car Gathering",
    type: "show",
    categories: ["classic"],
    region: "Yorkshire",
    county: "North Yorkshire",
    town: "Ripon",
    venue: "Ripon Racecourse, Boroughbridge Road, Ripon HG4 1UG",
    start: "2027-07-25",
    end: "2027-07-25",
    img: 248687,
    organiser: "Ripon Old Cars",
    desc:
      "Ripon Old Cars' Classic Car Gathering fills Ripon Racecourse on Sunday 25 July 2027, with nearly a thousand exhibitors on the field last year: cars, motorbikes, vintage tractors, commercial and military vehicles, kit cars and owners' club stands, all up to December 2002. Gates open at 9am with a free car park and the show runs until 5pm, raising money for charity. Visitors pay £5 (under-14s free with an adult). Exhibitors enter in advance by form for £5 a car or £3 a motorbike (entries close 11 July 2027), or £10 as a late entry on the day.",
    tiers: [
      { name: "Visitor (under-14s free with an adult)", price: 5 },
      { name: "Car entry, advance", price: 5 },
      { name: "Motorbike entry, advance", price: 3 },
      { name: "Late vehicle entry, on the day", price: 10 },
    ],
    free: false,
    bookingUrl: "https://riponclassiccargathering.co.uk/",
  },

  // Father's Day Classic Car Show, Walled Garden Baumber — added 27 Nov 2026.
  // Grace (walledgardenbaumber@yahoo.co.uk) replied 13:36 to the 27 Nov
  // follow-up: "If you want to list it on your page you are very welcome
  // to. We are hosting it this year on the 20th June ... it will be the same
  // this year just with the new date." (20 June 2027 is Father's Day.)
  //
  // Details as verified on the venue's event page on 20 Nov 2026 (2026 show,
  // Sun 21 June): "FREE entry", 10am-4pm, cars register through the venue's
  // own sign-up; access "only from the A158 between Baumber and Wragby".
  // Homepage (27 Nov 2026): tearoom; "FREE admission - Dogs on leads are
  // welcome."
  {
    id: 1730,
    name: "Father's Day Classic Car Show at the Walled Garden Baumber",
    type: "show",
    categories: ["classic"],
    region: "East Midlands",
    county: "Lincolnshire",
    town: "Horncastle",
    venue: "The Walled Garden, Baumber, Horncastle, Lincolnshire",
    start: "2027-06-20",
    end: "2027-06-20",
    img: 2272281,
    organiser: "Walled Garden Baumber",
    desc:
      "The Walled Garden Baumber's Father's Day Classic Car Show returns on Sunday 20 June 2027, one of the garden's busiest days of the year. Entry is free, the 2026 show ran from 10am to 4pm, and there's the garden and the Potting Shed Tearoom to enjoy too. Show cars register through the Walled Garden (2027 registration details to follow in the new year). Access is only from the A158 between Baumber and Wragby.",
    tiers: [{ name: "Free entry", price: 0 }],
    free: true,
    bookingUrl: "https://www.walledgardenbaumber.co.uk/",
  },
];
