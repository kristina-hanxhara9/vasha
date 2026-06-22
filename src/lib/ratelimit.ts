import { cookies } from "next/headers";
import { isSupabaseConfigured } from "./supabase/config";
import { createServerSupabase } from "./supabase/server";
import { todayKey } from "./utils";
import { DEMO_USAGE_COOKIE, readDemoUsage, type UserContext } from "./auth";

export interface LimitCheck {
  allowed: boolean;
  remaining: number | null; // null = unlimited
}

/** Check whether the user may run the Sandbox now (does NOT increment). */
export function checkLimit(ctx: UserContext): LimitCheck {
  if (ctx.limit === null) return { allowed: true, remaining: null };
  const remaining = Math.max(0, ctx.limit - ctx.runsToday);
  return { allowed: remaining > 0, remaining };
}

/** Record one Sandbox run. Real users → DB (atomic RPC); demo → cookie. */
export async function incrementUsage(ctx: UserContext): Promise<void> {
  if (!ctx.isDemo && ctx.userId && isSupabaseConfigured) {
    try {
      const supabase = createServerSupabase();
      await supabase.rpc("increment_sandbox_usage");
    } catch {
      // best-effort; never block the reply on a usage write
    }
    return;
  }

  // Demo mode: bump the cookie counter for today.
  const cookieStore = cookies();
  const current = readDemoUsage(cookieStore.get(DEMO_USAGE_COOKIE)?.value);
  cookieStore.set(DEMO_USAGE_COOKIE, `${todayKey()}:${current + 1}`, {
    path: "/",
    maxAge: 60 * 60 * 48,
    sameSite: "lax",
  });
}
