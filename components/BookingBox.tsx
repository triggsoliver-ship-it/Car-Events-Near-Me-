"use client";
import type { CarEvent } from "@/lib/types";
import { fmtPrice } from "@/lib/util";

// Car Events Near Me is an aggregator: every booking is completed on the event
// owner's / organiser's OWN website. We never take payment on-site. If a direct
// booking URL is known we link straight to it; otherwise we send the visitor to
// find the organiser's official tickets.
//
// Free, turn-up-on-the-day events (event.free === true) have NO booking system
// at all, so they must never show "Book" wording or a booking button — organisers
// get enquiries asking how to book. For those we show a plain "Free entry" box
// and, if a URL is known, a neutral link to the organiser's own website.
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
      <div className="bh">Book tickets</div>
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
      >
        {direct ? "Book on official site →" : "Find official tickets →"}
      </a>
      <div className="secure">
        &#128274; Booking is completed on {event.organiser || "the organiser"}&apos;s own website.
      </div>
    </div>
  );
}
