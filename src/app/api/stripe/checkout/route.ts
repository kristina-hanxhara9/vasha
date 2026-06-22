import { NextRequest, NextResponse } from "next/server";
import { stripe, isStripeConfigured, STRIPE_PREMIUM_PRICE_ID } from "@/lib/stripe";
import { getUserContext } from "@/lib/auth";
import { createServerSupabase } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!isStripeConfigured || !stripe || !isSupabaseConfigured) {
    return NextResponse.json({ code: "not_configured" }, { status: 400 });
  }

  const ctx = await getUserContext();
  if (ctx.isDemo || !ctx.userId) {
    return NextResponse.json({ code: "auth_required" }, { status: 401 });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  const supabase = createServerSupabase();

  // Reuse or create a Stripe customer, stored on the profile.
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", ctx.userId)
    .maybeSingle();

  let customerId = profile?.stripe_customer_id as string | undefined;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: ctx.email ?? undefined,
      metadata: { supabase_id: ctx.userId },
    });
    customerId = customer.id;
    await supabase.from("profiles").update({ stripe_customer_id: customerId }).eq("id", ctx.userId);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: STRIPE_PREMIUM_PRICE_ID as string, quantity: 1 }],
    success_url: `${origin}/account?upgraded=1`,
    cancel_url: `${origin}/pricing`,
    metadata: { supabase_id: ctx.userId },
    subscription_data: { metadata: { supabase_id: ctx.userId } },
  });

  return NextResponse.json({ url: session.url });
}
