import type { Tier } from "./types";

/**
 * Prices, in one place.
 *
 * A listing is in one of three states:
 *   - free       free === true            "Free entry — just turn up"
 *   - ticketed   free false, tiers set    each ticket type with its price
 *   - unknown    free false, tiers = []   "Check prices on the official site"
 *
 * "Unknown" exists so that a missing price is never shown as "Free". Until
 * September 2026 every blank price (from the submit form, feed imports, admin
 * create) was stored as a £0 "Free Entry" tier. Dubs at the Lakes went live as
 * "Free entry — just turn up" when it was a ticket-only camping weekend, and
 * the organiser had to write in to correct it.
 */

export type PriceState = "free" | "ticketed" | "unknown";

export function priceState(e: { free?: boolean | null; tiers?: Tier[] | null }): PriceState {
  if (e.free) return "free";
  return e.tiers && e.tiers.length ? "ticketed" : "unknown";
}

/**
 * Read prices the way people actually write them, one ticket type per line.
 * All of these work:
 *   Adult weekend camping ticket (16+) £55
 *   Adult weekend camping ticket (16+) - £55.00
 *   Child (5-16): £10
 *   Adult | 12
 *   £8 Adult on the gate
 *   Under 5s free
 * Returns an error naming the first line it can't read, so nothing
 * half-parsed is ever saved.
 */
export function parsePriceLines(text: string): { tiers: Tier[] } | { error: string } {
  const tiers: Tier[] = [];
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.replace(/\s+/g, " ").trim();
    if (!line) continue;
    const t = parsePriceLine(line);
    if (!t) return { error: `Couldn't find a price on this line: "${line}". Write it like "Adult £12" or "Under 5s free".` };
    tiers.push(t);
    if (tiers.length > 10) return { error: "Ten price lines at most." };
  }
  if (tiers.length === 0) return { error: "Add at least one price line, e.g. \"Adult £12\"." };
  return { tiers };
}

const AMOUNT = String.raw`£?\s?(\d{1,4}(?:,\d{3})*(?:\.\d{1,2})?)`;
const SEP = String.raw`\s*(?:\||:|–|—|-|=)?\s*`;

function tidyName(s: string) {
  const t = s.replace(/^[\s|:–—\-=]+|[\s|:–—\-=]+$/g, "").trim().slice(0, 80);
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function money(s: string) {
  return Math.round(parseFloat(s.replace(/,/g, "")) * 100) / 100;
}

export function parsePriceLine(line: string): Tier | null {
  // "Under 5s free", "Free entry" — the word free and no £ amount on the line
  if (/\bfree\b/i.test(line) && !/£/.test(line) && !/\d\s*(?:each|pp)?\s*$/i.test(line)) {
    const name = tidyName(line.replace(/\bfree\b/i, "")) || "Entry";
    return { name, price: 0 };
  }
  // Name then amount at the end: "Adult £55", "Adult | 55", "Child (5-16): £10.00", "Adult 12 each"
  let m = line.match(new RegExp(String.raw`^(.*?\S)${SEP}${AMOUNT}(?:\s*(?:each|pp|per person|per ticket))?\s*$`, "i"));
  if (m) {
    const name = tidyName(m[1]);
    if (name) return { name, price: money(m[2]) };
  }
  // Amount first: "£8 Adult on the gate"
  m = line.match(new RegExp(String.raw`^£\s?(\d{1,4}(?:,\d{3})*(?:\.\d{1,2})?)${SEP}(.+)$`, "i"));
  if (m) {
    const name = tidyName(m[2]);
    if (name) return { name, price: money(m[1]) };
  }
  return null;
}

export const tiersToLines = (tiers: Tier[] | null | undefined) =>
  (tiers || []).map((t) => `${t.name} ${t.price === 0 ? "free" : "£" + String(t.price)}`).join("\n");

/** Lowest price, or null when prices aren't known. */
export function lowestPrice(e: { free?: boolean | null; tiers: Tier[] }): number | null {
  if (e.free) return 0;
  if (!e.tiers || !e.tiers.length) return null;
  return Math.min(...e.tiers.map((t) => t.price));
}

// Ticket sites. A listing marked "free" whose link goes to one of these is
// almost certainly wrong — that is exactly how Dubs at the Lakes looked.
const TICKET_HOSTS = [
  "ticketsource", "eventbrite", "skiddle", "ticketmaster", "seetickets", "ticketlab",
  "tickettailor", "fatsoma", "ticketweb", "gigantic", "trybooking", "billetto",
  "ticketbud", "ents24", "wegottickets", "yourticketbooking", "designmynight", "ticketsrv",
];

export function looksLikeTicketSite(url?: string | null) {
  if (!url) return false;
  const u = url.toLowerCase();
  // A "/tickets" path counts too (e.g. glosvintageextravaganza.ticketsrv.co.uk/tickets/Admission).
  // "/book..." deliberately doesn't: Caffeine & Machine's free meets link to
  // "book-a-table", which is a café booking, not an entry ticket.
  return TICKET_HOSTS.some((h) => u.includes(h)) || /\/tickets?(\/|$|\?)/.test(u);
}

/** Why a listing's price needs a human look, or null if it looks fine. */
export function priceProblem(e: { free?: boolean | null; tiers?: Tier[] | null; booking_url?: string | null }): string | null {
  const st = priceState({ free: e.free, tiers: e.tiers });
  if (st === "free" && looksLikeTicketSite(e.booking_url)) return "Marked free, but the link is a ticket site";
  if (st === "unknown") return "No prices yet — shows \"check official site\"";
  if (st === "ticketed" && (e.tiers || []).every((t) => t.price === 0)) return "Marked ticketed, but every price is £0";
  return null;
}
