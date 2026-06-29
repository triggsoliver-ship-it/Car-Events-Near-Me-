import { NextResponse } from "next/server";
import { getClient, dbEnabled } from "@/lib/db";
import { runImport, ImportRow } from "@/lib/importers";
import { getSeedEvents } from "@/lib/events";

export const runtime = "nodejs";
export const maxDuration = 60;

function authed(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  const auth = request.headers.get("authorization");
  const q = new URL(request.url).searchParams.get("secret");
  return auth === "Bearer " + secret || q === secret;
}

function seedRows(): ImportRow[] {
  return getSeedEvents().map((e) => ({
    name: e.name,
    type: e.type,
    region: e.region,
    county: e.county || null,
    town: e.town || null,
    venue: e.venue || null,
    start_date: e.start,
    end_date: e.end,
    organiser: e.organiser || null,
    description: e.desc || null,
    booking_url: e.bookingUrl || null,
    img: e.img,
    tiers: e.tiers,
    free: Boolean(e.free),
    status: "approved" as const,
    source: "seed",
    external_id: "seed-" + e.id,
  }));
}

export async function GET(request: Request) {
  try {
    if (!dbEnabled) return NextResponse.json({ error: "DB not enabled" }, { status: 503 });
    if (!authed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const sb = getClient(true);
    if (!sb) return NextResponse.json({ error: "Server not configured" }, { status: 503 });

    // Live web sources are paused (TrackDays returns 403 to cloud IPs until they whitelist careventsnearme.uk;
    // their events are baked into lib/seed4.ts). Flip to true to re-enable runImport().
    const LIVE_SOURCES_ENABLED = false;
    const { rows, errors } = LIVE_SOURCES_ENABLED
      ? await runImport()
      : { rows: [] as ImportRow[], errors: [] as string[] };

    if (new URL(request.url).searchParams.get("dry")) {
      const sample = rows.slice(0, 8).map((r) => `${r.start_date} | ${r.name} | ${r.town} (${r.region}) | £${r.tiers[0]?.price} | ${r.booking_url}`).join("\n");
      return new Response("DRY RUN (nothing written)\nimported rows: " + rows.length + "\nerrors: " + JSON.stringify(errors) + "\n\n" + sample, { headers: { "content-type": "text/plain" } });
    }

    const all = [...seedRows(), ...rows];

    let upserted = 0;
    for (let i = 0; i < all.length; i += 500) {
      const batch = all.slice(i, i + 500);
      const { error } = await sb.from("events").upsert(batch, { onConflict: "external_id" });
      if (error) errors.push("upsert: " + error.message);
      else upserted += batch.length;
    }
    return NextResponse.json({ ok: true, imported: rows.length, seeded: seedRows().length, upserted, errors });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Import failed" }, { status: 500 });
  }
}

export const POST = GET;
