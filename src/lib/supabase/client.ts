"use client";

import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config";

/** Browser Supabase client. Only call when isSupabaseConfigured is true. */
export function createClient() {
  return createBrowserClient(SUPABASE_URL as string, SUPABASE_ANON_KEY as string);
}
