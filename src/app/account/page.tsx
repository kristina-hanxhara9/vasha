"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import { LanguageToggle } from "@/components/layout/LanguageToggle";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Card";
import { saved as savedStore, type SavedOutput } from "@/lib/local";
import { copyText } from "@/lib/clipboard";
import { isSupabaseConfigured } from "@/lib/supabase/config";

const COUNTRIES = ["Shqipëri", "Kosovë", "Itali", "Gjermani", "Zvicër", "Mbretëri e Bashkuar", "SHBA", "Tjetër"];

export default function AccountPage() {
  const { t, loc } = useI18n();
  const auth = useAuth();
  const [items, setItems] = useState<SavedOutput[]>([]);
  const [countryInput, setCountryInput] = useState("");

  useEffect(() => {
    const update = () => setItems(savedStore.list());
    update();
    window.addEventListener("vasha:storage", update);
    return () => window.removeEventListener("vasha:storage", update);
  }, []);

  useEffect(() => {
    setCountryInput(auth.country || "");
  }, [auth.country]);

  const initial = (auth.user?.name || auth.user?.email || "V").charAt(0).toUpperCase();

  const updateCountry = async (c: string) => {
    if (!isSupabaseConfigured) return;
    const { createClient } = await import("@/lib/supabase/client");
    const s = createClient();
    const {
      data: { user },
    } = await s.auth.getUser();
    if (user) {
      await s.from("profiles").update({ country: c || null }).eq("id", user.id);
      await auth.refresh();
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <SectionHeading title={t("account.title")} />

      <div className="vasha-card mt-6 p-6">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-plum-500 font-medium text-white">
            {initial}
          </span>
          <div className="min-w-0">
            <p className="truncate font-medium text-plum-700">
              {auth.user?.name || auth.user?.email || t("account.guest")}
            </p>
            {auth.user?.email ? <p className="truncate text-sm text-muted">{auth.user.email}</p> : null}
          </div>
          <span className="ml-auto rounded-full bg-plum-50 px-3 py-1 text-xs font-medium text-plum-700">
            {t("common.free")}
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-plum-50 p-3">
            <p className="text-xs text-muted">{t("account.runsToday")}</p>
            <p className="mt-0.5 font-display text-lg font-semibold text-plum-700">
              {auth.limit === null ? t("sandbox.unlimited") : `${auth.runsToday} / ${auth.limit}`}
            </p>
          </div>
          <div className="rounded-xl bg-plum-50 p-3">
            <p className="text-xs text-muted">{t("account.plan")}</p>
            <p className="mt-0.5 font-display text-lg font-semibold text-plum-700">{t("pricing.freeName")}</p>
          </div>
        </div>

        {auth.isAuthed ? (
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-plum-100 pt-4">
            <span className="text-sm text-muted">{loc({ sq: "Vendi yt", en: "Your country" })}</span>
            <input
              list="vasha-countries"
              value={countryInput}
              onChange={(e) => setCountryInput(e.target.value)}
              onBlur={() => {
                if (countryInput !== (auth.country || "")) updateCountry(countryInput);
              }}
              placeholder={loc({ sq: "Shkruaj ose zgjidh…", en: "Type or choose…" })}
              className="w-44 rounded-full border border-plum-200 bg-white px-3 py-1.5 text-sm outline-none focus:border-plum-400 focus:ring-2 focus:ring-plum-200"
            />
            <datalist id="vasha-countries">
              {COUNTRIES.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
          </div>
        ) : null}

        <div className="mt-5 flex items-center justify-between border-t border-plum-100 pt-4">
          <span className="text-sm text-muted">{t("account.languageLabel")}</span>
          <LanguageToggle />
        </div>

        {auth.isAdmin ? (
          <div className="mt-5 border-t border-plum-100 pt-4">
            <Link
              href="/admin/lessons"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-plum-700 hover:underline"
            >
              <Icon name="GraduationCap" className="h-4 w-4" aria-hidden="true" />
              {loc({ sq: "Menaxho mësimet (admin)", en: "Manage lessons (admin)" })}
            </Link>
          </div>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-plum-100 pt-4">
          {auth.isAuthed ? (
            <Button variant="ghost" size="sm" onClick={() => auth.signOut()}>
              <Icon name="LogOut" className="h-4 w-4" aria-hidden="true" />
              {t("account.signOut")}
            </Button>
          ) : (
            <p className="text-xs leading-relaxed text-muted">
              {t("account.guestUpgrade")}{" "}
              <Link href="/login" className="font-medium text-plum-700 underline">
                {t("common.signUp")}
              </Link>
            </p>
          )}
        </div>
      </div>

      <h2 className="mt-8 font-display text-lg font-semibold text-plum-700">{t("account.savedOutputs")}</h2>
      {items.length ? (
        <div className="mt-3 space-y-3">
          {items.map((it) => (
            <div key={it.id} className="vasha-card p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium text-plum-700">{it.title}</p>
                <button
                  type="button"
                  onClick={() => savedStore.remove(it.id)}
                  aria-label={t("common.close")}
                  className="text-muted transition-colors hover:text-plum-600"
                >
                  <Icon name="X" className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1 line-clamp-3 whitespace-pre-wrap text-sm text-charcoal/75">{it.content}</p>
              <button
                type="button"
                onClick={() => copyText(it.content)}
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-plum-600 hover:underline"
              >
                <Icon name="Copy" className="h-3.5 w-3.5" aria-hidden="true" /> {t("common.copy")}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted">{t("account.noSaved")}</p>
      )}
    </div>
  );
}
