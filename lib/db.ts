import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { CarEvent } from "@/lib/types";

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const SERVICE = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** True once the Supabase env vars are set (in Vercel). Until then the app
 *  transparently falls back to the bundled seed data, so it always works. */
export const dbEnabled = Boolean(URL && (ANON || SERVICE));

// Always hit the network for Supabase reads. Next.js patches fetch() and will
// otherwise cache results in its persistent Data Cache (which survives
// redeploys). During an earlier period the anon read was failing, so empty
// results got cached and kept 404ing real events. Forcing no-store guarantees
// every read reflects the live database.
const noStoreFetch: typeof fetch = (input, init) =>
  fetch(input, { ...init, cache: "no-store" });

export function getClient(admin = false): SupabaseClient | null {
  if (!URL) return null;
  // Prefer the service-role key. All reads run server-side, where SERVICE is
  // defined and bypasses RLS with a known-good key. In the browser SERVICE is
  // undefined (not a NEXT_PUBLIC_ var), so ANON is used there instead.
  const key = SERVICE || ANON;
  if (!key) return null;
  return createClient(URL, key, {
    auth: { persistSession: false },
    global: { fetch: noStoreFetch },
  });
}

export type EventRow = {
  id: number;
  name: string;
  type: string;
  region: string | null;
  county: string | null;
  town: string | null;
  venue: string | null;
  start_date: string;
  end_date: string;
  img: number | null;
  img_url: string | null;
  organiser: string | null;
  description: string | null;
  tiers: { name: string; price: number }[] | null;
  booking_url: string | null;
  free: boolean | null;
  status: string;
  source: string;
  external_id: string | null;
};

export function rowToEvent(r: EventRow): CarEvent {
  return {
    id: r.id,
    name: r.name,
    type: r.type as CarEvent["type"],
    region: r.region || "Other",
    county: r.county || "",
    town: r.town || "",
    venue: r.venue || "",
    start: r.start_date,
    end: r.end_date || r.start_date,
    img: r.img ?? 10373678,
    imgUrl: r.img_url || undefined,
    organiser: r.organiser || "",
    desc: r.description || "",
    tiers: r.tiers && r.tiers.length ? r.tiers : [{ name: "Entry", price: 0 }],
    free: r.free ?? undefined,
    bookingUrl: r.booking_url || undefined,
  };
}
