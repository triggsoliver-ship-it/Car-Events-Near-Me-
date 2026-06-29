# Setup — going live with a database, submissions and imports

The app works out of the box on the bundled seed data. To unlock **submissions,
moderation, and automated imports** (and scale to thousands of events), connect
Supabase. ~15 minutes, no coding.

## 1. Create the database (Supabase)

1. Sign up at [supabase.com](https://supabase.com) and create a new project (free tier is fine).
2. In the project, open **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql), and run it. This creates the `events` table.
3. Open **Project Settings → API** and copy:
   - **Project URL**
   - **anon public** key
   - **service_role** key (keep this secret)

## 2. Add environment variables in Vercel

In your Vercel project → **Settings → Environment Variables**, add:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | your Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | service_role key |
| `ADMIN_TOKEN` | any long random string (your moderation password) |
| `CRON_SECRET` | any long random string (protects the import job) |

Redeploy after adding them.

## 3. Load the events

Visit **`/api/import`** once (e.g. `https://your-site/api/import?secret=YOUR_CRON_SECRET`).
This seeds the ~150 curated events into the database and pulls any configured feeds.
After that it runs **automatically every day at 05:00** (configured in `vercel.json`).

## 4. Take submissions

The **List your event** page (`/list`) now writes to the database with status
`pending`. Review them at **`/admin`** — enter your `ADMIN_TOKEN`, then Approve or
Reject. Approved events appear on the site immediately.

## 5. Add live feed sources (scale to thousands)

Open [`lib/importers.ts`](lib/importers.ts) and add entries to the `SOURCES` array —
one per organiser/circuit feed. Two kinds are supported:

- **`ical`** — an iCalendar (`.ics`) feed URL the organiser publishes.
- **`jsonld`** — a public events page that embeds schema.org `Event` data.

Each source is tagged with `region`, `town`, `venue`, `type` etc. so imported events
are filterable. The importer is fault-tolerant: a broken source never breaks the others,
and events de-duplicate on `external_id`.

> **Please respect each site's terms of service and robots.txt.** Use official feeds and
> APIs, or pages where reuse is permitted. For partners, ask for an iCal/RSS feed — most
> ticketing platforms can provide one.

## Notes

- **Past events disappear automatically** — the site only shows events ending today or later.
- Until Supabase is connected, the site happily runs on the bundled seed data.
