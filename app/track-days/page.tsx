import Link from "next/link";
import { getUpcomingEvents } from "@/lib/events";
import { px, GRAD, fmtPrice, dateRange, priceFrom } from "@/lib/util";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "UK Car Track Days — Car Events Near Me",
  description:
    "Every upcoming UK car track day — live dates, circuits and prices, bookable direct. In partnership with TrackDays.co.uk.",
};

export default async function TrackDaysPage() {
  const all = await getUpcomingEvents();
  const list = all
    .filter((e) => e.type === "track day")
    .sort((a, b) => a.start.localeCompare(b.start));

  return (
    <main className="detail" style={{ maxWidth: 1240 }}>
      <h1 style={{ fontSize: 34, letterSpacing: "-1px", marginBottom: 8 }}>UK Car Track Days</h1>
      <p className="desc" style={{ maxWidth: 720 }}>
        Take your own car on track. {list.length} upcoming UK car track days — live dates,
        circuits and prices — bookable direct through our partner TrackDays.co.uk.
      </p>

      <div className="grid" style={{ marginTop: 22 }}>
        {list.map((e) => {
          const pf = priceFrom(e);
          const grad = GRAD[(e.id - 1) % GRAD.length];
          return (
            <Link key={e.id} href={`/events/${e.id}`} className="card">
              <div className="imgwrap" style={{ background: grad }}>
                <div className="photo" style={{ position: "absolute", inset: 0, background: grad, backgroundSize: "cover", backgroundPosition: "center" }}>
                  <img className="photo" loading="lazy" src={px(e.img, 900, 560)} alt="" />
                </div>
                <div className="scrim" />
                <span className="tag">{e.type}</span>
                <span className={pf === 0 ? "price free" : "price"}>{pf === 0 ? "Free" : "from " + fmtPrice(pf)}</span>
                <span className="date">📅 {dateRange(e.start, e.end)}</span>
              </div>
              <div className="body">
                <h4>{e.name}</h4>
                <div className="loc">📍 {e.venue}, {e.town} · {e.county}</div>
                <div className="cta">View &amp; book →</div>
              </div>
            </Link>
          );
        })}
      </div>

      <p className="secure" style={{ textAlign: "left", marginTop: 18 }}>
        Bookings are completed securely on TrackDays.co.uk. Car Events Near Me may earn a commission on bookings made through this page.
      </p>
    </main>
  );
}
