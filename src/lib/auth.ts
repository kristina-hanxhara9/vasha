import { cookies } from "next/headers";
import { isSupabaseConfigured } from "./supabase/config";
import { createServerSupabase } from "./supabase/server";
import { dailyLimit } from "./tiers";
import { todayKey } from "./utils";
import { DEMO_TIER_COOKIE, DEMO_USAGE_COOKIE } from "./constants";
import type { Tier } from "./types";

export { DEMO_TIER_COOKIE, DEMO_USAGE_COOKIE };

export interface UserContext {
  isDemo: boolean;
  userId: string | null;
  email: string | null;
  name: string | null;
  tier: Tier;
  runsToday: number;
  /** null = unlimited */
  limit: number | null;
  isAdmin: boolean;
  country: string | null;
}

/** Parse a `YYYY-MM-DD:count` demo usage cookie, resetting on a new day. */
export function readDemoUsage(raw?: string): number {
  if (!raw) return 0;
  const [day, count] = raw.split(":");
  if (day !== todayKey()) return 0;
  return Number(count) || 0;
}

/**
 * Resolve the current user — a real Supabase user when configured & signed in,
 * otherwise a cookie-backed demo guest. The single source of truth for tier + usage.
 */
export async function getUserContext(): Promise<UserContext> {
  const cookieStore = cookies();

  if (isSupabaseConfigured) {
    try {
      const supabase = createServerSupabase();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        let tier: Tier = "free";
        let name: string | null = (user.user_metadata?.full_name as string) ?? null;
        let runsToday = 0;
        let isAdmin = false;
        let country: string | null = (user.user_metadata?.country as string) ?? null;
        try {
          const { data: profile } = await supabase
            .from("profiles")
            .select("tier, full_name, is_admin, country")
            .eq("id", user.id)
            .maybeSingle();
          if (profile?.tier === "premium") tier = "premium";
          if (profile?.full_name) name = profile.full_name;
          if (profile?.is_admin) isAdmin = true;
          if (profile?.country) country = profile.country;

          const { data: usage } = await supabase
            .from("usage_daily")
            .select("sandbox_count")
            .eq("user_id", user.id)
            .eq("day", todayKey())
            .maybeSingle();
          runsToday = usage?.sandbox_count ?? 0;
        } catch {
          // tables may not be migrated yet — degrade gracefully
        }

        return {
          isDemo: false,
          userId: user.id,
          email: user.email ?? null,
          name,
          tier,
          runsToday,
          limit: dailyLimit(tier),
          isAdmin,
          country,
        };
      }
    } catch {
      // fall through to demo
    }
  }

  const tier: Tier = cookieStore.get(DEMO_TIER_COOKIE)?.value === "premium" ? "premium" : "free";
  const runsToday = readDemoUsage(cookieStore.get(DEMO_USAGE_COOKIE)?.value);
  return {
    isDemo: true,
    userId: null,
    email: null,
    name: null,
    tier,
    runsToday,
    limit: dailyLimit(tier),
    isAdmin: false,
    country: null,
  };
}
