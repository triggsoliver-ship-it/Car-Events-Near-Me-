# Car Events Near Me — Strategy & Build Plan

*Every UK car event, bookable in one place. Search by region, county, town, date and price — and book your spot.*

Prepared 29 June 2026

---

## 1. The opportunity

The UK has a huge, year-round car-event scene — classic shows, modern meets, modified gatherings, track days, auctions, autojumbles and motorsport festivals — but listings are scattered and the experience is dated. A scan of the current players shows a clear gap.

| Site | Coverage | Filtering | Booking | Weakness |
|---|---|---|---|---|
| **CarEvents.com** | Broad (shows, track days, meets) | Basic | Mostly links out | Cluttered, dated UX, no unified checkout |
| **MotorHype** | Broad, free organiser listings | Location/date/distance | No | Listings only; no transactions |
| **Find Me Car Shows** | Shows/meets | Map-based "near me" | No | Niche, no booking |
| **Classic Car Shows UK** | Classic only | Date/region | No | Single genre |
| **Downshift Culture** | Meets/track days | By region | No | Modern-culture niche, no booking |
| **Eventbrite / AllEvents** | Generic | Generic | Yes | Not car-specific; events buried among everything |

**The wedge:** nobody offers a single, modern, genuinely *bookable* platform that covers every event type with strong region/county/town + date + price filtering. The incumbents are either listings-only or niche by genre.

## 2. Name & positioning

**Name:** *Car Events Near Me* — chosen deliberately for SEO. It's the exact phrase high-intent users search, so the domain (`careventsnearme.uk`) can rank organically for the most valuable query in the category. For a directory whose growth depends on search traffic, an exact-match descriptive name is a genuine acquisition advantage over a brandable-but-invisible name.

- **Trade-off acknowledged:** descriptive names are less distinctive and harder to trademark. Mitigate with a strong logo/wordmark and a memorable tagline.
- **One-liner:** *Every UK car event, bookable in one place.*
- **For attendees:** find events near you by region/county/town, filter by date and price, book in a couple of taps.
- **For organisers:** list free, reach a targeted audience, take bookings/payments without building your own ticketing.

Revenue: a small booking fee per ticket (and/or a percentage), featured/promoted listings, affiliate commission on linked-out events, and later organiser subscriptions for analytics and tools.

## 3. MVP feature set

**Attendee side**
- Homepage with prominent search (region/county/town, date range, price, event type, free-text).
- Results as a list **and** map; sortable by date, distance, price.
- Filter facets: event type (show, meet, modified, classic, track day, auction, autojumble, motorsport), region, county, date range, price range, free-entry toggle.
- Event detail page: dates/times, venue + map, pricing tiers, description, organiser, what's on.
- Booking flow: select tier + quantity → checkout → payment → confirmation + e-ticket.
- Guest checkout for MVP; accounts (saved events, my bookings) shortly after.

**Organiser side**
- Submit/manage listings, set pricing tiers and capacity, view bookings. (Phase 2 — MVP seeds listings manually + a simple submit form.)

## 4. Booking & integrations (the core of your request)

You want a booking on our site to **also** book the event with the provider. There's no universal "book once, propagates everywhere" — so we use a **hybrid** model, strongest where we control the most:

**Route A — Be the box office (primary, true auto-booking).**
Organisers who onboard use Car Events Near Me *as* their ticketing, with **Stripe Connect** so they get paid directly and we take an automatic application fee. When a customer books, it *is* booked — we are the system of record, so there's no second system to sync and no double-booking risk. This is the cleanest realisation of "book with us = booked."

**Route B — Distribution-partner / embedded checkout (for events already on big platforms).**
- **Ticketmaster Partner API** lets approved partners reserve and purchase off-platform, delivering the ticket in Ticketmaster's app/site — but it's invite-only and requires a negotiated distribution agreement.
- **Eventbrite** has *no* public order-creation API; the supported path is embedding their checkout on our event page (the booking completes on Eventbrite) or becoming a listed distribution partner.
- **Skiddle's** API is in beta and any commercial use needs written approval from them.

So Route B booking is real but gated behind per-provider agreements; we pursue these as partnerships over time.

**Route C — Affiliate link-out (everything not yet integrated).**
Clean handoff to the provider's own checkout; we earn referral commission and the directory still looks complete from day one.

**Sequencing:** launch with Route A (owned booking) for onboarded organisers + Route C (link-out) for everyone else, so the catalogue is full immediately and at least some events are genuinely bookable end-to-end. Add Route B integrations (Eventbrite embed first, Ticketmaster/Skiddle partnerships next) as volume justifies the deals.

**Data model implication:** every event row carries a `bookingMode` field (`owned` | `partner` | `affiliate`) so the front end knows whether to show our checkout, an embedded provider checkout, or an outbound link.

## 5. Tech approach

**Prototype (delivered):** self-contained HTML/CSS/JS with realistic UK sample data — click through search → filter → event → booking locally before committing to a stack.

**Production (recommended):**
- **Frontend:** Next.js (React) — fast, SEO-friendly (critical given the name strategy), hosted on Vercel.
- **Backend/DB:** Next.js API routes or a small Node service; PostgreSQL (events, venues, tickets, bookings, organisers) with PostGIS for geo/distance ("near me") queries.
- **Search/filter:** start with Postgres; add Typesense/Algolia if needed.
- **Maps:** Mapbox or Leaflet + OpenStreetMap.
- **Payments:** Stripe Connect (Route A).
- **Integrations layer:** per-provider adapters (Eventbrite embed, Ticketmaster Partner API, affiliate links) behind the `bookingMode` field.
- **Auth:** email + social login.

## 6. Getting the events in

The product is only as good as its data. Plan:
1. **Seed manually** — the biggest 200–300 UK events to launch looking complete.
2. **Organiser submissions** — free self-serve listing; incentivise with free booking tools (Route A).
3. **Partnerships** — clubs and venues (Goodwood, NEC, Santa Pod) as channel partners.
4. **Light imports** of public calendars where permitted, normalised into the database.

## 7. Roadmap

- **Phase 0 (done):** competitor scan, name, this plan, clickable prototype.
- **Phase 1 — MVP (~6–8 wks):** Next.js build, Postgres schema, ~250 seeded events, search/filter/map, event pages, Stripe Connect owned booking + affiliate link-out, organiser submit form.
- **Phase 2 — Integrations & marketplace (~6 wks):** organiser dashboards, Eventbrite embedded checkout, attendee accounts/saved events, e-ticket QR + door scanning.
- **Phase 3 — Growth:** Ticketmaster/Skiddle partnerships, reviews/ratings, "new events near me" alerts, mobile app, organiser analytics, sponsorship/ads.

## 8. Risks

- **Data freshness** — stale listings kill trust. Mitigate with organiser self-service + automated reminders.
- **Chicken-and-egg** — seed heavily and use link-out before full onboarding.
- **Integration dependency** — Route B relies on third-party agreements outside our control; never let the catalogue depend on them (Routes A + C always work).
- **Brand defensibility** — descriptive name is hard to protect; invest in wordmark, UX and SEO moat.
- **Incumbents** — CarEvents has an SEO head start; win on UX, booking and breadth.
