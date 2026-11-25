import type { CarEvent } from "@/lib/types";

// Organiser-confirmed listings from Car Events Near Me outreach replies,
// continued from lib/seed10.ts (same id sequence). Added 25 Nov 2026.
export const SEED_11: CarEvent[] = [
  // Sileby Town Classic Car Show — added 25 Nov 2026. STCC Fundraising
  // (fundraising@silebytown.co.uk) replied at 09:19 to the follow-up of Oli's
  // 16 Nov free-listing outreach: "Our car show will be Sunday 1st August
  // 2027". Oli confirmed the listing should go live.
  //
  // Verified 25 Nov 2026 on silebytown.com (news posts for 2026 and 2025):
  // - Venue "Cobalts Mill Lane, off Mountsorrel Lane, Loughborough,
  //   Leicestershire, LE12 7NF"; 2026 show Sun 2 Aug, 1pm-6pm; 2025 show
  //   Sun 3 Aug, gates 1pm-6pm (so it recurs each August).
  // - "£2 per-person while under 16s are free"; parking free.
  // - Vintage and classic cars (2025 also military vehicles), a traction
  //   engine, autojumble, BBQ and bar; supports Rainbows Hospice.
  // - Display vehicles must be booked in advance with Tony Bolton,
  //   fundraising@silebytown.co.uk / 07739 127375.
  // - Times and prices are 2026's; flagged 2027 TBC.
  {
    id: 1722,
    name: "Sileby Town Cricket Club Classic Car Show",
    type: "show",
    categories: ["classic"],
    region: "East Midlands",
    county: "Leicestershire",
    town: "Sileby",
    venue: "Sileby Town Cricket Club, Cobalts Mill Lane, off Mountsorrel Lane, Loughborough, Leicestershire, LE12 7NF",
    start: "2027-08-01",
    end: "2027-08-01",
    img: 2272281,
    organiser: "Sileby Town Cricket Club",
    desc:
      "Sileby Town Cricket Club's Classic Car Show returns on Sunday 1 August 2027, a community afternoon at the club's Cobalts Mill Lane ground in aid of Rainbows Hospice. Expect vintage and classic cars from elegant pre-war designs to iconic sports cars, plus military vehicles, a traction engine and an autojumble, with a BBQ and the club bar open all day. Owners of a classic or noteworthy vehicle need to book a display space in advance with Tony Bolton at fundraising@silebytown.co.uk or on 07739 127375. Based on the 2026 details (2027 to be confirmed), the show runs 1pm-6pm, entry is £2 per person with under-16s free, and parking is free.",
    tiers: [
      { name: "Adult (2026 price; 2027 not yet confirmed)", price: 2 },
      { name: "Under 16", price: 0 },
    ],
    free: false,
    bookingUrl: "https://www.silebytown.com/",
  },

  // Senlac St Leonards Classic Car Show — added 25 Nov 2026. Colin Goldsack
  // (Rotary Club of Senlac St Leonards, ceegeeSenlacRC@outlook.com) replied
  // "List me" at 09:18: "The show will be held on Sunday 20 June 2027, we
  // will also welcome vintage/classic commercial, military and motorcycles
  // this year."
  //
  // Verified 25 Nov 2026 on visit1066country.com (2026 listing, p2832451):
  // - "Rye Rugby Club, New Road, Rye, East Sussex, TN31 7LS"; 2026 show on
  //   Father's Day, Sun 21 Jun, 10am-5pm; "around 200 plus cars and 30 plus
  //   craft and charity stalls"; local entertainment, children's rides,
  //   refreshments and a bar.
  // - "an adult entry fee of just £5, payable at the gate, programmes,
  //   parking and accompanied children under 16 all free".
  // - Car and stall entries via www.senlacstleonardsrotary.org or
  //   senlacstleonardscarshow@gmail.com; profits to local good causes and
  //   the club's charity, The Yellowmen.
  // - Colin didn't restate the venue, so the description says Rye Rugby Club
  //   hosted in 2026; times and price are 2026's, flagged 2027 TBC.
  {
    id: 1723,
    name: "Senlac St Leonards Classic Car Show",
    type: "show",
    categories: ["classic"],
    region: "South East",
    county: "East Sussex",
    town: "Rye",
    venue: "Rye Rugby Club, New Road, Rye, East Sussex, TN31 7LS",
    start: "2027-06-20",
    end: "2027-06-20",
    img: 2272281,
    organiser: "Rotary Club of Senlac St Leonards",
    desc:
      "The Rotary Club of Senlac St Leonards' Classic Car Show returns on Father's Day, Sunday 20 June 2027. In 2026 it filled Rye Rugby Club with more than 200 cars and over 30 craft and charity stalls, plus local entertainment, children's rides and a bar. For 2027 the club is also welcoming vintage and classic commercial vehicles, military vehicles and motorcycles alongside the cars. Profits go to local good causes and the club's own charity, The Yellowmen. Car and stall entries go through senlacstleonardsrotary.org or senlacstleonardscarshow@gmail.com. Based on the 2026 details (2027 to be confirmed), the show ran 10am-5pm at Rye Rugby Club, and adult entry was £5 at the gate, with programmes, parking and accompanied under-16s free.",
    tiers: [
      { name: "Adult, at the gate (2026 price; 2027 not yet confirmed)", price: 5 },
      { name: "Accompanied under 16", price: 0 },
    ],
    free: false,
    bookingUrl: "https://www.senlacstleonardsrotary.org",
  },
];
