import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { CarEvent } from "@/lib/types";
import { getUpcomingEvents } from "@/lib/events";
import { slugify, nameFromSlug, countiesFromEvents } from "@/lib/seo";
import EventCard from "@/components/EventCard";

export const revalidate = 3600;

const SITE_URL = "https://careventsnearme.uk";
const TODAY = () => new Date().toISOString().slice(0, 10);
const YEAR = new Date().getFullYear();

/** All counties that currently have upcoming events. */
async function upcomingByCounty() {
  const today = TODAY();
  const all: CarEvent[] = await getUpcomingEvents();
  return all.filter((e) => e.end >= today);
}

export async function generateStaticParams() {
  const events = await upcomingByCounty();
  return countiesFromEvents(events).map((c) => ({ county: slugify(c) }));
}

export async function generateMetadata(
  { params }: { params: { county: string } }
): Promise<Metadata> {
  const events = await upcomingByCounty();
  const county = nameFromSlug(params.county, countiesFromEvents(events));
  if (!county) return { title: "County not found" };
  const title = `Car Events in ${county} (${YEAR})`;
  const description = `Upcoming car events in ${county} — car shows, classic meets, track days, auctions and motorsport near you. Find and book ${county} car events by date and price.`;
  const canonical = `/car-events/county/${params.county}`;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      title: `${title} — Car Events Near Me`,
      description,
      url: `${SITE_URL}${canonical}`,
      locale: "en_GB",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — Car Events Near Me`,
      description,
    },
  };
}

export default async function CountyPage(
  { params }: { params: { county: string } }
) {
  const today = TODAY();
  const all = await upcomingByCounty();
  const county = nameFromSlug(params.county, countiesFromEvents(all));
  if (!county) notFound();

  const events = all
    .filter((e) => e.county === county)
    .sort((a, b) => a.start.localeCompare(b.start));

  const region = events[0]?.region;
  const intro = `Discover upcoming car events in ${county}${region ? `, ${region}` : ""} — find and book car shows, classic meets, track days, auctions and motorsport near you.`;
  const canonical = `/car-events/county/${params.county}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Car events", item: `${SITE_URL}/car-events/county/${params.county}` },
      { "@type": "ListItem", position: 3, name: county, item: `${SITE_URL}${canonical}` },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Car events in ${county}`,
    numberOfItems: events.length,
    itemListElement: events.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/events/${e.id}`,
      name: e.name,
    })),
  };

  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }} />

      <section className="block">
        <div className="wrap">
          <nav className="loc" aria-label="Breadcrumb" style={{ marginBottom: 14 }}>
            <Link href="/">Home</Link> · <Link href={`/car-events/county/${params.county}`}>Car events</Link> · <span>{county}</span>
          </nav>
          <div className="shead">
            <div>
              <h1 style={{ fontSize: 34, letterSpacing: "-1px", fontWeight: 800 }}>Car events in {county}</h1>
              <p style={{ maxWidth: 720 }}>{intro}</p>
              <p style={{ color: "var(--muted)", fontSize: 14.5, marginTop: 8 }}>
                <b style={{ color: "var(--text)" }}>{events.length}</b> upcoming {events.length === 1 ? "event" : "events"} in {county}.
                {region && (
                  <>
                    {" "}See all{" "}
                    <Link className="cta" href={`/car-events/${slugify(region)}`} style={{ display: "inline" }}>
                      {region} car events →
                    </Link>
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="grid">
            {events.length ? (
              events.map((e) => <EventCard key={e.id} e={e} />)
            ) : (
              <div className="empty">
                <div style={{ fontSize: 42, marginBottom: 10 }}>🔍</div>
                No upcoming events listed in {county} right now.<br />
                <Link className="cta" href="/#events">Browse all UK car events →</Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
