import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getEventById } from "@/lib/events";
import { eventImg, dateRange, GRAD } from "@/lib/util";
import BookingBox from "@/components/BookingBox";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const e = await getEventById(Number(params.id));
  if (!e) return { title: "Event not found — Car Events Near Me" };
  return { title: `${e.name} — Car Events Near Me`, description: e.desc };
}

export default async function EventPage({ params }: { params: { id: string } }) {
  const e = await getEventById(Number(params.id));
  if (!e) notFound();
  const grad = GRAD[(e.id - 1) % GRAD.length];
  return (
    <main className="detail">
      <Link className="back" href="/#events">← Back to events</Link>
      <div className="dbanner" style={{ background: grad }}>
        <img className="photo" src={eventImg(e, 1400, 800)} alt={e.name} />
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
