"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { PROMPTS } from "@/lib/content/prompts";
import { CATEGORIES, categoryName } from "@/lib/content/categories";
import { PromptCard } from "@/components/library/PromptCard";
import { KomandaGuide } from "@/components/library/KomandaGuide";
import { SectionHeading } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/misc";
import { Icon } from "@/components/ui/Icon";
import { favorites } from "@/lib/local";
import { cn } from "@/lib/utils";

function LibraryInner() {
  const { t, lang, loc } = useI18n();
  const params = useSearchParams();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("all");
  const [onlyFav, setOnlyFav] = useState(false);
  const [favSet, setFavSet] = useState<string[]>([]);

  useEffect(() => {
    const c = params.get("cat");
    if (c) setCat(c);
  }, [params]);

  useEffect(() => {
    const update = () => setFavSet(favorites.list());
    update();
    window.addEventListener("vasha:storage", update);
    return () => window.removeEventListener("vasha:storage", update);
  }, []);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return PROMPTS.filter((p) => {
      if (cat !== "all" && p.category !== cat) return false;
      if (onlyFav && !favSet.includes(p.id)) return false;
      if (!needle) return true;
      const hay = [loc(p.title), loc(p.description), loc(p.body), categoryName(p.category, loc)]
        .join(" ")
        .toLowerCase();
      return hay.includes(needle);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, cat, onlyFav, favSet, lang]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <SectionHeading title={t("library.title")} subtitle={t("library.subtitle")} />

      <div className="mt-6">
        <KomandaGuide />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Icon
            name="Search"
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            aria-hidden="true"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={t("library.searchPlaceholder")}
            className="w-full rounded-full border border-plum-200 bg-white py-2.5 pl-9 pr-4 text-sm outline-none focus:border-plum-400 focus:ring-2 focus:ring-plum-200"
          />
        </div>
        <button
          type="button"
          onClick={() => setOnlyFav((v) => !v)}
          className={cn(
            "inline-flex shrink-0 items-center justify-center gap-1.5 rounded-full border px-3 py-2 text-sm transition-colors",
            onlyFav
              ? "border-rose-400 bg-rose-50 text-rose-600"
              : "border-plum-200 text-muted hover:bg-plum-50",
          )}
        >
          <Icon name="Heart" className="h-4 w-4" aria-hidden="true" />
          {onlyFav ? t("library.showAll") : t("library.onlyFavorites")}
        </button>
      </div>

      {/* Category filter — horizontally scrollable on mobile, wraps on desktop */}
      <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        <button
          type="button"
          onClick={() => setCat("all")}
          className={cn(
            "shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors",
            cat === "all"
              ? "bg-plum-500 text-white"
              : "border border-plum-200 bg-white text-plum-700 hover:bg-plum-50",
          )}
        >
          {t("common.all")}
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCat(c.id)}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-full px-3 py-1.5 text-sm transition-colors",
              cat === c.id
                ? "bg-plum-500 text-white"
                : "border border-plum-200 bg-white text-plum-700 hover:bg-plum-50",
            )}
          >
            {loc(c.name)}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-muted">{t("library.resultsCount", { n: filtered.length })}</p>

      {filtered.length ? (
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PromptCard key={p.id} prompt={p} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <EmptyState icon="Search" title={t("library.noResults")} />
        </div>
      )}
    </div>
  );
}

export default function LibraryPage() {
  return (
    <Suspense fallback={null}>
      <LibraryInner />
    </Suspense>
  );
}
