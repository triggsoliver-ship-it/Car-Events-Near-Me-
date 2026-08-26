import { NextResponse } from "next/server";
import { getClient, dbEnabled } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// TEMPORARY — one-off, to be reverted right after use. Looks up the specific
// Kop Hill Climb Festival submission made moments before this route existed
// (so its POST response didn't include the new id field). Hardcoded query,
// not a general lookup endpoint.
export async function GET() {
  if (!dbEnabled) return NextResponse.json({ error: "db not enabled" }, { status: 503 });
  const sb = getClient(true);
  if (!sb) return NextResponse.json({ error: "no client" }, { status: 503 });
  const { data, error } = await sb
    .from("events")
    .select("id,name,status,created_at")
    .eq("name", "Kop Hill Climb Festival")
    .eq("start_date", "2026-09-12")
    .eq("source", "submission")
    .order("created_at", { ascending: false })
    .limit(3);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ rows: data });
}
