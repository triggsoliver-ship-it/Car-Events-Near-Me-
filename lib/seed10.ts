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
  // Updated 17 Nov 2026 13:55 from Barry's second reply:
  // - Visitor entry is £5 ("currently £5 and has been since pre Covid. A
  //   decision has not as yet been taken on any increase.") — so the tier
  //   name says it is the current price and the description flags that 2027
  //   may differ.
  // - Postcode is CH7 5BH (the club page was right; FBHVC's CH7 5BA is not).
  // - Photos: Barry pointed us at the club website and Facebook page for
  //   photos. None wired in yet — the Pexels classic fallback stays until
  //   one is uploaded to public/photos/ (see that folder's README).
  {
    id: 1714,
    name: "Caerwys Classic Car Show",
    type: "show",
    categories: ["classic"],
    region: "Wales",
    county: "Flintshire",
    town: "Caerwys",
    venue: "Barlows Caravan Park, Caerwys, nr Mold, Flintshire, CH7 5BH",
    start: "2027-07-11",
    end: "2027-07-11",
    img: 2272281,
    organiser: "Clwyd Practical Classics",
    desc:
      "Clwyd Practical Classics' annual Caerwys Classic Car Show returns to Barlows Caravan Park, near Mold, on Sunday 11 July 2027, 10am-4pm. Expect classic cars, motorbikes and tractors on show, plus food and drink, an autojumble and other stands. Visitor entry is currently £5 (the 2027 price hasn't been set yet), and entry is free for exhibitors. The volunteer-run show has raised money for local charities every year since 1990 — £143,231.60 in total, including £10,600 from the 2026 show, shared between Wales Air Ambulance and St Kentigern Hospice.",
    tiers: [{ name: "Visitor entry (current price; 2027 price not yet set)", price: 5 }],
    free: false,
    bookingUrl: "https://sites.google.com/view/clwydpracticalclassics/annual-show",
  },

  // Hebden Bridge Vintage Weekend — added 18 Nov 2026. Neil at the Rotary
  // Club of Hebden Bridge (rotaryclubofhebdenbridge@gmail.com) replied
  // "LIST ME ... Yes please list us" at 11:46 to that morning's free-listing
  // outreach.
  //
  // Verified 18 Nov 2026, all from hebdenbridge-vintageweekend.org.uk:
  // - Dates "SAT 31ST july - sun 1st aug 2027", "BOOKINGS OPEN january 2027",
  //   "Saturday mainly Classic and Sunday mainly Vintage", food court,
  //   children's area, music stage, stalls: home page.
  // - Venue Calder Holmes Park, postcode HX7 8AU, gates on New Road (via the
  //   Memorial Garden) and Station Road: /getting-here.
  // - Adult £9 per day, up to 3 accompanied under-15s free, carers free, no
  //   weekend tickets, cash or card on the gate; open to the public 10am,
  //   vehicle display 11.30am-4.30pm, closes 5pm: /tickets. That page carries
  //   no year, so these are the currently published prices and times, not
  //   confirmed 2027 ones — the tier name and description say so.
  // - Run by the Rotary Club of Hebden Bridge for its Trust Fund (registered
  //   charity 513898), over £500K donated since 2007: home and /about.
  // - No photo supplied yet: Pexels classic fallback until one is uploaded
  //   to public/photos/.
  {
    id: 1715,
    name: "Hebden Bridge Vintage Weekend",
    type: "show",
    categories: ["classic"],
    region: "Yorkshire",
    county: "West Yorkshire",
    town: "Hebden Bridge",
    venue: "Calder Holmes Park, Hebden Bridge, West Yorkshire, HX7 8AU",
    start: "2027-07-31",
    end: "2027-08-01",
    img: 2272281,
    organiser: "Rotary Club of Hebden Bridge",
    desc:
      "The Hebden Bridge Vintage Weekend returns to Calder Holmes Park on Saturday 31 July and Sunday 1 August 2027, organised and run by the Rotary Club of Hebden Bridge. Each day has different vehicles, with Saturday mainly classic and Sunday mainly vintage, alongside a food court, a music stage, a children's area and a wide range of stalls. The park is a short walk from Hebden Bridge railway station. Based on the currently published details (2027 to be confirmed), the site opens to the public at 10am, the vehicle display runs 11.30am-4.30pm, and adult entry is £9 per day, paid by cash or card at the gate, with up to three accompanied under-15s free. Vehicle and stall bookings open in January 2027. The weekend raises funds for the Rotary Club's Trust Fund (registered charity 513898), which has donated over £500K to good causes since 2007.",
    tiers: [{ name: "Adult, per day (current price; 2027 price not yet confirmed)", price: 9 }],
    free: false,
    bookingUrl: "https://www.hebdenbridge-vintageweekend.org.uk",
  },
];
