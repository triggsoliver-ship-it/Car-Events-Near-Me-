export const metadata = {
  title: "UK Car Track Days — Car Events Near Me",
  description: "Every upcoming UK car track day — live dates, circuits and prices, bookable direct. In partnership with TrackDays.co.uk.",
};

export default function TrackDaysPage() {
  return (
    <main className="detail" style={{ maxWidth: 1120 }}>
      <h1 style={{ fontSize: 34, letterSpacing: "-1px", marginBottom: 8 }}>UK Car Track Days</h1>
      <p className="desc" style={{ maxWidth: 700 }}>
        Take your own car on track. Every upcoming UK car track day — live dates, circuits,
        noise limits and prices — bookable direct. Updated continuously by our partner
        TrackDays.co.uk.
      </p>
      <div style={{ marginTop: 18, background: "#fff", borderRadius: 16, overflow: "hidden", border: "1px solid var(--line)", boxShadow: "var(--shadow)" }}>
        <iframe
          src="https://www.trackdays.co.uk/rss-feeds/car-trackdays/"
          title="UK Car Track Days calendar"
          loading="lazy"
          style={{ width: "100%", height: "78vh", minHeight: 760, border: "0", display: "block" }}
        />
      </div>
      <p className="secure" style={{ textAlign: "left", marginTop: 12 }}>
        Bookings are completed securely on TrackDays.co.uk. Car Events Near Me may earn a commission on bookings made through this page.
      </p>
    </main>
  );
}
