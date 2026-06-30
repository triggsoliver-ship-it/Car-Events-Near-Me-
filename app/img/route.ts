// Image proxy: fetches an allow-listed external image server-side and re-serves
// it from our own origin. Needed because some booking partners (e.g.
// trackdays.co.uk's Cloudflare CDN) block cross-origin hotlinking by referrer,
// so the browser can't load their images directly — but a server fetch can.
export const runtime = "nodejs";
export const revalidate = 604800; // cache the proxied image for a week

// Hosts we are willing to re-serve. Each is a real publisher / official event
// site or the CDN their og:image / hero photos actually live on. Keep this list
// in sync with the proxy(...) URLs used in lib/venueImages.ts.
const ALLOW = new Set([
  // Track-day booking partner CDN.
  "cdn.trackdays.co.uk",
  "www.trackdays.co.uk",
  // Concours of Elegance (Hampton Court Palace) — photos live on the bare host.
  "concoursofelegance.co.uk",
  "www.concoursofelegance.co.uk",
  // Bonhams Cars / "THE MARKET" (MPH, Bicester) hero imagery CDN.
  "cdn.themarket.co.uk",
  // The British Motor Show.
  "www.thebritishmotorshow.live",
  "thebritishmotorshow.live",
  // National Motor Museum, Beaulieu.
  "www.beaulieu.co.uk",
  "beaulieu.co.uk",
  // Salon Privé (Blenheim).
  "www.salonpriveconcours.com",
  // Brooklands Museum.
  "www.brooklandsmuseum.com",
  // Caffeine & Machine.
  "media.caffeineandmachine.com",
  // The London Classic Car Show.
  "www.thelondonclassiccarshow.co.uk",
]);

export async function GET(req: Request) {
  const u = new URL(req.url).searchParams.get("u");
  if (!u) return new Response("missing u", { status: 400 });

  let target: URL;
  try {
    target = new URL(u);
  } catch {
    return new Response("bad url", { status: 400 });
  }
  if (target.protocol !== "https:" || !ALLOW.has(target.hostname)) {
    return new Response("forbidden", { status: 403 });
  }

  try {
    const upstream = await fetch(target.toString(), {
      headers: {
        // Present as a same-site request to satisfy referrer-based hotlink
        // protection, with a normal browser UA.
        Referer: `https://${target.hostname}/`,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
      },
    });
    if (!upstream.ok) {
      return new Response("upstream " + upstream.status, { status: 502 });
    }
    const buf = await upstream.arrayBuffer();
    return new Response(buf, {
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "image/jpeg",
        "Cache-Control":
          "public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400",
      },
    });
  } catch {
    return new Response("fetch error", { status: 502 });
  }
}
