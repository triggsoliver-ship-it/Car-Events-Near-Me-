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
  const { data, error } = await sb
    .from("events")
    .select("*")
    .eq("status", "pending")
    .order("created_at", { ascending: false })
    .limit(500);
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
  } else if (b.action === "update") {
    // Edit fields on a listing (e.g. organiser-supplied wording, a hosted
    // photo URL) without changing its status. Only touches fields present
    // in the request so a partial edit (just img_url, say) can't blank
    // out other fields.
    const patch: Record<string, unknown> = {};
    if (typeof b.description === "string") patch.description = b.description;
    if (typeof b.img_url === "string") patch.img_url = b.img_url;
    if (typeof b.venue === "string") patch.venue = b.venue;
    if (Object.keys(patch).length === 0) {
      return NextResponse.json({ error: "No editable fields provided" }, { status: 400 });
    }
    const { error } = await sb.from("events").update(patch).eq("id", b.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
