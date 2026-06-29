export const metadata = { title: "List your event — Car Events Near Me" };
export default function ListPage() {
  return (
    <main className="detail">
      <h1 style={{ fontSize: 34, letterSpacing: "-1px", marginBottom: 14 }}>List your event</h1>
      <p className="desc">
        Organiser portal coming soon. You will be able to list your event for free, set
        pricing tiers and capacity, and take bookings directly — with payouts handled via
        Stripe Connect.
      </p>
      <p className="desc">
        Want to be first on board? Email <b>hello@careventsnearme.uk</b>.
      </p>
    </main>
  );
}
