import Link from "next/link";
import Explore from "@/components/Explore";
import { getUpcomingEvents, REGIONS } from "@/lib/events";
import { slugify } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const events = await getUpcomingEvents();
  return (
    <main id="main-content">
      <Explore events={events} />

      <section className="block" id="regions" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shead">
            <div>
              <h2>Car events by region</h2>
              <p>Find car shows, meets, track days, auctions and motorsport near you.</p>
            </div>
          </div>
          <div className="loc" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {REGIONS.map((r) => (
              <Link key={r} className="chip" href={`/car-events/${slugify(r)}`}>
                Car events in {r}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="block why">
        <div className="wrap">
          <div className="shead">
            <div>
              <h2>Why book with us</h2>
              <p>The simplest way to never miss a meet.</p>
            </div>
          </div>
          <div className="whygrid">
            <div className="wcard"><div className="ic" aria-hidden="true">⚡</div><h3>Everything in one place</h3><p>Classic, modern, modified, track days, auctions and motorsport — across every UK region, always up to date.</p></div>
            <div className="wcard"><div className="ic" aria-hidden="true">🎟️</div><h3>Book in seconds</h3><p>Real tickets, instant e-ticket with QR code. No bouncing between a dozen organiser websites.</p></div>
            <div className="wcard"><div className="ic" aria-hidden="true">🔔</div><h3>Never miss one</h3><p>Save events and get alerts when new ones drop near you. Your weekends, sorted.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}
