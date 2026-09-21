"use client";
import { useState } from "react";

export const dynamic = "force-dynamic";

const STATUS_COLOR: Record<string, string> = {
  pending: "#f5a623",
  approved: "#4ade80",
  rejected: "#ff6b6b",
};

const EVENT_TYPES = ["show", "meet", "modified", "classic", "track day", "auction", "autojumble", "motorsport"];

type NewListing = {
  name: string; type: string; region: string; county: string; town: string; venue: string;
  start: string; end: string; organiser: string; description: string; bookingUrl: string;
  contactEmail: string; tier1Name: string; tier1Price: string; tier2Name: string; tier2Price: string;
};

const BLANK_LISTING: NewListing = {
  name: "", type: "show", region: "", county: "", town: "", venue: "",
  start: "", end: "", organiser: "", description: "", bookingUrl: "",
  contactEmail: "", tier1Name: "Entry", tier1Price: "0", tier2Name: "", tier2Price: "",
};

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [events, setEvents] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [msg, setMsg] = useState("");
  const [edits, setEdits] = useState<Record<number, { description?: string; img_url?: string; booking_url?: string }>>({});
  const [saving, setSaving] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [newListing, setNewListing] = useState<NewListing>(BLANK_LISTING);
  const [creating, setCreating] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);

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

  function editField(id: number, field: "description" | "img_url" | "booking_url", value: string) {
    setEdits((e) => ({ ...e, [id]: { ...e[id], [field]: value } }));
  }

  async function save(id: number) {
    const patch = edits[id];
    if (!patch || (!patch.description && !patch.img_url && !patch.booking_url)) return;
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

  function newField<K extends keyof NewListing>(field: K, value: NewListing[K]) {
    setNewListing((n) => ({ ...n, [field]: value }));
  }

  async function createListing() {
    const n = newListing;
    if (!n.name.trim() || !n.type.trim() || !n.region.trim() || !n.town.trim() || !n.start.trim() || !n.organiser.trim()) {
      setMsg("Name, type, region, town, start date and organiser are all required.");
      return;
    }
    const tiers = [
      { name: n.tier1Name || "Entry", price: parseFloat(n.tier1Price) || 0 },
      ...(n.tier2Name.trim() ? [{ name: n.tier2Name, price: parseFloat(n.tier2Price) || 0 }] : []),
    ];
    setCreating(true);
    const res = await fetch("/api/admin/events", {
      method: "POST",
      headers: { ...auth(), "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "create",
        name: n.name, type: n.type, region: n.region, county: n.county || undefined,
        town: n.town, venue: n.venue || undefined, start: n.start, end: n.end || n.start,
        organiser: n.organiser, description: n.description || undefined,
        bookingUrl: n.bookingUrl || undefined, contactEmail: n.contactEmail || undefined,
        tiers, free: tiers.every((t) => t.price === 0),
      }),
    });
    const d = await res.json();
    setCreating(false);
    if (!res.ok) { setMsg(d.error || "Create failed"); return; }
    setMsg(`Created "${n.name}" — #${d.id}, live now.`);
    setNewListing(BLANK_LISTING);
    setShowNewForm(false);
    if (loaded) load();
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

      <div style={{ marginTop: 20 }}>
        <button className="btn" onClick={() => setShowNewForm((s) => !s)}>
          {showNewForm ? "Cancel new listing" : "+ New listing"}
        </button>
      </div>

      {showNewForm && (
        <div className="bookbox" style={{ position: "static", marginTop: 12, maxWidth: 640, display: "grid", gap: 8 }}>
          <div style={{ fontWeight: 800, fontSize: 16 }}>New listing — goes straight to approved, no moderation queue</div>
          <div className="two">
            <div className="formrow"><label>Name</label><input value={newListing.name} onChange={(e) => newField("name", e.target.value)} /></div>
            <div className="formrow"><label>Type</label>
              <select value={newListing.type} onChange={(e) => newField("type", e.target.value)}>
                {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="two">
            <div className="formrow"><label>Region</label><input value={newListing.region} onChange={(e) => newField("region", e.target.value)} placeholder="e.g. South West" /></div>
            <div className="formrow"><label>County</label><input value={newListing.county} onChange={(e) => newField("county", e.target.value)} /></div>
          </div>
          <div className="two">
            <div className="formrow"><label>Town</label><input value={newListing.town} onChange={(e) => newField("town", e.target.value)} /></div>
            <div className="formrow"><label>Venue</label><input value={newListing.venue} onChange={(e) => newField("venue", e.target.value)} /></div>
          </div>
          <div className="two">
            <div className="formrow"><label>Start date</label><input type="date" value={newListing.start} onChange={(e) => newField("start", e.target.value)} /></div>
            <div className="formrow"><label>End date</label><input type="date" value={newListing.end} onChange={(e) => newField("end", e.target.value)} placeholder="same as start if blank" /></div>
          </div>
          <div className="formrow"><label>Organiser</label><input value={newListing.organiser} onChange={(e) => newField("organiser", e.target.value)} /></div>
          <div className="formrow"><label>Description</label><textarea rows={3} value={newListing.description} onChange={(e) => newField("description", e.target.value)} style={{ fontFamily: "inherit" }} /></div>
          <div className="two">
            <div className="formrow"><label>Booking URL</label><input value={newListing.bookingUrl} onChange={(e) => newField("bookingUrl", e.target.value)} placeholder="https://..." /></div>
            <div className="formrow"><label>Contact email</label><input value={newListing.contactEmail} onChange={(e) => newField("contactEmail", e.target.value)} /></div>
          </div>
          <div className="two">
            <div className="formrow"><label>Price tier 1</label>
              <div style={{ display: "flex", gap: 6 }}>
                <input value={newListing.tier1Name} onChange={(e) => newField("tier1Name", e.target.value)} placeholder="Entry" style={{ flex: 1 }} />
                <input value={newListing.tier1Price} onChange={(e) => newField("tier1Price", e.target.value)} placeholder="0" style={{ width: 70 }} />
              </div>
            </div>
            <div className="formrow"><label>Price tier 2 (optional)</label>
              <div style={{ display: "flex", gap: 6 }}>
                <input value={newListing.tier2Name} onChange={(e) => newField("tier2Name", e.target.value)} placeholder="e.g. Concession" style={{ flex: 1 }} />
                <input value={newListing.tier2Price} onChange={(e) => newField("tier2Price", e.target.value)} placeholder="0" style={{ width: 70 }} />
              </div>
            </div>
          </div>
          <button className="btn" onClick={createListing} disabled={creating} style={{ justifySelf: "start" }}>
            {creating ? "Creating…" : "Create listing"}
          </button>
        </div>
      )}

      {loaded && (
        <div style={{ display: "flex", gap: 8, margin: "16px 0 10px" }}>
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
              <label style={{ fontSize: 12, opacity: 0.7 }}>Edit booking URL</label>
              <input
                placeholder={e.booking_url || "https://..."}
                value={edits[e.id]?.booking_url ?? ""}
                onChange={(ev) => editField(e.id, "booking_url", ev.target.value)}
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
