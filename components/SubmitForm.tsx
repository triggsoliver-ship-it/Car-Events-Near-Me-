"use client";
import { useState } from "react";
import { TYPES, REGIONS } from "@/lib/events";

export default function SubmitForm() {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const f = new FormData(e.currentTarget);
    const body = Object.fromEntries(f.entries());
    try {
      const res = await fetch("/api/events/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || "Something went wrong");
      setDone(true);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="bookbox" style={{ maxWidth: 560, position: "static" }}>
        <div className="tick">✓</div>
        <div className="bh" style={{ textAlign: "center" }}>Thanks — your event has been submitted!</div>
        <p className="desc" style={{ textAlign: "center" }}>We review every submission before it goes live. It will appear on the site once approved.</p>
        <button className="btn block lg" onClick={() => setDone(false)}>Submit another</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 620 }}>
      <div className="two">
        <div className="formrow"><label>Event name *</label><input name="name" required placeholder="e.g. Bristol Classic Car Show" /></div>
        <div className="formrow"><label>Event type *</label>
          <select name="type" required defaultValue="show" style={{ width: "100%", background: "var(--panel2)", border: "1px solid var(--line)", color: "var(--text)", padding: "12px 13px", borderRadius: 11 }}>
            {TYPES.map((t) => <option key={t} value={t}>{t[0].toUpperCase() + t.slice(1)}</option>)}
          </select>
        </div>
      </div>
      <div className="two">
        <div className="formrow"><label>Region *</label>
          <select name="region" required defaultValue="" style={{ width: "100%", background: "var(--panel2)", border: "1px solid var(--line)", color: "var(--text)", padding: "12px 13px", borderRadius: 11 }}>
            <option value="" disabled>Choose a region…</option>
            {REGIONS.map((r) => <option key={r}>{r}</option>)}
          </select>
        </div>
        <div className="formrow"><label>County</label><input name="county" placeholder="e.g. Somerset" /></div>
      </div>
      <div className="two">
        <div className="formrow"><label>Town / city *</label><input name="town" required placeholder="e.g. Shepton Mallet" /></div>
        <div className="formrow"><label>Venue</label><input name="venue" placeholder="e.g. Royal Bath & West Showground" /></div>
      </div>
      <div className="two">
        <div className="formrow"><label>Start date *</label><input name="start" type="date" required /></div>
        <div className="formrow"><label>End date</label><input name="end" type="date" /></div>
      </div>
      <div className="two">
        <div className="formrow"><label>Organiser *</label><input name="organiser" required placeholder="Who runs it?" /></div>
        <div className="formrow"><label>From price (£, blank = free)</label><input name="priceFrom" type="number" min="0" step="0.01" placeholder="0" /></div>
      </div>
      <div className="formrow"><label>Booking / info link</label><input name="bookingUrl" type="url" placeholder="https://…" /></div>
      <div className="formrow"><label>Description</label><input name="description" placeholder="One line about the event" /></div>
      <div className="formrow"><label>Your email (so we can confirm) *</label><input name="contactEmail" type="email" required placeholder="you@email.com" /></div>
      {error && <p style={{ color: "#ff6b6b", fontSize: 14, marginBottom: 10 }}>{error}</p>}
      <button className="btn lg" disabled={busy} type="submit">{busy ? "Submitting…" : "Submit event for review"}</button>
      <p className="secure" style={{ textAlign: "left", marginTop: 12 }}>🔒 Submissions are reviewed before they appear on the site.</p>
    </form>
  );
}
