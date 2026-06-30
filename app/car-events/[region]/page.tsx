import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { CarEvent } from "@/lib/types";
import { getUpcomingEvents, REGIONS } from "@/lib/events";
import { slugify, nameFromSlug, countiesFromEvents } from "@/lib/seo";
import EventCard from "@/components/EventCard";

export const revalidate = 3600;

const SITE_URL = "https://careventsnearme.uk";
const TODAY = () => new Date().toISOString().slice(0, 10);
const YEAR = new Date().getFullYear();

export function generateStaticParams() {
  return REGIONS.map((r) => ({ region: slugify(r) }));
}

// Region-specific intro flavour; falls back to a generic sentence.
const INTROS: Record<string, string> = {
  "East Midlands":
    "From Donington circuit track days to classic gatherings across Nottinghamshire, Leicestershire and Derbyshire, the East Midlands has a packed motoring calendar.",
  "East of England":
    "Stretching from Norfolk and Suffolk down through Cambridgeshire and Essex, the East of England hosts everything from village classic meets to major shows.",
  "London":
    "London and the surrounding boroughs serve up everything from late-night car meets to prestige auctions and supercar gatherings.",
  "North East":
    "Across Northumberland, Tyne & Wear and County Durham, the North East delivers coastal cruises, club meets and lively show season weekends.",
  "North West":
    "From the Lake District to Greater Manchester and Lancashire, the North West is a hotbed of car shows, track days and modified meets.",
  "Northern Ireland":
    "Northern Ireland's tight-knit car scene packs in shows, classic runs and motorsport across Antrim, Down and beyond.",
  "Scotland":
    "From the Highlands to the Central Belt, Scotland's car calendar runs from Knockhill track days to Highland classic gatherings.",
  "South East":
    "Home to Goodwood, Brooklands and Brands Hatch, the South East is arguably the busiest car-event region in the UK.",
  "South West":
    "Devon, Cornwall, Somerset and beyond — the South West blends coastal cruises with major shows and historic motorsport.",
  "Wales":
    "From Welsh hillclimbs to seaside shows and forest stages, Wales offers a dramatic backdrop for every kind of car event.",
  "West Midlands":
    "Birmingham's NEC anchors a region rich in shows, with meets and track days right across Staffordshire, Warwickshire and beyond.",
  "Yorkshire":
    "God's own county delivers everything from Yorkshire Dales classic runs to big-city meets and circuit track days.",
};

function regionFromParams(slug: string): string | undefined {
  return nameFromSlug(slug, REGIONS);
}

export async function generateMetadata(
  { params }: { params: { region: string } }
): Promise<Metadata> {
  const region = regionFromParams(params.region);
  if (!region) return { title: "Region not found" };
  const title = `Car Events in ${region} (${YEAR}) — Shows, Meets & Track Days`;
  const description = `Find and book car events in ${region} — car shows, classic meets, track days, auctions and motorsport near you. Browse upcoming ${region} car events by county, date and price.`;
  const canonical = `/car-events/${params.region}`;
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

export default async function RegionPage(
  { params }: { params: { region: string } }
) {
  const region = regionFromParams(params.region);
  if (!region) notFound();

  const today = TODAY();
  const all: CarEvent[] = await getUpcomingEvents();
  const events = all
    .filter((e) => e.end >= today && e.region === region)
    .sort((a, b) => a.start.localeCompare(b.start));

  const counties = countiesFromEvents(events);
  const intro =
    INTROS[region] ||
    `${region} is packed with car events year-round — find and book car shows, classic meets, track days, auctions and motorsport near you.`;
  const canonical = `/car-events/${params.region}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Car events", item: `${SITE_URL}/car-events/${params.region}` },
      { "@type": "ListItem", position: 3, name: region, item: `${SITE_URL}${canonical}` },
    ],
  };

  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Car events in ${region}`,
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
            <Link href="/">Home</Link> · <Link href={`/car-events/${params.region}`}>Car events</Link> · <span>{region}</span>
          </nav>
          <div className="shead">
            <div>
              <h1 style={{ fontSize: 34, letterSpacing: "-1px", fontWeight: 800 }}>Car events in {region}</h1>
              <p style={{ maxWidth: 720 }}>{intro}</p>
              <p style={{ color: "var(--muted)", fontSize: 14.5, marginTop: 8 }}>
                <b style={{ color: "var(--text)" }}>{events.length}</b> upcoming {events.length === 1 ? "event" : "events"} in {region}.
              </p>
            </div>
          </div>

          <div className="grid">
            {events.length ? (
              events.map((e) => <EventCard key={e.id} e={e} />)
            ) : (
              <div className="empty">
                <div style={{ fontSize: 42, marginBottom: 10 }}>🔍</div>
                No upcoming events listed in {region} right now.<br />
                <Link className="cta" href="/#events">Browse all UK car events →</Link>
              </div>
            )}
          </div>

          {counties.length > 0 && (
            <div style={{ marginTop: 40 }}>
              <h2 className="shead" style={{ fontSize: 22, fontWeight: 800, marginBottom: 14 }}>
                Browse by county in {region}
              </h2>
              <div className="loc" style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {counties.map((c) => (
                  <Link key={c} className="chip" href={`/car-events/county/${slugify(c)}`}>
                    {c}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
