import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe, STRIPE_WEBHOOK_SECRET } from "@/lib/stripe";
import { createAdminSupabase } from "@/lib/supabase/server";
import { isSupabaseConfigured, SUPABASE_SERVICE_ROLE_KEY } from "@/lib/supabase/config";
import type { Tier } from "@/lib/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!stripe || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ code: "not_configured" }, { status: 400 });
  }

  const signature = req.headers.get("stripe-signature");
  // IMPORTANT: read the RAW body before any parsing, or signature check fails.
  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature as string, STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ code: "bad_signature" }, { status: 400 });
  }

  const admin =
    isSupabaseConfigured && SUPABASE_SERVICE_ROLE_KEY ? createAdminSupabase() : null;

  const setTier = async (customerId: string | null, tier: Tier) => {
    if (!admin || !customerId) return;
    await admin.from("profiles").update({ tier }).eq("stripe_customer_id", customerId);
  };

  switch (event.type) {
    case "checkout.session.completed": {
      const s = event.data.object as Stripe.Checkout.Session;
      await setTier(s.customer ? String(s.customer) : null, "premium");
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const active = sub.status === "active" || sub.status === "trialing";
      await setTier(String(sub.customer), active ? "premium" : "free");
      break;
    }
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      await setTier(String(sub.customer), "free");
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}
