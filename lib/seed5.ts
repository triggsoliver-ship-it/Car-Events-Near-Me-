import type { CarEvent } from "@/lib/types";

// Cars & coffee / club meets from partner venues (Podium Place, Caffeine & Machine, Shift Social).
// Free entry; bookings/RSVP link out to the venue. Weekly Sunday meets through the season.
const SUNDAYS = [
  "2026-07-05", "2026-07-12", "2026-07-19", "2026-07-26", "2026-08-02", "2026-08-09",
  "2026-08-16", "2026-08-23", "2026-08-30", "2026-09-06", "2026-09-13", "2026-09-20",
  "2026-09-27", "2026-10-04", "2026-10-11", "2026-10-18", "2026-10-25",
];

type Venue = { name: string; venue: string; region: string; county: string; town: string; organiser: string; url: string; desc: string };

const VENUES: Venue[] = [
  { name: "Podium Place Cars & Coffee", venue: "Podium Place", region: "South East", county: "Berkshire", town: "Newbury", organiser: "Podium Place", url: "https://podiumplace.co.uk/pages/events", desc: "Free weekly cars & bikes meet at Podium Place, Newbury. Coffee, community and all machines welcome — no ticket needed." },
  { name: "Caffeine & Machine — The Hut", venue: "The Hut", region: "South East", county: "Hampshire", town: "Petersfield", organiser: "Caffeine & Machine", url: "https://caffeineandmachine.com/thehut/book-a-table/", desc: "Cars & coffee at Caffeine & Machine's Hampshire site. Drop in free or reserve a parking space in advance." },
  { name: "Caffeine & Machine — The Hill", venue: "The Hill", region: "West Midlands", county: "Warwickshire", town: "Stratford-upon-Avon", organiser: "Caffeine & Machine", url: "https://caffeineandmachine.com/thehill/book-a-table/", desc: "Cars & coffee at the original Caffeine & Machine in Warwickshire. Drop in free or reserve a parking space in advance." },
  { name: "Caffeine & Machine — The Bowl", venue: "The Bowl", region: "East of England", county: "Bedfordshire", town: "Bedford", organiser: "Caffeine & Machine", url: "https://caffeineandmachine.com/thebowl/book-a-table/", desc: "Cars & coffee at Caffeine & Machine's Bedfordshire site. Drop in free or reserve a parking space in advance." },
];

const SHIFT: { date: string; slug: string }[] = [
  { date: "2026-07-19", slug: "shift-social-morning-meet-20" },
  { date: "2026-08-23", slug: "shift-social-morning-meet-19" },
  { date: "2026-09-20", slug: "shift-social-morning-meet-22" },
  { date: "2026-10-18", slug: "shift-social-morning-meet-21" },
];

const base = (id: number, v: Venue, iso: string): CarEvent => ({
  id, name: v.name, type: "meet", region: v.region, county: v.county, town: v.town,
  venue: v.venue, start: iso, end: iso, img: 33419743, organiser: v.organiser,
  desc: v.desc, tiers: [{ name: "Entry", price: 0 }], free: true, bookingUrl: v.url,
});

const recurring: CarEvent[] = VENUES.flatMap((v, vi) =>
  SUNDAYS.map((iso, si) => base(1301 + vi * SUNDAYS.length + si, v, iso))
);

const shift: CarEvent[] = SHIFT.map((s, i) => ({
  id: 1369 + i, name: "Shift Social Morning Meet", type: "meet", region: "South East",
  county: "Hampshire", town: "Andover", venue: "The Lion, Clanville", start: s.date, end: s.date,
  img: 33419743, organiser: "Shift Social",
  desc: "Free monthly morning meet at The Lion, Clanville. Bacon rolls, coffee and lots of cars. RSVP to attend.",
  tiers: [{ name: "Entry", price: 0 }], free: true,
  bookingUrl: `https://www.shift-social.co.uk/event-details/${s.slug}`,
}));

export const SEED_5: CarEvent[] = [...recurring, ...shift];
