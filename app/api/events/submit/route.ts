import { NextResponse } from "next/server";
import { getClient, dbEnabled } from "@/lib/db";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!dbEnabled) {
    return NextResponse.json(
      { error: "Submissions are not enabled yet — the database hasn't been connected. See SETUP.md." },
      { status: 503 }
    );
  }
  let b: any = {};
  try { b = await request.json(); } catch { /* ignore */ }

  const required = ["name", "type", "region", "town", "start", "organiser"];
  for (const k of required) {
    if (!b[k] || String(b[k]).trim() === "") {
      return NextResponse.json({ error: `Missing field: ${k}` }, { status: 400 });
    }
  }

  const priceFrom = b.priceFrom ? parseFloat(b.priceFrom) : 0;
  const row = {
    name: String(b.name).slice(0, 200),
    type: String(b.type),
    region: String(b.region),
    county: b.county ? String(b.county) : null,
    town: String(b.town),
    venue: b.venue ? String(b.venue) : null,
    start_date: String(b.start),
    end_date: b.end ? String(b.end) : String(b.start),
    organiser: String(b.organiser),
    description: b.description ? String(b.description).slice(0, 500) : null,
    booking_url: b.bookingUrl ? String(b.bookingUrl) : null,
    tiers: [{ name: priceFrom > 0 ? "Entry" : "Free Entry", price: isNaN(priceFrom) ? 0 : priceFrom }],
    free: !priceFrom,
    contact_email: b.contactEmail ? String(b.contactEmail) : null,
    status: "pending",
    source: "submission",
    external_id: "submission-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
  };

  const sb = getClient(true);
  if (!sb) return NextResponse.json({ error: "Server not configured" }, { status: 503 });
  const { error } = await sb.from("events").insert(row);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
