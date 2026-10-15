-- Car Events Near Me — database schema (run this whole file in the Supabase SQL editor)

create table if not exists public.events (
  -- Ids start at 500000 so database submissions never clash with the bundled
  -- seed events (which use ids well below that). This lets the site merge both.
  id           bigint generated always as identity (start with 500000) primary key,
  name         text not null,
  type         text not null,
  region       text,
  county       text,
  town         text,
  venue        text,
  start_date   date not null,
  end_date     date not null,
  img          bigint,
  img_url      text,
  organiser    text,
  description  text,
  tiers        jsonb default '[]'::jsonb,
  booking_url  text,
  free         boolean default false,
  status       text not null default 'pending',   -- pending | approved | rejected
  source       text not null default 'submission',
  external_id  text unique,
  contact_email text,
  created_at   timestamptz default now()
);

-- Safe to re-run on an existing database: adds the event-photo column if missing.
alter table public.events add column if not exists img_url text;

-- Extra categories an event should ALSO be found under, besides `type` (the
-- single "primary" category). e.g. a historic road rally is primarily
-- `motorsport` but an organiser may reasonably also want it listed under
-- `classic`. Empty array for the vast majority of events. See
-- lib/util.ts matchesCategory() and components/Explore.tsx for how this is
-- applied when filtering by category.
alter table public.events add column if not exists categories text[] default '{}'::text[];

create index if not exists events_status_end_idx on public.events (status, end_date);
create index if not exists events_region_idx on public.events (region);
create index if not exists events_type_idx on public.events (type);
create index if not exists events_categories_idx on public.events using gin (categories);

-- Row Level Security: the public (anon key) may only read approved events.
-- All writes happen via the service-role key on the server, which bypasses RLS.
alter table public.events enable row level security;

drop policy if exists "public read approved" on public.events;
create policy "public read approved"
  on public.events for select
  using (status = 'approved');
