import { NextResponse } from "next/server";
import { getClient, dbEnabled } from "@/lib/db";
import { runImport, ImportRow } from "@/lib/importers";
import { getSeedEvents } from "@/lib/events";

export const runtime = "nodejs";
export const maxDuration = 60;

function authed(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true; // if no secret set, allow (e.g. first manual run)
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
    free: Boolean(e.free),
    status: "approved" as const,
    source: "seed",
    external_id: "seed-" + e.id,
  }));
}

export async function GET(request: Request) {
  if (!dbEnabled) return NextResponse.json({ error: "DB not enabled" }, { status: 503 });
  if (!authed(request)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sb = getClient(true);
  if (!sb) return NextResponse.json({ error: "Server not configured" }, { status: 503 });

  const { rows, errors } = await runImport();
  const all = [...seedRows(), ...rows];

  let upserted = 0;
  for (let i = 0; i < all.length; i += 500) {
    const batch = all.slice(i, i + 500);
    const { error } = await sb.from("events").upsert(batch, { onConflict: "external_id" });
    if (error) errors.push("upsert: " + error.message);
    else upserted += batch.length;
  }
  return NextResponse.json({ ok: true, imported: rows.length, seeded: seedRows().length, upserted, errors });
}

export const POST = GET;
