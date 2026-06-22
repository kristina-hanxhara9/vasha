import { NextRequest, NextResponse } from "next/server";
import { stripe, isStripeConfigured } from "@/lib/stripe";
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

  const supabase = createServerSupabase();
  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", ctx.userId)
    .maybeSingle();

  if (!profile?.stripe_customer_id) {
    return NextResponse.json({ code: "no_customer" }, { status: 400 });
  }

  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id as string,
    return_url: `${origin}/account`,
  });

  return NextResponse.json({ url: session.url });
}
