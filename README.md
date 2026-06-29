# Car Events Near Me

**Every UK car event, bookable in one place.** — [careventsnearme.uk](https://careventsnearme.uk)

A search-and-book platform that pulls UK car events — classic shows, meets, modified gatherings, track days, auctions, autojumbles and motorsport festivals — into one place. Search by region, county, town, date and price, then book direct.

## Status

Early build. This repo currently contains a **clickable front-end prototype** (`index.html`) with realistic UK sample events, full search/filter, event pages and a mocked booking → checkout → e-ticket flow. It is the foundation for the production build.

## Repo contents

| Path | What it is |
|------|------------|
| `index.html` | Self-contained prototype site (HTML/CSS/JS, no build step). Open it in any browser. |
| `docs/Car-Events-Near-Me-Plan.md` | Strategy & build plan — market gap, booking/integration model, tech stack, roadmap. |

## Running it

No build step yet — just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

### Deploy a live preview (GitHub Pages)

Because `index.html` is at the repo root, you can publish it for free:
**Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / root → Save.**
The site will go live at `https://triggsoliver-ship-it.github.io/Car-Events-Near-Me-/`.

## Photography

Imagery is currently sourced from [Pexels](https://www.pexels.com/license/) (free for commercial use, no attribution required). For launch, replace with owned or organiser-supplied photography from the actual events.

## Roadmap (summary)

- **Phase 1 — MVP:** Next.js + PostgreSQL, ~250 seeded events, search/filter/map, event pages, Stripe Connect booking + affiliate link-out, organiser submit form.
- **Phase 2 — Marketplace:** organiser dashboards, Eventbrite embedded checkout, attendee accounts, e-ticket QR + door scanning.
- **Phase 3 — Growth:** Ticketmaster/Skiddle partnerships, reviews, "new events near me" alerts, mobile app.

See `docs/Car-Events-Near-Me-Plan.md` for the full plan.
