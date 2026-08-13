import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { getClient, dbEnabled } from "@/lib/db";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

/**
 * Enforces the retention periods published in /privacy.
 *
 *  1. The contact email on a submission is erased 12 months after the event
 *     ended. The listing row itself is kept: the notice says published
 *     listings stay on as an archive of what we published, and once the
 *     email is gone the row holds no personal data. Nulling one column
 *     rather than deleting the row is deliberate — it honours the promise
 *     about the email without destroying the public record of the event.
 *
 *  2. Rejected submissions are deleted outright 6 months after they were
 *     submitted. Nothing about them was ever published, so there is no
 *     listing worth keeping, and the notice says they are deleted.
 *
 * Run daily by Vercel Cron (see vercel.json).
 */

const CONTACT_EMAIL_MONTHS = 12;
const REJECTED_MONTHS = 6;

function constantTimeEqual(a: string, b: string): boolean {
  const x = Buffer.from(a, "utf8");
  const y = Buffer.from(b, "utf8");
  if (x.length !== y.length) return false;
  return timingSafeEqual(x, y);
}

/**
 * Vercel Cron sends `Authorization: Bearer <CRON_SECRET>`.
 *
 * Fails closed: if CRON_SECRET is not configured nobody gets in. There is
 * deliberately no `?secret=` query fallback — this endpoint destroys data,
 * and a secret in a URL leaks into access logs, browser history and Referer
 * headers. The token is never logged.
 */
function authorised(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = request.headers.get("authorization");
  if (!header || !header.startsWith("Bearer ")) return false;
  return constantTimeEqual(header.slice("Bearer ".length), secret);
}

function monthsAgo(months: number): Date {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return d;
}

export async function GET(request: Request) {
  if (!authorised(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!dbEnabled) {
    return NextResponse.json({ error: "DB not enabled" }, { status: 503 });
  }
  const sb = getClient(true);
  if (!sb) {
    return NextResponse.json({ error: "Server not configured" }, { status: 503 });
  }

  const ranAt = new Date().toISOString();
  // end_date is a `date` column; created_at is `timestamptz`.
  const emailCutoff = monthsAgo(CONTACT_EMAIL_MONTHS).toISOString().slice(0, 10);
  const rejectedCutoff = monthsAgo(REJECTED_MONTHS).toISOString();

  const errors: string[] = [];
  let contactEmailsErased: number[] = [];
  let rejectedDeleted: number[] = [];

  // 1. Erase contact emails on events that ended more than 12 months ago.
  const cleared = await sb
    .from("events")
    .update({ contact_email: null })
    .lt("end_date", emailCutoff)
    .not("contact_email", "is", null)
    .select("id");
  if (cleared.error) errors.push("contact_email: " + cleared.error.message);
  else contactEmailsErased = (cleared.data ?? []).map((r: { id: number }) => r.id);

  // 2. Delete rejected submissions older than 6 months.
  const removed = await sb
    .from("events")
    .delete()
    .eq("status", "rejected")
    .lt("created_at", rejectedCutoff)
    .select("id");
  if (removed.error) errors.push("rejected: " + removed.error.message);
  else rejectedDeleted = (removed.data ?? []).map((r: { id: number }) => r.id);

  // Evidence that the job ran, and what it touched. Ids only — no emails,
  // no token.
  const summary = {
    job: "retention",
    ranAt,
    policy: {
      contactEmailMonthsAfterEvent: CONTACT_EMAIL_MONTHS,
      rejectedMonthsAfterSubmission: REJECTED_MONTHS,
    },
    cutoffs: { endDateBefore: emailCutoff, createdAtBefore: rejectedCutoff },
    contactEmailsErased: contactEmailsErased.length,
    contactEmailsErasedIds: contactEmailsErased,
    rejectedDeleted: rejectedDeleted.length,
    rejectedDeletedIds: rejectedDeleted,
    errors,
  };
  console.log("[retention] " + JSON.stringify(summary));

  return NextResponse.json(summary, { status: errors.length ? 500 : 200 });
}

export const POST = GET;
