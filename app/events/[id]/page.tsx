import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEventById } from "@/lib/events";
import { px, dateRange, GRAD, priceFrom } from "@/lib/util";
import BookingBox from "@/components/BookingBox";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const e = await getEventById(Number(params.id));
  if (!e) return { title: "Event not found" };
  const image = px(e.img, 1200, 630);
  return {
    title: e.name,
    description: e.desc,
    alternates: { canonical: `/events/${e.id}` },
    openGraph: {
      type: "website",
      title: `${e.name} — Car Events Near Me`,
      description: e.desc,
      url: `https://careventsnearme.uk/events/${e.id}`,
      images: [{ url: image, width: 1200, height: 630, alt: e.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${e.name} — Car Events Near Me`,
      description: e.desc,
      images: [image],
    },
  };
}

export default async function EventPage({ params }: { params: { id: string } }) {
  const e = await getEventById(Number(params.id));
  if (!e) notFound();
  const grad = GRAD[(e.id - 1) % GRAD.length];

  const startsFrom = priceFrom(e);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.name,
    description: e.desc,
    startDate: e.start,
    endDate: e.end,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: [px(e.img, 1200, 630)],
    url: `https://careventsnearme.uk/events/${e.id}`,
    location: {
      "@type": "Place",
      name: e.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: e.town,
        addressRegion: e.county,
        addressCountry: "GB",
      },
    },
    organizer: {
      "@type": "Organization",
      name: e.organiser,
    },
    offers: {
      "@type": "Offer",
      price: startsFrom,
      priceCurrency: "GBP",
      availability: "https://schema.org/InStock",
      url: `https://careventsnearme.uk/events/${e.id}`,
    },
  };

  return (
    <main className="detail" id="main-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link className="back" href="/#events">← Back to events</Link>
      <div className="dbanner" style={{ background: grad }}>
        <img className="photo" src={px(e.img, 1400, 800)} alt={e.name} />
        <div className="scrim" />
        <div className="ttl">
          <span className="tg">{e.type}</span>
          <h1>{e.name}</h1>
        </div>
      </div>
      <div className="cols">
        <div>
          <div className="chips">
            <span className="chip">📅 <b>{dateRange(e.start, e.end)}</b></span>
            <span className="chip">📍 <b>{e.town}</b>, {e.county}</span>
            <span className="chip">🗺️ {e.region}</span>
            <span className="chip">🏟️ {e.venue}</span>
          </div>
          <p className="desc">{e.desc}</p>
          <h3 className="sub">Organiser</h3>
          <p className="desc">{e.organiser}</p>
          <h3 className="sub">Good to know</h3>
          <p className="desc">Secure booking · Past events drop off automatically · Found something wrong? Let us know.</p>
        </div>
        <BookingBox event={e} />
      </div>
    </main>
  );
}
