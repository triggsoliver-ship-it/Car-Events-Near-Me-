"use client";
import { useState } from "react";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [msg, setMsg] = useState("");

  async function load() {
    setMsg("");
    const res = await fetch("/api/admin/events?token=" + encodeURIComponent(token));
    const d = await res.json();
    if (!res.ok) { setMsg(d.error || "Failed"); return; }
    setEvents(d.events || []);
    setLoaded(true);
  }
  async function act(id: number, action: string) {
    await fetch("/api/admin/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action, token }),
    });
    setEvents((ev) => ev.filter((e) => e.id !== id));
  }

  return (
    <main className="detail">
      <h1 style={{ fontSize: 30, marginBottom: 14 }}>Moderation queue</h1>
      <div className="two" style={{ maxWidth: 520 }}>
        <div className="formrow"><label>Admin token</label><input value={token} onChange={(e) => setToken(e.target.value)} placeholder="ADMIN_TOKEN" /></div>
        <div className="formrow"><label>&nbsp;</label><button className="btn" onClick={load}>Load pending</button></div>
      </div>
      {msg && <p style={{ color: "#ff6b6b" }}>{msg}</p>}
      {loaded && events.length === 0 && <p className="desc">No pending submissions. 🎉</p>}
      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        {events.map((e) => (
          <div key={e.id} className="bookbox" style={{ position: "static" }}>
            <div style={{ fontWeight: 800, fontSize: 17 }}>{e.name}</div>
            <p className="desc" style={{ margin: "6px 0" }}>
              {e.type} · {e.town}{e.county ? ", " + e.county : ""} · {e.region} · {e.start_date}
              {e.venue ? " · " + e.venue : ""}
            </p>
            {e.description && <p className="desc">{e.description}</p>}
            <p className="desc" style={{ fontSize: 13 }}>By {e.organiser}{e.contact_email ? " · " + e.contact_email : ""}{e.booking_url ? " · " + e.booking_url : ""}</p>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <button className="btn" onClick={() => act(e.id, "approve")}>Approve</button>
              <button className="clear" onClick={() => act(e.id, "reject")}>Reject</button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
