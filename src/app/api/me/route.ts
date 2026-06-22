import { NextResponse } from "next/server";
import { getUserContext } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { isStripeConfigured } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function GET() {
  const ctx = await getUserContext();
  const remaining = ctx.limit === null ? null : Math.max(0, ctx.limit - ctx.runsToday);
  return NextResponse.json({
    isDemo: ctx.isDemo,
    supabaseConfigured: isSupabaseConfigured,
    stripeConfigured: isStripeConfigured,
    isAuthed: !ctx.isDemo && Boolean(ctx.userId),
    user: ctx.userId ? { name: ctx.name, email: ctx.email } : null,
    tier: ctx.tier,
    runsToday: ctx.runsToday,
    limit: ctx.limit,
    remaining,
    isAdmin: ctx.isAdmin,
    country: ctx.country,
  });
}
