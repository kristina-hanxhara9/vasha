"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Tier } from "@/lib/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { DEMO_TIER_COOKIE } from "@/lib/constants";

interface MeResponse {
  isDemo: boolean;
  supabaseConfigured: boolean;
  stripeConfigured: boolean;
  isAuthed: boolean;
  user: { name: string | null; email: string | null } | null;
  tier: Tier;
  runsToday: number;
  limit: number | null;
  remaining: number | null;
  isAdmin: boolean;
  country: string | null;
}

interface AuthValue extends MeResponse {
  ready: boolean;
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
}

const defaultState: MeResponse = {
  isDemo: true,
  supabaseConfigured: isSupabaseConfigured,
  stripeConfigured: false,
  isAuthed: false,
  user: null,
  tier: "free",
  runsToday: 0,
  limit: null,
  remaining: null,
  isAdmin: false,
  country: null,
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<MeResponse>(defaultState);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/me", { cache: "no-store" });
      if (res.ok) setState((await res.json()) as MeResponse);
    } catch {
      /* keep last known state */
    } finally {
      setReady(true);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const signOut = useCallback(async () => {
    if (isSupabaseConfigured) {
      const { createClient } = await import("@/lib/supabase/client");
      await createClient().auth.signOut();
    } else {
      document.cookie = `${DEMO_TIER_COOKIE}=; path=/; max-age=0; samesite=lax`;
    }
    await refresh();
    window.location.href = "/";
  }, [refresh]);

  const value = useMemo<AuthValue>(
    () => ({ ...state, ready, refresh, signOut }),
    [state, ready, refresh, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
