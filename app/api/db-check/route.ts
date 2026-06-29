import { getClient, dbEnabled } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!dbEnabled) return new Response("DB not enabled (env vars missing)", { status: 503, headers: { "content-type": "text/plain" } });
  const sb = getClient(false); // public/anon (publishable) key — the read path the site uses
  if (!sb) return new Response("No client", { status: 503, headers: { "content-type": "text/plain" } });
  const today = new Date().toISOString().slice(0, 10);
  const { data, error, count } = await sb
    .from("events")
    .select("name,start_date,tiers", { count: "exact" })
    .eq("status", "approved")
    .gte("end_date", today)
    .order("start_date")
    .limit(3);
  const body = error
    ? "ANON READ FAILED: " + error.message
    : "ANON READ OK. approved upcoming = " + (count ?? (data || []).length) +
      "\nsample: " + JSON.stringify((data || []).map((d: any) => ({ name: d.name, price: d.tiers?.[0]?.price })));
  return new Response(body, { headers: { "content-type": "text/plain" } });
}
