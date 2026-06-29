"use client";
import { useState } from "react";
import type { CarEvent } from "@/lib/types";
import { fmtPrice, dateRange } from "@/lib/util";

export default function BookingBox({ event }: { event: CarEvent }) {
  // ---- Affiliate / external booking: hand off to the partner's checkout ----
  if (event.bookingUrl) {
    return (
      <div className="bookbox">
        <div className="bh">Book tickets</div>
        {event.tiers.map((t, i) => (
          <div key={i} className="tier">
            <span>{t.name}</span>
            <span className="tp">{fmtPrice(t.price)}</span>
          </div>
        ))}
        <a className="btn block lg" style={{ marginTop: 8 }} href={event.bookingUrl} target="_blank" rel="noopener noreferrer">
          Book now &rarr;
        </a>
        <div className="secure">&#128274; You&apos;ll complete your booking securely on {event.organiser || "the organiser"}&apos;s site.</div>
      </div>
    );
  }

  // ---- Owned box office: full on-site checkout (demo) ----
  const [tier, setTier] = useState(0);
  const [qty, setQty] = useState(1);
  const [stage, setStage] = useState<"select" | "checkout" | "done">("select");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState("");

  const t = event.tiers[tier];
  const sub = t.price * qty;
  const fee = t.price === 0 ? 0 : Math.max(0.99, sub * 0.05);
  const total = sub + fee;

  async function pay() {
    setBusy(true);
    let r = "CE-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ eventId: event.id, tier: t.name, qty, email }),
      });
      const d = await res.json();
      if (d?.ref) r = d.ref;
    } catch {
      /* fall back to local ref */
    }
    setRef(r);
    setBusy(false);
    setStage("done");
  }

  if (stage === "done") {
    return (
      <div className="bookbox" style={{ textAlign: "center" }}>
        <div className="tick">&#10003;</div>
        <div className="bh">You&apos;re booked in!</div>
        <p style={{ color: "var(--muted)", fontSize: 14 }}>A confirmation and e-ticket have been sent to {email || "your email"}.</p>
        <div style={{ borderTop: "1px solid var(--line)", margin: "12px 0", paddingTop: 12, fontSize: 14, textAlign: "left" }}>
          <b>{event.name}</b><br />
          <span style={{ color: "var(--muted)" }}>&#128197; {dateRange(event.start, event.end)}</span><br />
          <span style={{ color: "var(--muted)" }}>{t.name} &times; {qty} &middot; </span><b>{fmtPrice(total)}</b>
        </div>
        <div className="qr" />
        <div className="refcode">{ref}</div>
        <button className="btn block lg" style={{ marginTop: 16 }} onClick={() => { setStage("select"); setQty(1); }}>Done</button>
      </div>
    );
  }

  if (stage === "checkout") {
    return (
      <div className="bookbox">
        <div className="bh">Checkout</div>
        <div style={{ fontSize: 14, color: "var(--muted)", marginBottom: 12 }}>
          {t.name} &times; {qty} &mdash; <b style={{ color: "var(--text)" }}>{fmtPrice(total)}</b>{fee > 0 ? <span> (incl. {fmtPrice(fee)} fee)</span> : null}
        </div>
        <div className="formrow"><label>Full name</label><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Smith" /></div>
        <div className="formrow"><label>Email (e-ticket sent here)</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" /></div>
        {t.price > 0 && (
          <>
            <div className="formrow"><label>Card number</label><input placeholder="4242 4242 4242 4242" /></div>
            <div className="two">
              <div className="formrow"><label>Expiry</label><input placeholder="MM / YY" /></div>
              <div className="formrow"><label>CVC</label><input placeholder="123" /></div>
            </div>
          </>
        )}
        <button className="btn block lg" disabled={busy} onClick={pay}>{busy ? "Processing…" : t.price === 0 ? "Confirm free booking" : "Pay " + fmtPrice(total)}</button>
        <button className="clear" style={{ width: "100%", marginTop: 8 }} onClick={() => setStage("select")}>Back</button>
        <div className="secure">&#128274; Payments secured by Stripe &middot; Organiser paid via Stripe Connect (demo &mdash; no real charge)</div>
      </div>
    );
  }

  return (
    <div className="bookbox">
      <div className="bh">Book tickets</div>
      {event.tiers.map((tt, i) => (
        <div key={i} className={i === tier ? "tier sel" : "tier"} onClick={() => setTier(i)}>
          <span>{tt.name}</span><span className="tp">{fmtPrice(tt.price)}</span>
        </div>
      ))}
      <div className="qty">
        <span>Quantity</span>
        <div className="ctrl">
          <button onClick={() => setQty(Math.max(1, qty - 1))}>&minus;</button>
          <b>{qty}</b>
          <button onClick={() => setQty(qty + 1)}>+</button>
        </div>
      </div>
      <div className="total"><span style={{ color: "var(--muted)" }}>Total</span><b>{fmtPrice(t.price * qty)}</b></div>
      <button className="btn block lg" onClick={() => setStage("checkout")}>{t.price === 0 ? "Reserve free place" : "Book now"}</button>
      <div className="secure">&#128274; Secure checkout &middot; Instant e-ticket</div>
    </div>
  );
}
