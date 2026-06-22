"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cn } from "@/lib/utils";

const COUNTRIES = ["Shqipëri", "Kosovë", "Itali", "Gjermani", "Zvicër", "Mbretëri e Bashkuar", "SHBA", "Tjetër"];

const inputCls =
  "w-full rounded-xl border border-plum-200 px-3.5 py-2.5 text-sm outline-none focus:border-plum-400 focus:ring-2 focus:ring-plum-200";

function LoginInner() {
  const { t, loc } = useI18n();
  const params = useSearchParams();
  const router = useRouter();
  const next = params.get("next") || "/account";
  const [mode, setMode] = useState<"signup" | "login">(params.get("mode") === "login" ? "login" : "signup");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError("");
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { error: err } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
          data: mode === "signup" && country ? { country } : undefined,
        },
      });
      if (err) setError(err.message);
      else setSent(true);
    } catch {
      setError(t("sandbox.errorGeneric"));
    } finally {
      setLoading(false);
    }
  };

  const tab = (value: "signup" | "login", label: string) => (
    <button
      type="button"
      onClick={() => setMode(value)}
      className={cn(
        "flex-1 rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
        mode === value ? "bg-plum-500 text-white" : "text-plum-600 hover:bg-plum-100",
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="mx-auto max-w-md px-4 py-12 sm:px-6">
      <div className="vasha-card p-6 sm:p-8">
        {isSupabaseConfigured ? (
          <div className="mb-5 flex gap-1 rounded-full bg-plum-50 p-1">
            {tab("signup", loc({ sq: "Regjistrohu", en: "Sign up" }))}
            {tab("login", loc({ sq: "Hyr", en: "Log in" }))}
          </div>
        ) : null}

        <h1 className="font-display text-2xl font-semibold text-plum-700">
          {mode === "signup" ? t("auth.signUpTitle") : t("auth.signInTitle")}
        </h1>

        {isSupabaseConfigured ? (
          sent ? (
            <div className="mt-5 rounded-xl bg-plum-50 p-4 text-sm text-plum-700">
              <Icon name="Mail" className="mb-1 h-5 w-5" aria-hidden="true" />
              <p>{t("auth.magicLinkSent")}</p>
            </div>
          ) : (
            <form onSubmit={sendLink} className="mt-5 space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-charcoal">{t("auth.email")}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("auth.emailPlaceholder")}
                  className={inputCls}
                />
              </div>

              {mode === "signup" ? (
                <div>
                  <label className="mb-1 block text-sm font-medium text-charcoal">
                    {loc({ sq: "Vendi yt (opsionale)", en: "Your country (optional)" })}
                  </label>
                  <input
                    list="vasha-countries-login"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder={loc({ sq: "Shkruaj ose zgjidh…", en: "Type or choose…" })}
                    className={inputCls}
                  />
                  <datalist id="vasha-countries-login">
                    {COUNTRIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                  <p className="mt-1 text-xs text-muted">
                    {loc({
                      sq: "E përdorim vetëm për të të dhënë ndihmë lokale. Ti vendos.",
                      en: "Used only to give you local help. You're in control.",
                    })}
                  </p>
                </div>
              ) : null}

              <Button type="submit" fullWidth disabled={loading}>
                <Icon name="Mail" className="h-4 w-4" aria-hidden="true" />
                {mode === "signup" ? loc({ sq: "Regjistrohu falas", en: "Sign up free" }) : loc({ sq: "Hyr", en: "Log in" })}
              </Button>
              <p className="text-center text-xs text-muted">
                {loc({ sq: "Të dërgojmë një lidhje në email — pa fjalëkalim.", en: "We'll email you a link — no password." })}
              </p>
              {error ? <p className="text-xs text-red-700">{error}</p> : null}
            </form>
          )
        ) : (
          <div className="mt-5 rounded-xl bg-gold-100 p-4 text-sm leading-relaxed text-gold-800">
            {t("auth.demoNotice")}
          </div>
        )}

        <div className="mt-6 border-t border-plum-100 pt-5 text-center">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="text-sm font-medium text-plum-700 hover:underline"
          >
            {t("auth.continueGuest")}
          </button>
          <p className="mt-2 text-xs text-muted">{t("auth.guestNotice")}</p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginInner />
    </Suspense>
  );
}
