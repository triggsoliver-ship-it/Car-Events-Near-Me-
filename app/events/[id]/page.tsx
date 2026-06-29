import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllEvents, getEventById } from "@/lib/events";
import { px, dateRange, GRAD } from "@/lib/util";
import BookingBox from "@/components/BookingBox";

export function generateStaticParams() {
  return getAllEvents().map((e) => ({ id: String(e.id) }));
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const e = getEventById(Number(params.id));
  if (!e) return { title: "Event not found — Car Events Near Me" };
  return {
    title: `${e.name} — Car Events Near Me`,
    description: e.desc,
  };
}

export default function EventPage({ params }: { params: { id: string } }) {
  const e = getEventById(Number(params.id));
  if (!e) notFound();
  const grad = GRAD[(e.id - 1) % GRAD.length];
  return (
    <main className="detail">
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
          <p className="desc">Instant e-ticket with QR code on booking · Secure payment · Booked direct with the organiser.</p>
        </div>
        <BookingBox event={e} />
      </div>
    </main>
  );
}
