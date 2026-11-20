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
  //
  // Updated 18 Nov 2026 from Neil's second reply ("I have attached a couple
  // of images from the event and a clipped logo. Feel free to use them as
  // you see fit."):
  // - Photo: his "2026_Vintage_Weekend-Sunday_1.jpg" (Calder Holmes Park,
  //   Sunday 2026), resized to 1200x798, now public/photos/
  //   hebden-bridge-vintage-weekend.jpg. No credit asked for.
  // - "Since 1983": printed on the event logo he sent.
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
    imgUrl: "https://careventsnearme.uk/photos/hebden-bridge-vintage-weekend.jpg",
    organiser: "Rotary Club of Hebden Bridge",
    desc:
      "The Hebden Bridge Vintage Weekend, running since 1983, returns to Calder Holmes Park on Saturday 31 July and Sunday 1 August 2027, organised and run by the Rotary Club of Hebden Bridge. Each day has different vehicles, with Saturday mainly classic and Sunday mainly vintage, alongside a food court, a music stage, a children's area and a wide range of stalls. The park is a short walk from Hebden Bridge railway station. Based on the currently published details (2027 to be confirmed), the site opens to the public at 10am, the vehicle display runs 11.30am-4.30pm, and adult entry is £9 per day, paid by cash or card at the gate, with up to three accompanied under-15s free. Vehicle and stall bookings open in January 2027. The weekend raises funds for the Rotary Club's Trust Fund (registered charity 513898), which has donated over £500K to good causes since 2007.",
    tiers: [{ name: "Adult, per day (current price; 2027 price not yet confirmed)", price: 9 }],
    free: false,
    bookingUrl: "https://www.hebdenbridge-vintageweekend.org.uk",
  },

  // Vintage Transport Day, Northampton & Lamport Railway — added 18 Nov 2026.
  // Dan Callis (event organiser, daniel.callis@hotmail.co.uk) replied at
  // 13:41 to that morning's free-listing outreach (sent to
  // enquiries@nlr.org.uk and forwarded to him): "Next year's event is due to
  // take place on Sun 9th May 2027. If you could list us now it would be much
  // appreciated. Exhibitors should email webteam@nlr.org.uk, please, to book
  // their place. Other details are same as last year, as set out on the
  // website post here: nlr.org.uk/exhibitors/".
  //
  // Verified 18 Nov 2026 on nlr.org.uk:
  // - Steam train rides plus classic cars and camper vans, vintage buses
  //   (with short circular bus trips by Northampton Heritage Transport) and
  //   vintage fire engines; exhibits at least 30 years old; free entry for
  //   exhibitors plus a companion; exhibits in place before 9.30am and stay
  //   until at least 4pm: /exhibitors/ (2026 text, which Dan says still holds).
  //   That page still reads "FULLY BOOKED" from 2026 — booking for 2027 is by
  //   email to webteam@nlr.org.uk per Dan, so the description says that.
  // - Pitsford & Brampton Station, Pitsford Road, Chapel Brampton, NN6 8BA,
  //   about 5 miles north of Northampton: /how-to-find-us/.
  // - Run entirely by volunteers: site footer. 30th anniversary of opening
  //   (March 1996) in 2026: /celebrating-30-years/.
  // - Photos: Dan attached four ("in case useful"), resized to 1200x900 and
  //   uploaded as public/photos/nlr-vintage-transport-day-1..4.jpg. -1 (his
  //   "2025_event_2.jpg": three cars by the platform) is the listing image;
  //   2-4 (his 2026 shots) are spares. No credit asked for.
  //
  // Updated 18 Nov 2026 from Dan's second reply: "We don't charge for
  // admission. Train rides are: Adults - £8.75, Children - £7.75, Families -
  // £25.75". So admission is a £0 tier and the train fares are separate
  // tiers (not `free: true`, which would hide the fares). He did not say
  // these fares are fixed for 2027, so the description says they are the
  // fares he gave in November 2026. Children/family age bands aren't stated
  // in his reply, so none are given.
  {
    id: 1716,
    name: "Vintage Transport Day at the Northampton & Lamport Railway",
    type: "show",
    categories: ["classic"],
    region: "East Midlands",
    county: "Northamptonshire",
    town: "Chapel Brampton",
    venue: "Pitsford & Brampton Station, Pitsford Road, Chapel Brampton, Northampton, NN6 8BA",
    start: "2027-05-09",
    end: "2027-05-09",
    img: 2272281,
    imgUrl: "https://careventsnearme.uk/photos/nlr-vintage-transport-day-1.jpg",
    organiser: "Northampton & Lamport Railway",
    desc:
      "The Northampton & Lamport Railway's Vintage Transport Day returns on Sunday 9 May 2027 at Pitsford & Brampton Station, about five miles north of Northampton. It brings together steam train rides and an eclectic mix of vintage vehicles: classic cars and camper vans, vintage buses (with short circular bus trips run by Northampton Heritage Transport) and vintage fire engines. Admission is free; you only pay if you want a steam train ride (adults £8.75, children £7.75, families £25.75, the fares given by the railway in November 2026). Exhibits must be at least 30 years old, and entry is free for exhibitors plus a companion, with exhibits in place before 9.30am and on show until at least 4pm. Exhibitors book their place by emailing webteam@nlr.org.uk. The railway is run entirely by volunteers and marked 30 years since its official opening in 2026.",
    tiers: [
      { name: "Admission", price: 0 },
      { name: "Steam train ride, adult", price: 8.75 },
      { name: "Steam train ride, child", price: 7.75 },
      { name: "Steam train ride, family", price: 25.75 },
    ],
    free: false,
    bookingUrl: "https://nlr.org.uk/exhibitors/",
  },

  // Wheelfest 27, Pontefract — added 20 Nov 2026. Karen (Wheelfest Team,
  // events@pontefractcivicsociety.org.uk, cc Phil Cook, Vice Chair,
  // vicechair@pontefractcivicsociety.org.uk) replied at 19:29 on 19 Nov to
  // the 16 Nov free-listing outreach: "Wheelfest 27 which takes place in
  // Pontefract Town Centre on Saturday 12th June 2027. Yes we would like to be
  // listed please", and attached the two event posters.
  //
  // Verified 20 Nov 2026 on pontefractcivicsociety.org.uk and the posters:
  // - Sat 12 Jun 2027, "from 10am to 4pm in Pontefract Town Centre", over 100
  //   vehicles (classic cars, performance cars, bikes, 999 and HGV), 1940s
  //   Ropergate the same day, craft fair, children's rides, live music,
  //   street entertainment, street food, face painting, Rhubarb Radio,
  //   costumed character parade; promoted and organised by Pontefract Civic
  //   Society and KLH Events; stall bookings klhevents@mail.co.uk; vehicles,
  //   displays, artists and acts events@: /wheelfest-2027/ and both posters.
  // - "Entry is FREE to all vehicle owners/exhibitors", online registration
  //   form, exact location given after confirmation: /wheelfest-vehicle-registration/.
  // - First car show "four years ago" (Phil Cook, /wheelfest-26-success/).
  // - Not published anywhere: visitor admission price, street/postcode.
  //   Description says so rather than guessing.
  // - Photos: Karen's two posters (WF27.jpg, RGATE27.jpg). The Wheelfest
  //   poster's car-and-bike artwork is cropped to 1400x800 as the banner
  //   (public/photos/wheelfest-27-banner.jpg); both full posters, resized to
  //   900px wide, are in public/photos as wheelfest-27-poster.jpg and
  //   wheelfest-27-1940s-ropergate-poster.jpg.
  {
    id: 1717,
    name: "Wheelfest 27",
    type: "show",
    categories: ["classic"],
    region: "Yorkshire",
    county: "West Yorkshire",
    town: "Pontefract",
    venue: "Pontefract Town Centre, Pontefract, West Yorkshire",
    start: "2027-06-12",
    end: "2027-06-12",
    img: 2272281,
    imgUrl: "https://careventsnearme.uk/photos/wheelfest-27-banner.jpg",
    organiser: "Pontefract Civic Society and KLH Events",
    desc:
      "Wheelfest 27, \"a vehicle show with a difference\", takes over Pontefract Town Centre on Saturday 12 June 2027, 10am-4pm, promoted and organised by Pontefract Civic Society and KLH Events. Expect over 100 vehicles: classic cars, performance cars, bikes, 999 emergency vehicles and HGVs. 1940s Ropergate runs on the same day, with period vehicles, dancing and period food, and around the town there's an artisan craft fair, children's rides, live music, street entertainment, street food, face painting, Rhubarb Radio and a costumed character parade. Vehicle entry is free for all owners and exhibitors: register through the Civic Society's online form, and the exact display location is confirmed once your place is accepted. Stall bookings go to klhevents@mail.co.uk; vehicles, displays, artists and acts to events@pontefractcivicsociety.org.uk. The visitor admission price hasn't been published yet, so check the Civic Society's website before you go.",
    tiers: [],
    free: false,
    bookingUrl: "https://www.pontefractcivicsociety.org.uk/wheelfest-2027/",
  },
];
