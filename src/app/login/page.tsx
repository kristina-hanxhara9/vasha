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

function mapError(msg: string, sq: boolean): string {
  const m = msg.toLowerCase();
  if (m.includes("invalid login")) return sq ? "Email-i ose fjalëkalimi nuk është i saktë." : "Email or password is incorrect.";
  if (m.includes("not confirmed")) return sq ? "Konfirmo më parë email-in (kontrollo kutinë e email-it)." : "Confirm your email first (check your inbox).";
  if (m.includes("already registered") || m.includes("already exists")) return sq ? "Ky email është regjistruar tashmë — provo të hysh." : "This email is already registered — try logging in.";
  if (m.includes("password") && m.includes("6")) return sq ? "Fjalëkalimi duhet të ketë të paktën 6 shkronja." : "Password must be at least 6 characters.";
  return msg;
}

function LoginInner() {
  const { t, loc, lang } = useI18n();
  const params = useSearchParams();
  const router = useRouter();
  const next = params.get("next") || "/account";
  const [mode, setMode] = useState<"signup" | "login">(params.get("mode") === "login" ? "login" : "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) return;
    setLoading(true);
    setError("");
    try {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      if (mode === "signup") {
        const { data, error: err } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: country ? { country } : undefined,
            emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
          },
        });
        if (err) setError(mapError(err.message, lang === "sq"));
        else if (data.session) window.location.href = next;
        else setSent(true);
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (err) setError(mapError(err.message, lang === "sq"));
        else window.location.href = next;
      }
    } catch {
      setError(t("sandbox.errorGeneric"));
    } finally {
      setLoading(false);
    }
  };

  const tab = (value: "signup" | "login", label: string) => (
    <button
      type="button"
      onClick={() => {
        setMode(value);
        setError("");
        setSent(false);
      }}
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
              <p>
                {loc({
                  sq: "Të dërguam një email për të konfirmuar llogarinë. Hape, pastaj hyr me fjalëkalimin tënd.",
                  en: "We sent you an email to confirm your account. Open it, then log in with your password.",
                })}
              </p>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-5 space-y-3">
              <div>
                <label className="mb-1 block text-sm font-medium text-charcoal">{t("auth.email")}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t("auth.emailPlaceholder")}
                  className={inputCls}
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-charcoal">
                  {loc({ sq: "Fjalëkalimi", en: "Password" })}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputCls}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  minLength={6}
                />
                {mode === "signup" ? (
                  <p className="mt-1 text-xs text-muted">
                    {loc({ sq: "Të paktën 6 shkronja.", en: "At least 6 characters." })}
                  </p>
                ) : null}
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
                {mode === "signup" ? loc({ sq: "Regjistrohu falas", en: "Sign up free" }) : loc({ sq: "Hyr", en: "Log in" })}
              </Button>
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
