import { NextResponse } from "next/server";

// Booking endpoint (stub).
//
// Production (Route A — "be the box office"): create a Stripe Checkout Session
// with Stripe Connect so the organiser is paid directly and the platform takes
// an application fee. Requires STRIPE_SECRET_KEY + the organiser's connected
// account id. For now this returns a mock booking reference so the flow works
// end-to-end without charging a card.
export async function POST(request: Request) {
  let body: any = {};
  try {
    body = await request.json();
  } catch {
    // ignore — body optional for the stub
  }
  const ref =
    "CE-" + Math.random().toString(36).slice(2, 8).toUpperCase();
  return NextResponse.json({
    ok: true,
    ref,
    eventId: body?.eventId ?? null,
    note: "Stub booking — wire Stripe Connect here for live payments.",
  });
}
