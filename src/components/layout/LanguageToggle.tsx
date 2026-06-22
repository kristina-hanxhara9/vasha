"use client";

import { useI18n } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";
import type { Lang } from "@/lib/types";

export function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang, t } = useI18n();

  const option = (value: Lang, label: string) => (
    <button
      type="button"
      onClick={() => setLang(value)}
      aria-pressed={lang === value}
      className={cn(
        "rounded-full px-2.5 py-1 text-xs font-medium transition-colors",
        lang === value ? "bg-plum-500 text-white" : "text-plum-600 hover:bg-plum-100",
      )}
    >
      {label}
    </button>
  );

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-plum-200 bg-white p-0.5",
        className,
      )}
      role="group"
      aria-label={t("lang.label")}
    >
      {option("sq", t("lang.shqip"))}
      {option("en", t("lang.english"))}
    </div>
  );
}
