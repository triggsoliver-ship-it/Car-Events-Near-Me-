"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { CarEvent } from "@/lib/types";
import { CATEGORIES, REGIONS, TYPES } from "@/lib/events";
import { px, fmtPrice, dateRange, priceFrom, GRAD } from "@/lib/util";

const TODAY = new Date().toISOString().slice(0, 10);

export default function Explore({ events }: { events: CarEvent[] }) {
  const [q, setQ] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [freeOnly, setFreeOnly] = useState(false);
  const [sort, setSort] = useState("date");

  const list = useMemo(() => {
    const l = events.filter((e) => {
      if (e.end < TODAY) return false;
      if (q) {
        const s = q.toLowerCase();
        if (!(e.name + e.town + e.county + e.venue + e.region).toLowerCase().includes(s)) return false;
      }
      if (region && e.region !== region) return false;
      if (type && e.type !== type) return false;
      if (dateFrom && e.end < dateFrom) return false;
      if (freeOnly && priceFrom(e) !== 0) return false;
      if (maxPrice !== "" && priceFrom(e) > parseFloat(maxPrice)) return false;
      return true;
    });
    return l.sort((a, b) =>
      sort === "price" ? priceFrom(a) - priceFrom(b)
      : sort === "name" ? a.name.localeCompare(b.name)
      : a.start.localeCompare(b.start)
    );
  }, [events, q, region, type, dateFrom, maxPrice, freeOnly, sort]);

  const scrollToEvents = () =>
    document.getElementById("events")?.scrollIntoView({ behavior: "smooth" });
  const pickType = (t: string) => { setType(t); scrollToEvents(); };
  const clearAll = () => { setQ(""); setRegion(""); setType(""); setDateFrom(""); setMaxPrice(""); setFreeOnly(false); };

  return (
    <>
      <section className="hero">
        <div className="bg" style={{ backgroundImage: `url('${px(10373678, 1920, 1100)}')` }} />
        <div className="veil" />
        <div className="inner"><div className="wrap">
          <div className="eyebrow"><span className="dot" /> The UK&apos;s car-event hub · 1,000+ events</div>
          <h1>Every UK car event,<br /><em>bookable</em> in one place.</h1>
          <p className="sub">Classic shows, meets, track days, auctions and motorsport festivals — find what&apos;s on near you and book your spot in seconds.</p>
          <div className="searchbar">
            <div className="field"><label>Search</label><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Event, town or venue…" /></div>
            <div className="field"><label>Region</label><select value={region} onChange={(e) => setRegion(e.target.value)}><option value="">All regions</option>{REGIONS.map((r) => <option key={r}>{r}</option>)}</select></div>
            <div className="field"><label>From date</label><input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} /></div>
            <div className="field go"><label>&nbsp;</label><button className="btn" onClick={scrollToEvents}>Search events</button></div>
          </div>
          <div className="trust"><div>🎟️ <b>Book direct</b> — no middleman</div><div>📍 <b>Every region</b> covered</div><div>🔒 Secure payments by <b>Stripe</b></div></div>
        </div></div>
      </section>

      <section className="block" id="categories"><div className="wrap">
        <div className="shead"><div><h2>Browse by type</h2><p>Whatever you&apos;re into — there&apos;s a meet for that.</p></div></div>
        <div className="cats">
          {CATEGORIES.map((c) => (
            <div key={c.type} className="cat" onClick={() => pickType(c.type)}>
              <div className="img" style={{ backgroundImage: `url('${px(c.img, 600, 400)}'), ${GRAD[0]}` }} />
              <div className="ov" />
              <div className="label"><div className="c">{c.type === "track day" ? "On track" : "Browse"}</div><div className="t">{c.label}</div></div>
            </div>
          ))}
        </div>
      </div></section>

      <section className="block" id="events" style={{ paddingTop: 0 }}><div className="wrap">
        <div className="shead"><div><h2>Upcoming events</h2><p>Filter by region, county, town, date and price.</p></div></div>
        <div className="filterbar">
          <input className="grow" value={q} onChange={(e) => setQ(e.target.value)} placeholder="🔍 County, town or venue…" />
          <select value={region} onChange={(e) => setRegion(e.target.value)}><option value="">All regions</option>{REGIONS.map((r) => <option key={r}>{r}</option>)}</select>
          <select value={type} onChange={(e) => setType(e.target.value)}><option value="">All types</option>{TYPES.map((t) => <option key={t} value={t}>{t[0].toUpperCase() + t.slice(1)}</option>)}</select>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
          <input type="number" min="0" placeholder="Max £" style={{ width: 96 }} value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
          <label className="chk"><input type="checkbox" checked={freeOnly} onChange={(e) => setFreeOnly(e.target.checked)} /> Free only</label>
          <button className="clear" onClick={clearAll}>Clear</button>
        </div>
        <div className="resbar">
          <div className="cnt"><b>{list.length}</b> events found</div>
          <div>
            <label style={{ fontSize: 13, color: "var(--muted)", marginRight: 7 }}>Sort</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ background: "var(--panel2)", border: "1px solid var(--line)", color: "var(--text)", padding: "9px 12px", borderRadius: 10, fontSize: 13 }}>
              <option value="date">Date (soonest)</option>
              <option value="price">Price (low to high)</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </div>
        </div>
        <div className="grid">
          {list.length ? list.map((e) => {
            const pf = priceFrom(e);
            const grad = GRAD[(e.id - 1) % GRAD.length];
            return (
              <Link key={e.id} href={`/events/${e.id}`} className="card">
                <div className="imgwrap" style={{ background: grad }}>
                  <div className="photo" style={{ position: "absolute", inset: 0, background: grad, backgroundSize: "cover", backgroundPosition: "center" }}>
                    <img className="photo" loading="lazy" src={px(e.img, 900, 560)} alt="" onError={(ev) => { (ev.currentTarget as HTMLImageElement).style.display = "none"; }} />
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
          }) : (
            <div className="empty"><div style={{ fontSize: 42, marginBottom: 10 }}>🔍</div>No events match your filters.<br />Try clearing some filters.</div>
          )}
        </div>
      </div></section>
    </>
  );
}
