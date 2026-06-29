import { NextResponse } from "next/server";
import { parseICS, parseJsonLd } from "@/lib/importers";

export const runtime = "nodejs";
export const maxDuration = 30;

// Validate any candidate feed without writing to the database.
// Usage: /api/import/test?secret=CRON_SECRET&kind=ical|jsonld&url=ENCODED_URL
export async function GET(request: Request) {
  const u = new URL(request.url);
  const secret = u.searchParams.get("secret");
  if (process.env.CRON_SECRET && secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const url = u.searchParams.get("url");
  const kind = (u.searchParams.get("kind") || "jsonld").toLowerCase();
  if (!url) return NextResponse.json({ error: "pass ?url=…" }, { status: 400 });
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "CarEventsNearMeBot/1.0 (+https://careventsnearme.uk)" },
    });
    const text = await res.text();
    let items: any[] = [];
    if (kind === "ical") {
      items = parseICS(text).map((e) => ({ name: e.title, start: e.start, end: e.end, location: e.location }));
    } else {
      items = parseJsonLd(text).map((e: any) => ({
        name: e.name,
        start: e.startDate,
        location: e.location && e.location.name,
        url: e.url,
      }));
    }
    return NextResponse.json({
      ok: true,
      httpStatus: res.status,
      bytes: text.length,
      kind,
      count: items.length,
      sample: items.slice(0, 5),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "fetch failed" }, { status: 500 });
  }
}
