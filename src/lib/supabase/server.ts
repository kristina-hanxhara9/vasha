import { createServerClient } from "@supabase/ssr";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY } from "./config";

/** Server Supabase client bound to the request cookies (App Router). */
export function createServerSupabase() {
  const cookieStore = cookies();
  return createServerClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component where cookies are read-only — safe to ignore;
          // session refresh happens in middleware.
        }
      },
    },
  });
}

/** Service-role client for trusted server work (e.g. Stripe webhook upgrading a tier). */
export function createAdminSupabase() {
  return createSupabaseClient(SUPABASE_URL as string, SUPABASE_SERVICE_ROLE_KEY as string, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
