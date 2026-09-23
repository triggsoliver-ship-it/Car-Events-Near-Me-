import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { getClient, dbEnabled } from "@/lib/db";

export const runtime = "nodejs";

function constantTimeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a, "utf8");
  const y = Buffer.from(b, "utf8");
  if (x.length !== y.length) return false;
  return timingSafeEqual(x, y);
}

/**
 * The admin token travels in `Authorization: Bearer <token>`, never in the
 * query string. A token in the URL ends up in hosting access logs, browser
 * history and any Referer header sent to a third party. The token is never
 * logged here either.
 */
function authed(request: Request): boolean {
  const admin = process.env.ADMIN_TOKEN;
  if (!admin) return false;
  const header = request.headers.get("authorization");
  if (!header || !header.startsWith("Bearer ")) return false;
  return constantTimeEqual(header.slice("Bearer ".length), admin);
}

const unauthorized = () => NextResponse.json({ error: "Unauthorized" }, { status: 401 });

export async function GET(request: Request) {
  if (!authed(request)) return unauthorized();
  if (!dbEnabled) return NextResponse.json({ error: "DB not enabled" }, { status: 503 });
  const sb = getClient(true);
  if (!sb) return NextResponse.json({ error: "Server not configured" }, { status: 503 });
  const { searchParams } = new URL(request.url);
  // Default view is "recent" (everything, most recently created first) so an
  // already-approved or already-rejected listing can still be found and
  // edited. Pass ?status=pending to filter back down to just the queue.
  const status = searchParams.get("status");
  // ?q= finds one listing fast: "36554", "#36554", a pasted
  // careventsnearme.uk/events/36554 link, or words from the name, town,
  // organiser or contact email. Without it only the 500 newest rows come back,
  // so an older listing could not be found at all.
  const search = (searchParams.get("q") || "").trim();
  let q = sb.from("events").select("*").order("created_at", { ascending: false }).limit(500);
  if (status) q = q.eq("status", status);
  if (search) {
    const idMatch = search.match(/^#?(\d{1,9})$/) || search.match(/events\/(\d{1,9})/);
    if (idMatch) {
      q = q.eq("id", Number(idMatch[1]));
    } else {
      // Strip characters that have meaning inside a PostgREST or() filter.
      const s = search.replace(/[%,()*\\]/g, " ").trim().slice(0, 80);
      if (s) {
        const like = `%${s}%`;
        q = q.or(`name.ilike.${like},town.ilike.${like},organiser.ilike.${like},contact_email.ilike.${like},venue.ilike.${like}`);
      }
    }
  }
  const { data, error } = await q;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ events: data });
}

export async function POST(request: Request) {
  if (!authed(request)) return unauthorized();
  if (!dbEnabled) return NextResponse.json({ error: "DB not enabled" }, { status: 503 });
  let b: any = {};
  try { b = await request.json(); } catch { /* ignore */ }
  const sb = getClient(true);
  if (!sb) return NextResponse.json({ error: "Server not configured" }, { status: 503 });
  if (b.action === "approve") {
    const { error } = await sb.from("events").update({ status: "approved" }).eq("id", b.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else if (b.action === "reject") {
    const { error } = await sb.from("events").update({ status: "rejected" }).eq("id", b.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else if (b.action === "unpublish") {
    // Send an already-approved listing back to pending — used when it went
    // live before its content was finalised.
    const { error } = await sb.from("events").update({ status: "pending" }).eq("id", b.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else if (b.action === "update") {
    const patch: Record<string, unknown> = {};
    if (typeof b.description === "string") patch.description = b.description;
    if (typeof b.img_url === "string") patch.img_url = b.img_url;
    if (typeof b.venue === "string") patch.venue = b.venue;
    if (typeof b.booking_url === "string") patch.booking_url = b.booking_url;
    // Price tiers and the free flag. A listing can go live as "Free entry —
    // just turn up" when the event is actually ticket-only (Dubs at the Lakes,
    // Sep 2026, whose organiser had already been sent the link). It has to be
    // corrected in place so that link keeps working, not deleted and re-created.
    // An empty list is allowed: it means "prices not confirmed yet", which the
    // site shows as "check the official site" (see lib/prices.ts).
    if (b.tiers !== undefined) {
      if (!Array.isArray(b.tiers)) {
        return NextResponse.json({ error: "tiers must be a list" }, { status: 400 });
      }
      const tiers: { name: string; price: number }[] = [];
      for (const t of b.tiers.slice(0, 10)) {
        const name = t && typeof t.name === "string" ? t.name.trim().slice(0, 80) : "";
        const price = t ? Number(t.price) : NaN;
        if (!name || !Number.isFinite(price) || price < 0) {
          return NextResponse.json({ error: "Each price needs a name and an amount of 0 or more" }, { status: 400 });
        }
        tiers.push({ name, price: Math.round(price * 100) / 100 });
      }
      patch.tiers = tiers;
    }
    if (typeof b.free === "boolean") patch.free = b.free;
    if (Object.keys(patch).length === 0) {
      return NextResponse.json({ error: "No editable fields provided" }, { status: 400 });
    }
    // Seed listings are re-written from lib/seed*.ts by the nightly import, which
    // would silently undo this edit by the next morning. Re-labelling the row
    // "seed-edited" makes the import leave it alone (see app/api/import).
    const { data: current } = await sb.from("events").select("source").eq("id", b.id).single();
    if (current?.source === "seed") patch.source = "seed-edited";
    const { error } = await sb.from("events").update(patch).eq("id", b.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, source: patch.source ?? current?.source });
  } else if (b.action === "create") {
    // Admin-authored listing, inserted straight to "approved" — used when an
    // organiser has already agreed by email/phone, so there is no pending
    // moderation step to go through. Mirrors the row /api/events/submit
    // builds, but trusts the caller (already authenticated as admin) for the
    // full field set, including multi-tier pricing and region/county/town.
    const required = ["name", "type", "region", "town", "start", "organiser"];
    for (const k of required) {
      if (!b[k] || String(b[k]).trim() === "") {
        return NextResponse.json({ error: `Missing field: ${k}` }, { status: 400 });
      }
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
      img_url: b.imgUrl ? String(b.imgUrl).slice(0, 500) : null,
      organiser: String(b.organiser),
      description: b.description ? String(b.description).slice(0, 500) : null,
      booking_url: b.bookingUrl ? String(b.bookingUrl) : null,
      // No prices given = "not confirmed yet", never a made-up £0 entry.
      tiers: Array.isArray(b.tiers) ? b.tiers : [],
      free: b.free === true,
      contact_email: b.contactEmail ? String(b.contactEmail) : null,
      status: "approved",
      source: "admin",
      external_id: b.externalId ? String(b.externalId) : "admin-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8),
    };
    const { data, error } = await sb.from("events").insert(row).select("id").single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ ok: true, id: data?.id });
  } else {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
