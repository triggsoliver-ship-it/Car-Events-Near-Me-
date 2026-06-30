"use client";
import type { CarEvent } from "@/lib/types";
import { fmtPrice } from "@/lib/util";

// Car Events Near Me is an aggregator: every booking is completed on the event
// owner's / organiser's OWN website. We never take payment on-site. If a direct
// booking URL is known we link straight to it; otherwise we send the visitor to
// find the organiser's official tickets.
export default function BookingBox({ event }: { event: CarEvent }) {
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
