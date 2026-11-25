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
  // - Photos: Colin sent two at 10:32 ("for your use, no copyright
  //   involved"), resized to 1200px wide and uploaded as
  //   public/photos/senlac-2026-triumph-roadster.jpg (listing image) and
  //   senlac-2026-morris-police.jpg (spare). No credit asked for.
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
    imgUrl: "https://careventsnearme.uk/photos/senlac-2026-triumph-roadster.jpg",
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

  // St Michael's Hospice Classic Car Show & Open Garden — added 25 Nov 2026.
  // Moira Davidson (Fundraising Engagement Administrator,
  // mdavidson@smhospicehereford.org, cc Gaynor Warren) replied 09:42 to that
  // morning's outreach: "This sounds great ... let me know what you need".
  //
  // Verified 25 Nov 2026 on st-michaels-hospice.org.uk (classic-car-show
  // event page): Sunday 5 July 2026, 10am-4pm (exhibitor cars from 8am),
  // St Michael's Hospice, Bartestree, Hereford HR1 4HA; "Pre-booked tickets:
  // Adults £10.00 | 12-17 yrs £5 | U12s Free"; "No tickets will be sold on
  // the day"; Richard Hammond and The Smallest Cog team attended, Richard
  // judging "Best Car in show"; open garden; tea, coffee, cakes, ice creams,
  // bacon rolls, burgers; free on-site parking; sponsored by Vertu VW
  // Hereford; owners can offer a classic car or bike to exhibit.
  //
  // NO 2027 DATE IS PUBLISHED YET. Dates are left on the 2026 show so nothing
  // invented goes live; it therefore sits out of browse/search (which only
  // shows upcoming events) but the detail page works. Change start/end to
  // the 2027 date as soon as Moira sends it and it will appear in search.
  {
    id: 1724,
    name: "St Michael's Hospice Classic Car Show & Open Garden",
    type: "show",
    categories: ["classic"],
    region: "West Midlands",
    county: "Herefordshire",
    town: "Bartestree",
    venue: "St Michael's Hospice, Bartestree, Hereford, Herefordshire, HR1 4HA",
    start: "2026-07-05",
    end: "2026-07-05",
    img: 2272281,
    organiser: "St Michael's Hospice",
    desc:
      "St Michael's Hospice's Classic Car Show & Open Garden brings classic cars and bikes from passionate local enthusiasts to the hospice grounds at Bartestree, with the chance to stroll through the hospice's garden too. The 2026 show on Sunday 5 July welcomed Richard Hammond and The Smallest Cog team, who brought a selection of cars and bikes, with Richard judging Best Car in Show. The 2027 date is still to be announced. Tickets must be booked in advance through the hospice's own website: no tickets are sold on the day. In 2026 the show ran 10am-4pm, with tea, coffee, homemade cakes, ice creams, bacon rolls and burgers, and free parking on site. If you have a classic car or bike you'd like to exhibit, the hospice would love to hear from you. Every ticket supports St Michael's Hospice.",
    tiers: [
      { name: "Adult, pre-booked (2026 price; 2027 not yet confirmed)", price: 10 },
      { name: "Age 12-17, pre-booked (2026 price; 2027 not yet confirmed)", price: 5 },
      { name: "Under 12", price: 0 },
    ],
    free: false,
    bookingUrl: "https://www.st-michaels-hospice.org.uk/how-you-can-help-us/fundraise-for-us/events/classic-car-show/",
  },

  // Jersey Concours d'Elegance — added 25 Nov 2026. Ian Barnes (Managing
  // Director, Barnes Publishing and Events Ltd, organiser of the concours,
  // ian@barnespublishing.com) replied 11:10 to that morning's outreach:
  // "LIST me. 2027 date Saturday 12th June."
  //
  // Verified 25 Nov 2026: sthelier.je event listing for 2026 ("Jersey
  // Concours D'Elegance 2026 (75th Anniversary)", People's Park, St Helier,
  // Sat 13 June 2026, "with free admission for all"); jerseyconcoursdelegance
  // .com ("Now in its fifth year", with a "how to apply" route for entrants).
  // Region: REGIONS has no Channel Islands entry; region is free text in the
  // DB, so it is set to "Channel Islands" (it won't appear under the 12 UK
  // region filters, but shows in date browse and search).
  {
    id: 1725,
    name: "Jersey Concours d'Elegance",
    type: "show",
    categories: ["classic"],
    region: "Channel Islands",
    county: "Jersey",
    town: "St Helier",
    venue: "People's Park, St Helier, Jersey",
    start: "2027-06-12",
    end: "2027-06-12",
    img: 2272281,
    organiser: "Barnes Publishing and Events Ltd (Jersey Concours d'Elegance)",
    desc:
      "The Jersey Concours d'Elegance returns to People's Park in St Helier on Saturday 12 June 2027, following its 75th-anniversary edition in 2026. Some of the finest classic and collectable cars on the island line up on the grass for judging, and admission is free for everyone, so it's an easy day out for visitors and locals alike. Owners who'd like to enter a car can apply through the concours website.",
    tiers: [{ name: "Spectator admission", price: 0 }],
    free: true,
    bookingUrl: "https://www.jerseyconcoursdelegance.com",
  },
];
