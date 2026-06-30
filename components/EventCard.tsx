import Link from "next/link";
import type { CarEvent } from "@/lib/types";
import { eventImg, fmtPrice, dateRange, priceFrom, GRAD } from "@/lib/util";

/**
 * Server-rendered event card. Mirrors the card markup and classNames used
 * in components/Explore.tsx so listings look identical. The client-only
 * onError image handler from Explore is intentionally omitted here.
 */
export default function EventCard({ e }: { e: CarEvent }) {
  const pf = priceFrom(e);
  const grad = GRAD[(e.id - 1) % GRAD.length];
  return (
    <Link href={`/events/${e.id}`} className="card">
      <div className="imgwrap" style={{ background: grad }}>
        <div
          className="photo"
          style={{
            position: "absolute",
            inset: 0,
            background: grad,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <img className="photo" loading="lazy" src={eventImg(e, 900, 560)} alt={e.name} />
        </div>
        <div className="scrim" />
        <span className="tag">{e.type}</span>
        <span className={pf === 0 ? "price free" : "price"}>
          {pf === 0 ? "Free" : "from " + fmtPrice(pf)}
        </span>
        <span className="date">📅 {dateRange(e.start, e.end)}</span>
      </div>
      <div className="body">
        <h4>{e.name}</h4>
        <div className="loc">📍 {e.venue}, {e.town} · {e.county}</div>
        <div className="cta">View &amp; book →</div>
      </div>
    </Link>
  );
}
