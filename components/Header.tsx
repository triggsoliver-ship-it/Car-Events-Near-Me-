import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="wrap nav">
        <Link href="/" className="logo" aria-label="Car Events Near Me — home">
          <div className="mark" aria-hidden="true">📍</div>
          <div>Car Events <span className="brandtext">Near Me</span></div>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link href="/#events">Browse events</Link>
          <Link href="/track-days">Track days</Link>
          <Link href="/#categories">Categories</Link>
          <Link href="/list">List your event</Link>
          <Link href="/signin">Sign in</Link>
        </nav>
        <Link href="/list" className="btn">List an event</Link>
      </div>
    </header>
  );
}
