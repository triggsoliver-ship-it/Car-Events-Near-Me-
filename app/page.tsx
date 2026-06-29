import Explore from "@/components/Explore";
import { getUpcomingEvents } from "@/lib/events";

// Re-evaluate on each request window so the "upcoming" date filter stays current.
export const revalidate = 3600;

export default function HomePage() {
  const events = getUpcomingEvents();
  return (
    <main>
      <Explore events={events} />
      <section className="block why">
        <div className="wrap">
          <div className="shead">
            <div>
              <h2>Why book with us</h2>
              <p>The simplest way to never miss a meet.</p>
            </div>
          </div>
          <div className="whygrid">
            <div className="wcard"><div className="ic">⚡</div><h3>Everything in one place</h3><p>Classic, modern, modified, track days, auctions and motorsport — across every UK region, always up to date.</p></div>
            <div className="wcard"><div className="ic">🎟️</div><h3>Book in seconds</h3><p>Real tickets, instant e-ticket with QR code. No bouncing between a dozen organiser websites.</p></div>
            <div className="wcard"><div className="ic">🔔</div><h3>Never miss one</h3><p>Save events and get alerts when new ones drop near you. Your weekends, sorted.</p></div>
          </div>
        </div>
      </section>
    </main>
  );
}
