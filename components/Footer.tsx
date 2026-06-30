import Link from "next/link";
import { REGIONS } from "@/lib/events";
import { slugify } from "@/lib/seo";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <Link href="/" className="logo" style={{ marginBottom: 12 }}>
              <div className="mark">📍</div>
              <div>Car Events <span className="brandtext">Near Me</span></div>
            </Link>
            <p style={{ maxWidth: 280 }}>Every UK car event, bookable in one place. careventsnearme.uk</p>
          </div>
          <div>
            <h5>Explore</h5>
            <Link className="fl" href="/#events">All events</Link>
            <Link className="fl" href="/#categories">Categories</Link>
            <Link className="fl" href="/#regions">By region</Link>
            <Link className="fl" href="/#events">This weekend</Link>
          </div>
          <div>
            <h5>Car events by region</h5>
            {REGIONS.map((r) => (
              <Link key={r} className="fl" href={`/car-events/${slugify(r)}`}>{r}</Link>
            ))}
          </div>
          <div>
            <h5>Organisers</h5>
            <Link className="fl" href="/list">List an event</Link>
            <Link className="fl" href="/list">How it works</Link>
          </div>
          <div>
            <h5>Get event alerts</h5>
            <p>New events near you, in your inbox.</p>
            <form className="news" action="/#events">
              <input type="email" placeholder="you@email.com" aria-label="Email" />
              <button className="btn" type="submit">Join</button>
            </form>
          </div>
        </div>
        <div className="fbot">
          <div>
            <div>© 2026 Car Events Near Me</div>
            <div style={{ marginTop: 6, fontSize: 12, color: "var(--muted)", opacity: 0.85 }}>
              Site designed by{" "}
              <a
                href="https://shipitstudio.co.uk"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--muted)", textDecoration: "underline" }}
              >
                shipitstudio.co.uk
              </a>
            </div>
          </div>
          <div>Privacy · Terms · Contact</div>
        </div>
      </div>
    </footer>
  );
}
