import type { CarEvent, EventType } from "@/lib/types";

export const CATEGORIES: { type: EventType; label: string; img: number }[] = [
  { type: "show", label: "Car Shows", img: 17075732 },
  { type: "meet", label: "Meets", img: 16896020 },
  { type: "track day", label: "Track Days", img: 15155737 },
  { type: "classic", label: "Classic", img: 2272281 },
  { type: "modified", label: "Modified", img: 20406502 },
  { type: "motorsport", label: "Motorsport", img: 10373678 },
  { type: "auction", label: "Auctions", img: 34879476 },
  { type: "autojumble", label: "Autojumbles", img: 17356337 },
];

export const TYPES: EventType[] = [
  "show", "meet", "modified", "classic", "track day", "auction", "autojumble", "motorsport",
];

const SEED: CarEvent[] = [
  { id: 1, name: "Goodwood Festival of Speed", type: "motorsport", region: "South East", county: "West Sussex", town: "Chichester", venue: "Goodwood House", start: "2026-07-09", end: "2026-07-12", img: 10807493, organiser: "Goodwood", desc: "The world's greatest celebration of motorsport and car culture. A hillclimb featuring everything from F1 cars to prototypes, alongside major manufacturer launches and the supercar paddock.", tiers: [{ name: "Thursday Day Pass", price: 39 }, { name: "Saturday Day Pass", price: 69 }, { name: "Sunday + Hillclimb Finals", price: 79 }, { name: "4-Day Weekend", price: 215 }] },
  { id: 2, name: "The British Motor Show", type: "show", region: "South East", county: "Hampshire", town: "Farnborough", venue: "Farnborough International", start: "2026-08-21", end: "2026-08-23", img: 29831803, organiser: "British Motor Show Ltd", desc: "A consumer motor show built for everyone — live stunt arena, supercar paddock, EV test drives and hundreds of cars to explore.", tiers: [{ name: "Adult Day", price: 22.5 }, { name: "Family (2+2)", price: 65 }, { name: "Weekend Pass", price: 40 }] },
  { id: 3, name: "Practical Classics Car & Restoration Show", type: "classic", region: "West Midlands", county: "West Midlands", town: "Birmingham", venue: "NEC Birmingham", start: "2027-03-20", end: "2027-03-22", img: 29198153, organiser: "NEC Group", desc: "Live restoration demonstrations, barn-find displays, club stands and thousands of spare parts. The UK's biggest restoration show.", tiers: [{ name: "Adult Day", price: 25 }, { name: "Senior Day", price: 23 }, { name: "Weekend", price: 42 }] },
  { id: 4, name: "Santa Pod — Run What Ya Brung", type: "track day", region: "East Midlands", county: "Northamptonshire", town: "Wellingborough", venue: "Santa Pod Raceway", start: "2027-05-16", end: "2027-05-16", img: 11488012, organiser: "Santa Pod Raceway", desc: "Bring any road-legal car and run the famous quarter-mile drag strip. Spectators and racers welcome.", tiers: [{ name: "Spectator", price: 15 }, { name: "RWYB Run Ticket", price: 30 }] },
  { id: 5, name: "Cars & Coffee London", type: "meet", region: "London", county: "Greater London", town: "London", venue: "Battersea Power Station", start: "2026-07-05", end: "2026-07-05", img: 16896020, organiser: "Cars & Coffee UK", free: true, desc: "Free monthly morning meet bringing together everything from JDM to hypercars. Turn up, grab a coffee, talk cars.", tiers: [{ name: "Free Entry", price: 0 }] },
  { id: 6, name: "Silverstone Festival", type: "classic", region: "East Midlands", county: "Northamptonshire", town: "Towcester", venue: "Silverstone Circuit", start: "2026-08-21", end: "2026-08-23", img: 10373678, organiser: "Silverstone", desc: "The world's biggest classic motor racing festival — historic racing, club displays, live music and air displays.", tiers: [{ name: "Friday", price: 45 }, { name: "Saturday", price: 69 }, { name: "3-Day Festival", price: 159 }] },
  { id: 7, name: "Bristol Classic Car Show", type: "classic", region: "South West", county: "Somerset", town: "Shepton Mallet", venue: "Royal Bath & West Showground", start: "2027-04-18", end: "2027-04-19", img: 17075732, organiser: "Bristol Classic", desc: "Hundreds of classics on display, autojumble, club stands and a packed indoor and outdoor show.", tiers: [{ name: "Adult Day", price: 14 }, { name: "Weekend", price: 24 }] },
  { id: 8, name: "Japfest Silverstone", type: "modified", region: "East Midlands", county: "Northamptonshire", town: "Towcester", venue: "Silverstone Circuit", start: "2027-05-09", end: "2027-05-09", img: 20406502, organiser: "Japfest", desc: "The UK's biggest Japanese car festival — show 'n' shine, track action, trade village and run-what-ya-brung sessions.", tiers: [{ name: "Adult Advance", price: 24 }, { name: "Show Car Entry", price: 38 }] },
  { id: 9, name: "Players Classic", type: "modified", region: "South East", county: "Surrey", town: "Hersham", venue: "Goodwood Aerodrome", start: "2026-08-15", end: "2026-08-15", img: 15155737, organiser: "Players", desc: "A curated modified and stance show — some of the cleanest builds in the country in one field.", tiers: [{ name: "Spectator", price: 20 }, { name: "Show & Shine Entry", price: 35 }] },
  { id: 10, name: "Caffeine & Machine — Sunday Gather", type: "meet", region: "West Midlands", county: "Warwickshire", town: "Ettington", venue: "Caffeine & Machine", start: "2026-07-12", end: "2026-07-12", img: 2272281, organiser: "Caffeine & Machine", free: true, desc: "The famous car-culture hospitality house. Informal Sunday gathering — all makes, all welcome.", tiers: [{ name: "Free Entry", price: 0 }] },
  { id: 11, name: "Anglesey Track Day", type: "track day", region: "Wales", county: "Anglesey", town: "Ty Croes", venue: "Anglesey Circuit", start: "2027-06-20", end: "2027-06-20", img: 15155737, organiser: "TrackDays UK", desc: "Open-pit-lane track day on one of the most scenic coastal circuits in Britain. Sessioned by experience level.", tiers: [{ name: "Novice Session", price: 99 }, { name: "Full Day Driver", price: 189 }] },
  { id: 12, name: "Auto Italia — Brooklands", type: "show", region: "South East", county: "Surrey", town: "Weybridge", venue: "Brooklands Museum", start: "2027-05-17", end: "2027-05-17", img: 29252120, organiser: "Auto Italia", desc: "Italian car celebration at the historic Brooklands — Ferrari, Lamborghini, Alfa and Fiat on the famous banking.", tiers: [{ name: "Adult", price: 18 }, { name: "Family", price: 45 }] },
  { id: 13, name: "Beaulieu International Autojumble", type: "autojumble", region: "South East", county: "Hampshire", town: "Beaulieu", venue: "National Motor Museum", start: "2026-09-05", end: "2026-09-06", img: 17356337, organiser: "Beaulieu", desc: "Europe's largest autojumble — 2,000+ stands of parts, automobilia and project cars across the Beaulieu grounds.", tiers: [{ name: "Adult Day", price: 20 }, { name: "Weekend", price: 34 }] },
  { id: 14, name: "Manchester Classic & Performance Auction", type: "auction", region: "North West", county: "Greater Manchester", town: "Manchester", venue: "Manchester Central", start: "2027-04-25", end: "2027-04-25", img: 34879476, organiser: "NW Auctions", desc: "Live classic and performance car auction. Bidder registration and viewing day tickets available.", tiers: [{ name: "Viewing Entry", price: 10 }, { name: "Bidder Registration", price: 45 }] },
  { id: 15, name: "Harrogate Classic Car Spectacular", type: "classic", region: "Yorkshire", county: "North Yorkshire", town: "Harrogate", venue: "Great Yorkshire Showground", start: "2027-06-13", end: "2027-06-14", img: 248687, organiser: "Yorkshire Classics", desc: "A weekend of classics, hot rods and Americana with arena displays and a large autojumble.", tiers: [{ name: "Adult Day", price: 13 }, { name: "Weekend", price: 22 }] },
  { id: 16, name: "Knockhill Open Pit Lane", type: "track day", region: "Scotland", county: "Fife", town: "Dunfermline", venue: "Knockhill Racing Circuit", start: "2026-07-25", end: "2026-07-25", img: 10807493, organiser: "Knockhill", desc: "Scotland's national motorsport centre opens its pit lane for a full driver day. Tuition available.", tiers: [{ name: "Half Day", price: 120 }, { name: "Full Day", price: 215 }] },
  { id: 17, name: "Donington Historic Festival", type: "motorsport", region: "East Midlands", county: "Leicestershire", town: "Castle Donington", venue: "Donington Park", start: "2027-05-02", end: "2027-05-03", img: 10373678, organiser: "Donington Park", desc: "Historic racing across the Bank Holiday weekend, with open paddocks and a huge club display.", tiers: [{ name: "Saturday", price: 25 }, { name: "Weekend", price: 40 }] },
  { id: 18, name: "Cars & Coffee Edinburgh", type: "meet", region: "Scotland", county: "Midlothian", town: "Edinburgh", venue: "Royal Highland Centre", start: "2026-08-02", end: "2026-08-02", img: 16896020, organiser: "Cars & Coffee Scotland", free: true, desc: "Free Sunday morning meet for the east-of-Scotland scene. All makes and models welcome.", tiers: [{ name: "Free Entry", price: 0 }] },
  { id: 19, name: "Castle Combe Spring Action Day", type: "track day", region: "South West", county: "Wiltshire", town: "Chippenham", venue: "Castle Combe Circuit", start: "2027-04-11", end: "2027-04-11", img: 11488012, organiser: "Castle Combe", desc: "Open pit-lane action day on the fast, flowing Wiltshire circuit. Cars and bikes sessioned separately.", tiers: [{ name: "Spectator", price: 12 }, { name: "Car Driver", price: 159 }] },
  { id: 20, name: "NE Classic & Retro Show", type: "classic", region: "North East", county: "Tyne and Wear", town: "Newcastle", venue: "Newcastle Racecourse", start: "2027-06-28", end: "2027-06-28", img: 13683840, organiser: "North East Classics", desc: "Classics, retros and modern classics gather on the racecourse infield with trade stands and food.", tiers: [{ name: "Adult", price: 11 }, { name: "Family", price: 28 }] },
];

export function getAllEvents(): CarEvent[] {
  return SEED;
}

// Only events whose end date is today or later — past events expire automatically.
export function getUpcomingEvents(): CarEvent[] {
  const today = new Date().toISOString().slice(0, 10);
  return SEED.filter((e) => e.end >= today).sort((a, b) => a.start.localeCompare(b.start));
}

export function getEventById(id: number): CarEvent | undefined {
  return SEED.find((e) => e.id === id);
}

export const REGIONS: string[] = Array.from(new Set(SEED.map((e) => e.region))).sort();
