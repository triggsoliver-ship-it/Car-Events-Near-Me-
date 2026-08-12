# Car Events Near Me

**Every UK car event, bookable in one place.** — [careventsnearme.uk](https://careventsnearme.uk)

A search-and-book platform that pulls UK car events — classic shows, meets, modified gatherings, track days, auctions, autojumbles and motorsport festivals — into one place. Search by region, county, town, date and price, then book direct.

## Stack

- **Next.js 14** (App Router) + **TypeScript** — fast, SEO-friendly, deploys on Vercel.
- **Supabase (Postgres)** holds the live event data; the bundled `lib/seed*.ts` arrays are the offline fallback. See [SETUP.md](SETUP.md).
- Server-rendered event pages at `/events/[id]` (shareable, indexable URLs).
- Client-side search/filter (region, county, town, date, price, type, free-only) with sort.
- Past events expire automatically (`getUpcomingEvents()` filters by today's date).
- Aggregator booking model: every booking is completed on the organiser's own site (`components/BookingBox.tsx`). We never take payment on-site; the organiser pays commission.

## Run locally

```bash
npm install
npm run dev
# http://localhost:3000
```

Build for production:

```bash
npm run build && npm start
```

## Deploy (Vercel — recommended)

1. Push to GitHub (done).
2. Go to [vercel.com/new](https://vercel.com/new), import `triggsoliver-ship-it/Car-Events-Near-Me-`.
3. Framework preset auto-detects **Next.js** — accept defaults and deploy.
4. Add a custom domain: Vercel project → **Settings → Domains** → add `careventsnearme.uk` and follow the DNS steps.

## Project structure

```
app/
  layout.tsx            Root layout (header + footer)
  page.tsx              Home (hero, categories, search/filter, event grid)
  events/[id]/page.tsx  Event detail + booking
  track-days/page.tsx   Every upcoming UK car track day
  car-events/[region]/  Region landing pages (SEO)
  car-events/county/    County landing pages (SEO)
  privacy/, terms/      Privacy notice and terms of use
  list/                 Submit an event (writes to the database)
  signin/               Placeholder — accounts not built yet
  admin/                Moderate pending submissions (ADMIN_TOKEN)
  sitemap.ts, robots.ts Generated sitemap.xml / robots.txt
  api/events/submit/    Public event submissions
  api/import/route.ts   Daily import job (Vercel cron)
components/
  Explore.tsx           Hero + categories + filter + results (client)
  BookingBox.tsx        Prices + link out to the organiser's own booking page
  Header.tsx, Footer.tsx
lib/
  events.ts             Data helpers (getUpcomingEvents, getEventById)
  seed1–7.ts            Bundled seed events (fallback + initial DB seed)
  db.ts                 Supabase client + row mapping
  importers.ts          Feed importers (iCal / JSON-LD)
  seo.ts, types.ts, util.ts, venueImages.ts
```

## Shipped

- **Events data → Postgres.** Live data comes from Supabase; `lib/seed*.ts` is the fallback and the initial seed. Setup steps in [SETUP.md](SETUP.md).
- **Daily imports.** `/api/import` runs every day at 05:00 via the Vercel cron in `vercel.json`.
- **Submissions + moderation.** `/list` writes submissions with status `pending`; approve or reject them at `/admin`.
- **SEO pages.** Region (`/car-events/[region]`) and county (`/car-events/county/[county]`) landing pages, a dedicated `/track-days` page, and a generated `sitemap.xml` / `robots.txt`.
- **PWA.** Web manifest, service worker and install prompt.
- **Legal.** Privacy notice (`/privacy`) and terms of use (`/terms`), linked from the footer.

## Roadmap

- **Commission tracking.** Per-organiser referral links and click reporting, so introduced bookings can be reconciled against the commission the organiser owes. (We deliberately do not take payment on-site — the organiser is always the seller.)
- **Organiser portal.** Extend `/list` so organisers can manage their own listings, set pricing/capacity and view bookings (submission and moderation are already live).
- **Accounts** at `/signin` — saved events and booking history; "new events near me" alerts.
- **"Near me" distance search.** Geocode venues and add PostGIS radius filtering.

## Photography

Official organiser imagery is used wherever we have it — per-event `imgUrl` values plus the venue/marque matches in `lib/venueImages.ts`. [Pexels](https://www.pexels.com/license/) stock (free for commercial use, no attribution required) is the fallback. The goal remains owned or organiser-supplied photography on every listing.

## Prototype

The original single-file clickable prototype (pure HTML/CSS/JS) is preserved in git history — see commit `b66f50c`, file `index.html`.
