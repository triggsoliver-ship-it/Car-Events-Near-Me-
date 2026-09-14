"use client";
import { track } from "@vercel/analytics";
import type { CarEvent } from "@/lib/types";
import { fmtPrice } from "@/lib/util";

// Car Events Near Me is a free listings site. We do not sell tickets, take
// payment, or earn a commission on any event: every ticket is bought from
// whoever that event has appointed to sell them, and the prices shown here are
// reproduced for reference only.
//
// Do NOT reinstate wording that names the organiser as the seller. This box
// used to end "Booking is completed on <organiser>'s own website", which is
// false for any event whose ticket rights sit with somebody else — a venue that
// hosts the event and owns its ticketing, a separate promoter, or a charity
// collecting gate and parking money on the day. In September 2026 the media
// officer of a closed-road rally agreed to be listed only on condition that we
// were not "connected to any ticket sales", because the venue held those rights
// and local charities collected the spectator fees; the old sentence would have
// misrepresented both them and us. The wording below is true for every event.
//
// Keep it to one clause. The same organiser, once he understood how the site
// works, said he did not need a disclaimer at all — so this should read as a
// plain statement of what we are, not as a legal notice.
//
// Free, turn-up-on-the-day events (event.free === true) have NO booking system
// at all, so they must never show "Book" wording or a booking button — organisers
// get enquiries asking how to book. For those we show a plain "Free entry" box
// and, if a URL is known, a neutral link to the organiser's own website.
//
// Every outbound click is recorded as a Vercel Analytics custom event so we can
// report referral traffic back to organisers (event id, name, organiser, kind).
// The `kind` values are deliberately unchanged so historical analytics stay
// comparable even though the button labels have been reworded.
function recordOutbound(event: CarEvent, kind: "booking" | "find_tickets" | "organiser_site") {
  try {
    track("outbound_click", {
      kind,
      eventId: event.id,
      event: event.name.slice(0, 80),
      organiser: (event.organiser || "").slice(0, 80),
    });
  } catch {
    /* analytics must never block navigation */
  }
}

export default function BookingBox({ event }: { event: CarEvent }) {
  if (event.free) {
    return (
      <div className="bookbox">
        <div className="bh">Free entry</div>
        <div className="tier">
          <span>Entry</span>
          <span className="tp">Free</span>
        </div>
        <p className="desc" style={{ margin: "8px 0 0" }}>
          No booking needed — just turn up on the day.
        </p>
        {event.bookingUrl && (
          <a
            className="btn block lg"
            style={{ marginTop: 8 }}
            href={event.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => recordOutbound(event, "organiser_site")}
          >
            Organiser&apos;s website →
          </a>
        )}
      </div>
    );
  }

  const direct = !!event.bookingUrl;
  const href =
    event.bookingUrl ||
    `https://www.google.com/search?q=${encodeURIComponent(
      `${event.name} ${event.organiser || ""} tickets`.trim()
    )}`;

  return (
    <div className="bookbox">
      <div className="bh">Tickets</div>
      {event.tiers.map((t, i) => (
        <div key={i} className="tier">
          <span>{t.name}</span>
          <span className="tp">{fmtPrice(t.price)}</span>
        </div>
      ))}
      <a
        className="btn block lg"
        style={{ marginTop: 8 }}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => recordOutbound(event, direct ? "booking" : "find_tickets")}
      >
        {direct ? "Tickets on the official site →" : "Find official tickets →"}
      </a>
      <div className="secure">
        &#128274; We don&apos;t sell tickets or take a commission — booking is handled
        on the event&apos;s own ticket site.
      </div>
    </div>
  );
}
