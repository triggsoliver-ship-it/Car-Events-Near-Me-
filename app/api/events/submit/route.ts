import { NextResponse } from "next/server";
import { getClient, dbEnabled } from "@/lib/db";
import { parsePriceLines } from "@/lib/prices";
import type { Tier } from "@/lib/types";

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

  // Only accept a photo link that is a real http(s) URL.
  let imgUrl: string | null = null;
  if (b.imgUrl && /^https?:\/\/\S+$/i.test(String(b.imgUrl).trim())) {
    imgUrl = String(b.imgUrl).trim().slice(0, 500);
  }

  // Entry is an explicit choice. A missing price means "not known yet", never
  // "free" (see lib/prices.ts).
  let tiers: Tier[] = [];
  let free = false;
  if (b.entry === "free") {
    tiers = [{ name: "Free entry", price: 0 }];
    free = true;
  } else if (b.entry === "paid") {
    const parsed = parsePriceLines(String(b.prices || ""));
    if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });
    tiers = parsed.tiers;
  } else if (b.priceFrom) {
    // Older form: a single "from" price.
    const p = parseFloat(b.priceFrom);
    if (Number.isFinite(p) && p > 0) tiers = [{ name: "Entry", price: Math.round(p * 100) / 100 }];
  }
  const row = {
    name: String(b.name).slice(0, 200),
    type: String(b.type),
    region: String(b.region),
    county: b.county ? String(b.county) : null,
    town: String(b.town),
    venue: b.venue ? String(b.venue) : null,
    start_date: String(b.start),
    end_date: b.end ? String(b.end) : String(b.start),
    img_url: imgUrl,
    organiser: String(b.organiser),
    description: b.description ? String(b.description).slice(0, 500) : null,
    booking_url: b.bookingUrl ? String(b.bookingUrl) : null,
    tiers,
    free,
    contact_email: b.contactEmail ? String(b.contactEmail) : null,
    status: "pending",
    source: "submission",
    external_id: "submission-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
  };

  const sb = getClient(true);
  if (!sb) return NextResponse.json({ error: "Server not configured" }, { status: 503 });
  const { data, error } = await sb.from("events").insert(row).select("id").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true, id: data?.id });
}
