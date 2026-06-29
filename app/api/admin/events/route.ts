import { NextResponse } from "next/server";
import { getClient, dbEnabled } from "@/lib/db";

export const runtime = "nodejs";

function authed(token: string | null) {
  const admin = process.env.ADMIN_TOKEN;
  return Boolean(admin && token && token === admin);
}

export async function GET(request: Request) {
  if (!dbEnabled) return NextResponse.json({ error: "DB not enabled" }, { status: 503 });
  const token = new URL(request.url).searchParams.get("token");
  if (!authed(token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
  if (!dbEnabled) return NextResponse.json({ error: "DB not enabled" }, { status: 503 });
  let b: any = {};
  try { b = await request.json(); } catch { /* ignore */ }
  if (!authed(b.token)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const sb = getClient(true);
  if (!sb) return NextResponse.json({ error: "Server not configured" }, { status: 503 });
  if (b.action === "approve") {
    const { error } = await sb.from("events").update({ status: "approved" }).eq("id", b.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else if (b.action === "reject") {
    const { error } = await sb.from("events").update({ status: "rejected" }).eq("id", b.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  } else {
    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
