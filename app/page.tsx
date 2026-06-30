import Link from "next/link";
import Explore from "@/components/Explore";
import { getUpcomingEvents, REGIONS } from "@/lib/events";
import { slugify } from "@/lib/seo";

export const dynamic = "force-dynamic";

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I find car events near me?",
    a: "Use the search bar and region filter on the homepage, or browse by region and county. We list upcoming UK car events you can sort by date, price and type to find what's on near you.",
  },
  {
    q: "What types of car events can I book?",
    a: "Car shows, classic and modern car meets, track days, auctions, autojumbles, modified and stance shows, and historic motorsport festivals.",
  },
  {
    q: "Do you cover the whole of the UK?",
    a: "Yes — events span all 12 UK regions, from the South East and London to the North West, Scotland, Wales and Northern Ireland.",
  },
  {
    q: "How do I book tickets?",
    a: "Many events can be booked directly here with an instant e-ticket; others link straight to the official organiser's booking page.",
  },
  {
    q: "Is it free to use?",
    a: "Browsing and searching are completely free, and plenty of the listed car meets are free to attend too.",
  },
  {
    q: "Can I list my own car event?",
    a: "Yes. Use the “List an event” link and we'll review and publish it so enthusiasts in your area can find and book it.",
  },
];

export default async function HomePage() {
  const events = await getUpcomingEvents();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

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

      <section className="block" id="faq" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="shead">
            <div>
              <h2>Frequently asked questions</h2>
              <p>Everything you need to know about finding and booking UK car events.</p>
            </div>
          </div>
          <div style={{ maxWidth: 760, display: "flex", flexDirection: "column", gap: 10 }}>
            {FAQS.map((f, i) => (
              <details
                key={i}
                style={{
                  background: "var(--panel2)",
                  border: "1px solid var(--line)",
                  borderRadius: 12,
                  padding: "14px 16px",
                }}
              >
                <summary style={{ cursor: "pointer", fontWeight: 600, color: "var(--text)" }}>{f.q}</summary>
                <p style={{ color: "var(--muted)", marginTop: 10, lineHeight: 1.6 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
