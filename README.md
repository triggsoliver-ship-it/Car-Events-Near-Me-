# Car Events Near Me

**Every UK car event, bookable in one place.** — [careventsnearme.uk](https://careventsnearme.uk)

A search-and-book platform that pulls UK car events — classic shows, meets, modified gatherings, track days, auctions, autojumbles and motorsport festivals — into one place. Search by region, county, town, date and price, then book direct.

## Stack

- **Next.js 14** (App Router) + **TypeScript** — fast, SEO-friendly, deploys on Vercel.
- Server-rendered event pages at `/events/[id]` (shareable, indexable URLs).
- Client-side search/filter (region, county, town, date, price, type, free-only) with sort.
- Past events expire automatically (`getUpcomingEvents()` filters by today's date).
- Booking flow with a Stripe checkout API stub at `/api/checkout`.

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
  list/, signin/        Placeholder pages
  api/checkout/route.ts Booking endpoint (Stripe stub)
components/
  Explore.tsx           Hero + categories + filter + results (client)
  BookingBox.tsx        Tier select → checkout → e-ticket (client)
  Header.tsx, Footer.tsx
lib/
  events.ts             Seed data + helpers (getUpcomingEvents, getEventById)
  types.ts, util.ts
```

## Roadmap

- **Events data → PostgreSQL.** Swap the seed array in `lib/events.ts` for a database (Vercel Postgres / Neon) with PostGIS for "near me" distance search. The `lib/events.ts` helpers are the only thing the UI depends on, so this is a drop-in change.
- **Live bookings.** Implement Stripe Connect in `app/api/checkout/route.ts` (Route A: be the box office; platform fee per ticket). Add Eventbrite embed / affiliate link-out for events on other platforms.
- **Organiser portal** at `/list` — submit and manage events, set pricing/capacity, view bookings.
- **Accounts** at `/signin` — saved events and booking history; "new events near me" alerts.

## Photography

Imagery is currently sourced from [Pexels](https://www.pexels.com/license/) (free for commercial use, no attribution required). For launch, replace with owned or organiser-supplied photography.

## Prototype

The original single-file clickable prototype (pure HTML/CSS/JS) is preserved in git history — see commit `b66f50c`, file `index.html`.
