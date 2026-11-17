import type { CarEvent } from "@/lib/types";

// Organiser-confirmed listings added from Car Events Near Me outreach replies,
// November 2026 onwards. Continues the id sequence from lib/seed9.ts.
export const SEED_10: CarEvent[] = [
  // Caerwys Classic Car Show — added 17 Nov 2026. Barry Bartlett (Event
  // Organiser, Clwyd Practical Classics, bazz1790@aol.com) replied the same
  // morning to Oli's free-listing outreach: "yes the event will be running on
  // Sunday 11th July and we welcome your offer to advertise the event".
  //
  // Verified 17 Nov 2026:
  // - Date 11 Jul 2027 and times 10am-4pm: FBHVC events calendar entry
  //   (fbhvc.co.uk/events), which names Barry as contact; date confirmed by
  //   Barry himself. (The club's own page still shows 2026: 9.30am-4pm.)
  // - Venue, "Entry is free to Exhibitors", running since 1990, 34th show in
  //   2026, £143,231.60 raised since 1990, £10,600 from 2026 split between
  //   Wales Air Ambulance and St Kentigern Hospice: the club's annual-show
  //   page (sites.google.com/view/clwydpracticalclassics/annual-show).
  // - Autojumble, food & drink, cars/motorbikes/tractors: FBHVC entry.
  //
  // Deliberately left out until Barry confirms: visitor admission price
  // (not published anywhere — so tiers are empty, free: false, badge reads
  // "See prices"), and the postcode (club page says CH7 5BH, FBHVC says
  // CH7 5BA). No organiser photo yet — stock fallback until he sends one;
  // the club site's photos are not used without permission.
  {
    id: 1714,
    name: "Caerwys Classic Car Show",
    type: "show",
    categories: ["classic"],
    region: "Wales",
    county: "Flintshire",
    town: "Caerwys",
    venue: "Barlows Caravan Park, Caerwys, nr Mold, Flintshire",
    start: "2027-07-11",
    end: "2027-07-11",
    img: 2272281,
    organiser: "Clwyd Practical Classics",
    desc:
      "Clwyd Practical Classics' annual Caerwys Classic Car Show returns to Barlows Caravan Park, near Mold, on Sunday 11 July 2027, 10am-4pm. Expect classic cars, motorbikes and tractors on show, plus food and drink, an autojumble and other stands. Entry is free for exhibitors. The volunteer-run show has raised money for local charities every year since 1990 — £143,231.60 in total, including £10,600 from the 2026 show, shared between Wales Air Ambulance and St Kentigern Hospice.",
    tiers: [],
    free: false,
    bookingUrl: "https://sites.google.com/view/clwydpracticalclassics/annual-show",
  },
];
