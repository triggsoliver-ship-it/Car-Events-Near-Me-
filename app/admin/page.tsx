"use client";
import { useState } from "react";

export const dynamic = "force-dynamic";

const STATUS_COLOR: Record<string, string> = {
  pending: "#f5a623",
  approved: "#4ade80",
  rejected: "#ff6b6b",
};

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [msg, setMsg] = useState("");
  const [edits, setEdits] = useState<Record<number, { description?: string; img_url?: string }>>({});
  const [saving, setSaving] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");

  function auth(): Record<string, string> {
    return { Authorization: "Bearer " + token };
  }

  async function load() {
    setMsg("");
    // The token goes in a header, never the query string: a URL would be
    // recorded in hosting access logs, browser history and Referer headers.
    const res = await fetch("/api/admin/events", { headers: auth() });
    const d = await res.json();
    if (!res.ok) { setMsg(d.error || "Failed"); return; }
    setEvents(d.events || []);
    setLoaded(true);
  }
  async function act(id: number, action: string) {
    await fetch("/api/admin/events", {
      method: "POST",
      headers: { ...auth(), "Content-Type": "application/json" },
      body: JSON.stringify({ id, action }),
    });
    setEvents((ev) => ev.map((e) => (e.id === id ? { ...e, status: action === "unpublish" ? "pending" : action === "approve" ? "approved" : "rejected" } : e)));
    setMsg("Updated.");
  }

  function editField(id: number, field: "description" | "img_url", value: string) {
    setEdits((e) => ({ ...e, [id]: { ...e[id], [field]: value } }));
  }

  async function save(id: number) {
    const patch = edits[id];
    if (!patch || (!patch.description && !patch.img_url)) return;
    setSaving(id);
    const res = await fetch("/api/admin/events", {
      method: "POST",
      headers: { ...auth(), "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "update", ...patch }),
    });
    const d = await res.json();
    setSaving(null);
    if (!res.ok) { setMsg(d.error || "Save failed"); return; }
    setEvents((ev) => ev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
    setEdits((e) => ({ ...e, [id]: {} }));
    setMsg("Saved.");
  }

  const visible = events.filter((e) => filter === "all" || e.status === filter);

  return (
    <main className="detail">
      <h1 style={{ fontSize: 30, marginBottom: 14 }}>Moderation queue</h1>
      <div className="two" style={{ maxWidth: 520 }}>
        <div className="formrow"><label>Admin token</label><input value={token} onChange={(e) => setToken(e.target.value)} placeholder="ADMIN_TOKEN" /></div>
        <div className="formrow"><label>&nbsp;</label><button className="btn" onClick={load}>Load events</button></div>
      </div>
      {msg && <p style={{ color: "#ff6b6b" }}>{msg}</p>}
      {loaded && (
        <div style={{ display: "flex", gap: 8, margin: "10px 0" }}>
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button key={f} className={filter === f ? "btn" : "clear"} onClick={() => setFilter(f)} style={{ textTransform: "capitalize" }}>
              {f} {f !== "all" ? `(${events.filter((e) => e.status === f).length})` : `(${events.length})`}
            </button>
          ))}
        </div>
      )}
      {loaded && visible.length === 0 && <p className="desc">Nothing here. 🎉</p>}
      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        {visible.map((e) => (
          <div key={e.id} className="bookbox" style={{ position: "static" }}>
            <div style={{ fontWeight: 800, fontSize: 17, display: "flex", alignItems: "center", gap: 8 }}>
              {e.name} <span style={{ opacity: 0.5, fontWeight: 400, fontSize: 13 }}>#{e.id}</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: STATUS_COLOR[e.status] || "#999", border: "1px solid " + (STATUS_COLOR[e.status] || "#999"), borderRadius: 6, padding: "1px 6px", textTransform: "uppercase" }}>{e.status}</span>
            </div>
            <p className="desc" style={{ margin: "6px 0" }}>
              {e.type} · {e.town}{e.county ? ", " + e.county : ""} · {e.region} · {e.start_date}
              {e.venue ? " · " + e.venue : ""}
            </p>
            {e.description && <p className="desc">{e.description}</p>}
            {e.img_url && <p className="desc" style={{ fontSize: 12, opacity: 0.7 }}>Photo: {e.img_url}</p>}
            <p className="desc" style={{ fontSize: 13 }}>By {e.organiser}{e.contact_email ? " · " + e.contact_email : ""}{e.booking_url ? " · " + e.booking_url : ""}</p>

            <div style={{ marginTop: 10, display: "grid", gap: 6 }}>
              <label style={{ fontSize: 12, opacity: 0.7 }}>Edit description</label>
              <textarea
                rows={3}
                placeholder={e.description || "Description"}
                value={edits[e.id]?.description ?? ""}
                onChange={(ev) => editField(e.id, "description", ev.target.value)}
                style={{ width: "100%", fontFamily: "inherit" }}
              />
              <label style={{ fontSize: 12, opacity: 0.7 }}>Edit photo URL</label>
              <input
                placeholder={e.img_url || "https://..."}
                value={edits[e.id]?.img_url ?? ""}
                onChange={(ev) => editField(e.id, "img_url", ev.target.value)}
                style={{ width: "100%" }}
              />
              <button className="btn" onClick={() => save(e.id)} disabled={saving === e.id} style={{ justifySelf: "start" }}>
                {saving === e.id ? "Saving…" : "Save edits"}
              </button>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              {e.status !== "approved" && <button className="btn" onClick={() => act(e.id, "approve")}>Approve</button>}
              {e.status !== "rejected" && <button className="clear" onClick={() => act(e.id, "reject")}>Reject</button>}
              {e.status === "approved" && <button className="clear" onClick={() => act(e.id, "unpublish")}>Unpublish (back to pending)</button>}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
