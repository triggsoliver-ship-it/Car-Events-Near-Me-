import Link from "next/link";

export default function Header() {
  return (
    <header>
      <div className="wrap nav">
        <Link href="/" className="logo">
          <div className="mark">📍</div>
          <div>Car Events <span className="brandtext">Near Me</span></div>
        </Link>
        <nav className="nav-links">
          <Link href="/#events">Browse events</Link>
          <Link href="/#categories">Categories</Link>
          <Link href="/list">List your event</Link>
          <Link href="/signin">Sign in</Link>
        </nav>
        <Link href="/list" className="btn">List an event</Link>
      </div>
    </header>
  );
}
