"use client";
import { useEffect, useState } from "react";
import { parsePriceLines, priceProblem, priceState, tiersToLines, type PriceState } from "@/lib/prices";

export const dynamic = "force-dynamic";

const STATUS_COLOR: Record<string, string> = {
  pending: "#f5a623",
  approved: "#4ade80",
  rejected: "#ff6b6b",
};

const EVENT_TYPES = ["show", "meet", "modified", "classic", "track day", "auction", "autojumble", "motorsport"];

const TOKEN_STORAGE_KEY = "cenm_admin_token";

type Tier = { name: string; price: number };

type NewListing = {
  name: string; type: string; region: string; county: string; town: string; venue: string;
  start: string; end: string; organiser: string; description: string; bookingUrl: string;
  contactEmail: string; entry: PriceState; prices: string;
};

const BLANK_LISTING: NewListing = {
  name: "", type: "show", region: "", county: "", town: "", venue: "",
  start: "", end: "", organiser: "", description: "", bookingUrl: "",
  contactEmail: "", entry: "unknown", prices: "",
};

// Pending edits for one listing. `entry` + `prices` are only sent when the
// price editor has been opened for that listing.
type EditDraft = {
  description?: string;
  img_url?: string;
  booking_url?: string;
  entry?: PriceState;
  prices?: string;
};
type EditField = keyof EditDraft;

const ENTRY_LABEL: Record<PriceState, string> = {
  free: "Free — turn up, no tickets",
  ticketed: "Ticketed — show prices + ticket link",
  unknown: "Not confirmed — \"check the official site\"",
};

const fmt = (p: number) => (p === 0 ? "Free" : "£" + p.toFixed(2).replace(/\.00$/, ""));
const tiersSummary = (tiers: Tier[] | null | undefined) =>
  (tiers || []).map((t) => `${t.name} ${fmt(t.price)}`).join(" · ");

const today = () => new Date().toISOString().slice(0, 10);

/** What the price editor would save, or an error. */
function pricePatch(entry: PriceState, prices: string): { tiers: Tier[]; free: boolean } | { error: string } {
  if (entry === "free") return { tiers: [{ name: "Free entry", price: 0 }], free: true };
  if (entry === "unknown") return { tiers: [], free: false };
  const parsed = parsePriceLines(prices);
  if ("error" in parsed) return parsed;
  return { tiers: parsed.tiers, free: false };
}

function PricePreview({ entry, prices }: { entry: PriceState; prices: string }) {
  if (entry !== "ticketed") return null;
  if (!prices.trim()) return <p className="desc" style={{ fontSize: 12, margin: 0 }}>Paste the prices from the ticket page — one per line.</p>;
  const r = pricePatch(entry, prices);
  if ("error" in r) return <p style={{ color: "#ff6b6b", fontSize: 12, margin: 0 }}>{r.error}</p>;
  return (
    <p className="desc" style={{ fontSize: 12, margin: 0, color: "#4ade80" }}>
      Will show: {tiersSummary(r.tiers)}
    </p>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState("");
  const [tokenRemembered, setTokenRemembered] = useState(false);
  const [events, setEvents] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [edits, setEdits] = useState<Record<number, EditDraft>>({});
  const [saving, setSaving] = useState<number | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected" | "prices">("all");
  const [search, setSearch] = useState("");
  const [lastSearch, setLastSearch] = useState("");
  const [newListing, setNewListing] = useState<NewListing>(BLANK_LISTING);
  const [creating, setCreating] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);

  // Remember the token in this browser only (localStorage never leaves the
  // device), so it doesn't need retyping on every visit.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(TOKEN_STORAGE_KEY);
      if (saved) {
        setToken(saved);
        setTokenRemembered(true);
      }
    } catch {
      // localStorage unavailable (private browsing etc) — just skip remembering.
    }
  }, []);

  useEffect(() => {
    try {
      if (token) {
        window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
        setTokenRemembered(true);
      }
    } catch {
      // ignore
    }
  }, [token]);

  function forgetToken() {
    try {
      window.localStorage.removeItem(TOKEN_STORAGE_KEY);
    } catch {
      // ignore
    }
    setToken("");
    setTokenRemembered(false);
  }

  function auth(): Record<string, string> {
    return { Authorization: "Bearer " + token };
  }

  async function load(q = "") {
    setMsg("");
    setLoading(true);
    // The token goes in a header, never the query string: a URL would be
    // recorded in hosting access logs, browser history and Referer headers.
    // The search text is not secret, so it can go in the URL.
    const url = "/api/admin/events" + (q.trim() ? "?q=" + encodeURIComponent(q.trim()) : "");
    const res = await fetch(url, { headers: auth() });
    const d = await res.json();
    setLoading(false);
    if (!res.ok) { setMsg(d.error || "Failed"); return; }
    setEvents(d.events || []);
    setLastSearch(q.trim());
    setLoaded(true);
    if (q.trim()) {
      setFilter("all");
      if ((d.events || []).length === 0) setMsg(`Nothing matches "${q.trim()}".`);
    }
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

  function editField(id: number, field: EditField, value: string) {
    setEdits((e) => ({ ...e, [id]: { ...e[id], [field]: value } }));
  }

  function openPriceEditor(e: any) {
    const st = priceState(e);
    setEdits((d) => ({
      ...d,
      [e.id]: {
        ...d[e.id],
        // A listing marked free with a ticket-site link is almost always really ticketed.
        entry: st === "free" && priceProblem(e) ? "ticketed" : st,
        prices: st === "ticketed" ? tiersToLines(e.tiers) : "",
      },
    }));
  }

  async function save(id: number) {
    const draft: EditDraft = edits[id] || {};
    const patch: Record<string, unknown> = {};
    if (draft.description) patch.description = draft.description;
    if (draft.img_url) patch.img_url = draft.img_url;
    if (draft.booking_url) patch.booking_url = draft.booking_url;
    if (draft.entry) {
      const p = pricePatch(draft.entry, draft.prices || "");
      if ("error" in p) { setMsg(p.error); return; }
      patch.tiers = p.tiers;
      patch.free = p.free;
    }
    if (Object.keys(patch).length === 0) { setMsg("Nothing changed."); return; }
    setSaving(id);
    const res = await fetch("/api/admin/events", {
      method: "POST",
      headers: { ...auth(), "Content-Type": "application/json" },
      body: JSON.stringify({ id, action: "update", ...patch }),
    });
    const d = await res.json();
    setSaving(null);
    if (!res.ok) { setMsg(d.error || "Save failed"); return; }
    setEvents((ev) => ev.map((e) => (e.id === id ? { ...e, ...patch, source: d.source ?? e.source } : e)));
    setEdits((e) => ({ ...e, [id]: {} }));
    setMsg(`Saved #${id} — live now.`);
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
    const p = pricePatch(n.entry, n.prices);
    if ("error" in p) { setMsg(p.error); return; }
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
        tiers: p.tiers, free: p.free,
      }),
    });
    const d = await res.json();
    setCreating(false);
    if (!res.ok) { setMsg(d.error || "Create failed"); return; }
    setMsg(`Created "${n.name}" — #${d.id}, live now.`);
    setNewListing(BLANK_LISTING);
    setShowNewForm(false);
    if (loaded) load(lastSearch);
  }

  // Price check: approved, still upcoming, and the price looks wrong or missing.
  const needsPriceCheck = (e: any) =>
    e.status === "approved" && (e.end_date || e.start_date) >= today() && !!priceProblem(e);

  const visible = events.filter((e) =>
    filter === "all" ? true : filter === "prices" ? needsPriceCheck(e) : e.status === filter
  );
  const priceCheckCount = events.filter(needsPriceCheck).length;

  return (
    <main className="detail adminpage">
      <style>{`
        .adminpage input:not([type=radio]),.adminpage textarea,.adminpage select{background:var(--panel2);border:1px solid var(--line);color:var(--text);padding:10px 12px;border-radius:10px;font:inherit;font-size:14px}
        .adminpage .clear{background:transparent;border:1px solid var(--line);color:var(--muted);padding:10px 14px;border-radius:10px;font-size:13px;cursor:pointer}
        .adminpage .clear:hover{color:var(--text)}
      `}</style>
      <h1 style={{ fontSize: 30, marginBottom: 14 }}>Listings admin</h1>
      <div className="two" style={{ maxWidth: 520 }}>
        <div className="formrow"><label>Admin token</label><input value={token} onChange={(e) => setToken(e.target.value)} placeholder="ADMIN_TOKEN" /></div>
        <div className="formrow"><label>&nbsp;</label><button className="btn" onClick={() => load()}>Load recent</button></div>
      </div>
      {tokenRemembered && (
        <p className="desc" style={{ fontSize: 12, marginTop: 4 }}>
          Remembered in this browser, so you won&apos;t need to type it in again next time. <a href="#" onClick={(ev) => { ev.preventDefault(); forgetToken(); }}>Forget it</a>
        </p>
      )}

      {/* Find one listing fast — by number, pasted link, or name/town/organiser/email. */}
      <form
        onSubmit={(ev) => { ev.preventDefault(); load(search); }}
        style={{ display: "flex", gap: 8, maxWidth: 640, marginTop: 14 }}
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Find a listing: 36554, a careventsnearme.uk link, a name, town or email"
          style={{ flex: 1 }}
        />
        <button className="btn" type="submit" disabled={loading}>{loading ? "…" : "Find"}</button>
        {lastSearch && <button className="clear" type="button" onClick={() => { setSearch(""); load(); }}>Clear</button>}
      </form>

      {msg && <p style={{ color: msg.startsWith("Saved") || msg.startsWith("Created") || msg === "Updated." ? "#4ade80" : "#ff6b6b" }}>{msg}</p>}

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
            <div className="formrow"><label>Booking / ticket URL</label><input value={newListing.bookingUrl} onChange={(e) => newField("bookingUrl", e.target.value)} placeholder="https://..." /></div>
            <div className="formrow"><label>Contact email</label><input value={newListing.contactEmail} onChange={(e) => newField("contactEmail", e.target.value)} /></div>
          </div>
          <div className="formrow"><label>Entry</label>
            <select value={newListing.entry} onChange={(e) => newField("entry", e.target.value as PriceState)}>
              {(["ticketed", "free", "unknown"] as PriceState[]).map((s) => <option key={s} value={s}>{ENTRY_LABEL[s]}</option>)}
            </select>
          </div>
          {newListing.entry === "ticketed" && (
            <div className="formrow"><label>Prices — paste one per line</label>
              <textarea rows={4} value={newListing.prices} onChange={(e) => newField("prices", e.target.value)} placeholder={"Adult weekend camping (16+) £55\nChild (5–16) £10\nUnder 5s free"} style={{ fontFamily: "inherit" }} />
            </div>
          )}
          <PricePreview entry={newListing.entry} prices={newListing.prices} />
          <button className="btn" onClick={createListing} disabled={creating} style={{ justifySelf: "start" }}>
            {creating ? "Creating…" : "Create listing"}
          </button>
        </div>
      )}

      {loaded && (
        <div style={{ display: "flex", gap: 8, margin: "16px 0 10px", flexWrap: "wrap" }}>
          {(["all", "pending", "approved", "rejected"] as const).map((f) => (
            <button key={f} className={filter === f ? "btn" : "clear"} onClick={() => setFilter(f)} style={{ textTransform: "capitalize" }}>
              {f} {f !== "all" ? `(${events.filter((e) => e.status === f).length})` : `(${events.length})`}
            </button>
          ))}
          <button className={filter === "prices" ? "btn" : "clear"} onClick={() => setFilter("prices")} title="Live, upcoming listings whose price looks wrong or is missing">
            ⚠ Price check ({priceCheckCount})
          </button>
        </div>
      )}
      {loaded && lastSearch && <p className="desc" style={{ fontSize: 13 }}>Showing matches for &ldquo;{lastSearch}&rdquo;.</p>}
      {loaded && !lastSearch && <p className="desc" style={{ fontSize: 12, opacity: 0.7 }}>Showing the 500 newest listings. Use Find for anything older.</p>}
      {loaded && visible.length === 0 && <p className="desc">Nothing here. 🎉</p>}
      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        {visible.map((e) => {
          const draft = edits[e.id] || {};
          const problem = priceProblem(e);
          const st = priceState(e);
          return (
            <div key={e.id} className="bookbox" style={{ position: "static" }}>
              <div style={{ fontWeight: 800, fontSize: 17, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                {e.name} <span style={{ opacity: 0.5, fontWeight: 400, fontSize: 13 }}>#{e.id}</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: STATUS_COLOR[e.status] || "#999", border: "1px solid " + (STATUS_COLOR[e.status] || "#999"), borderRadius: 6, padding: "1px 6px", textTransform: "uppercase" }}>{e.status}</span>
                <a href={`/events/${e.id}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 400 }}>View live ↗</a>
              </div>
              <p className="desc" style={{ margin: "6px 0" }}>
                {e.type} · {e.town}{e.county ? ", " + e.county : ""} · {e.region} · {e.start_date}
                {e.venue ? " · " + e.venue : ""}
              </p>
              {e.description && <p className="desc">{e.description}</p>}
              {e.img_url && <p className="desc" style={{ fontSize: 12, opacity: 0.7 }}>Photo: {e.img_url}</p>}
              <p className="desc" style={{ fontSize: 13 }}>By {e.organiser}{e.contact_email ? " · " + e.contact_email : ""}{e.booking_url ? " · " + e.booking_url : ""}</p>

              {/* Prices — the first thing organisers write in about. */}
              <div style={{ marginTop: 8, padding: "10px 12px", borderRadius: 10, border: "1px solid " + (problem ? "#f5a623" : "var(--line)") }}>
                <div style={{ fontSize: 13, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                  <b>Prices:</b>
                  <span>{st === "free" ? "Free entry" : st === "unknown" ? "Not confirmed (shows \"check the official site\")" : tiersSummary(e.tiers)}</span>
                  {!draft.entry && <button className="clear" onClick={() => openPriceEditor(e)} style={{ padding: "4px 10px" }}>Change prices</button>}
                </div>
                {problem && <p style={{ color: "#f5a623", fontSize: 12, margin: "6px 0 0" }}>⚠ {problem}</p>}
                {draft.entry && (
                  <div style={{ display: "grid", gap: 6, marginTop: 8 }}>
                    <div style={{ display: "flex", gap: 14, flexWrap: "wrap", fontSize: 13 }}>
                      {(["ticketed", "free", "unknown"] as PriceState[]).map((s) => (
                        <label key={s} style={{ display: "flex", gap: 5, alignItems: "center" }}>
                          <input type="radio" name={`entry-${e.id}`} checked={draft.entry === s} onChange={() => editField(e.id, "entry", s)} />
                          {ENTRY_LABEL[s]}
                        </label>
                      ))}
                    </div>
                    {draft.entry === "ticketed" && (
                      <textarea
                        rows={4}
                        autoFocus
                        placeholder={"Paste straight from the ticket page or their email, e.g.\nAdult weekend camping ticket (16+) £55\nChild weekend ticket (5–16) £10\nUnder 5s free"}
                        value={draft.prices ?? ""}
                        onChange={(ev) => editField(e.id, "prices", ev.target.value)}
                        style={{ width: "100%", fontFamily: "inherit" }}
                      />
                    )}
                    <PricePreview entry={draft.entry} prices={draft.prices || ""} />
                    {draft.entry === "ticketed" && (
                      <input
                        placeholder={e.booking_url ? `Ticket link (now: ${e.booking_url})` : "Ticket link — https://..."}
                        value={draft.booking_url ?? ""}
                        onChange={(ev) => editField(e.id, "booking_url", ev.target.value)}
                        style={{ width: "100%" }}
                      />
                    )}
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn" onClick={() => save(e.id)} disabled={saving === e.id}>
                        {saving === e.id ? "Saving…" : "Save prices"}
                      </button>
                      <button className="clear" onClick={() => setEdits((d) => ({ ...d, [e.id]: {} }))}>Cancel</button>
                    </div>
                  </div>
                )}
              </div>

              <details style={{ marginTop: 10 }}>
                <summary style={{ cursor: "pointer", fontSize: 13, opacity: 0.8 }}>Edit description, photo or link</summary>
                <div style={{ marginTop: 8, display: "grid", gap: 6 }}>
                  <label style={{ fontSize: 12, opacity: 0.7 }}>Description</label>
                  <textarea
                    rows={3}
                    placeholder={e.description || "Description"}
                    value={draft.description ?? ""}
                    onChange={(ev) => editField(e.id, "description", ev.target.value)}
                    style={{ width: "100%", fontFamily: "inherit" }}
                  />
                  <label style={{ fontSize: 12, opacity: 0.7 }}>Photo URL</label>
                  <input
                    placeholder={e.img_url || "https://..."}
                    value={draft.img_url ?? ""}
                    onChange={(ev) => editField(e.id, "img_url", ev.target.value)}
                    style={{ width: "100%" }}
                  />
                  <label style={{ fontSize: 12, opacity: 0.7 }}>Booking / ticket URL</label>
                  <input
                    placeholder={e.booking_url || "https://..."}
                    value={draft.booking_url ?? ""}
                    onChange={(ev) => editField(e.id, "booking_url", ev.target.value)}
                    style={{ width: "100%" }}
                  />
                  <button className="btn" onClick={() => save(e.id)} disabled={saving === e.id} style={{ justifySelf: "start" }}>
                    {saving === e.id ? "Saving…" : "Save edits"}
                  </button>
                </div>
              </details>

              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                {e.status !== "approved" && <button className="btn" onClick={() => act(e.id, "approve")}>Approve</button>}
                {e.status !== "rejected" && <button className="clear" onClick={() => act(e.id, "reject")}>Reject</button>}
                {e.status === "approved" && <button className="clear" onClick={() => act(e.id, "unpublish")}>Unpublish (back to pending)</button>}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
