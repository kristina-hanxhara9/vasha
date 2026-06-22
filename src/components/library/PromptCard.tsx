"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { PromptItem } from "@/lib/types";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/Button";
import { favorites, ratings } from "@/lib/local";
import { copyText } from "@/lib/clipboard";
import { categoryName, categoryAccent } from "@/lib/content/categories";
import { cn } from "@/lib/utils";

function StarRating({ value, onRate }: { value: number; onRate: (n: number) => void }) {
  return (
    <div className="flex items-center gap-0.5" role="group" aria-label="Rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button key={n} type="button" onClick={() => onRate(n)} aria-label={`${n}`}>
          <Icon
            name="Star"
            className={cn("h-4 w-4", n <= value ? "fill-gold-400 text-gold-500" : "text-plum-200")}
          />
        </button>
      ))}
    </div>
  );
}

export function PromptCard({ prompt }: { prompt: PromptItem }) {
  const { t, loc } = useI18n();
  const [fav, setFav] = useState(false);
  const [rating, setRating] = useState(0);
  const [copied, setCopied] = useState(false);
  const accent = categoryAccent(prompt.category);

  useEffect(() => {
    setFav(favorites.has(prompt.id));
    setRating(ratings.get(prompt.id) ?? 0);
  }, [prompt.id]);

  const copy = async () => {
    await copyText(loc(prompt.body));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={cn("vasha-card flex flex-col p-5", prompt.featured && "ring-2 ring-gold-300")}>
      <div className="flex items-center justify-between">
        <span className={cn("grid h-10 w-10 place-items-center rounded-xl", accent.tile, accent.icon)}>
          <Icon name={prompt.icon} className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="flex items-center gap-1">
          {prompt.featured ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-gold-100 px-2 py-0.5 text-[11px] font-medium text-gold-800">
              <Icon name="Crown" className="h-3 w-3" aria-hidden="true" />
              {loc({ sq: "E zgjedhura", en: "Featured" })}
            </span>
          ) : null}
          <button
            type="button"
            onClick={() => setFav(favorites.toggle(prompt.id))}
            aria-label={t("library.favorite")}
            aria-pressed={fav}
            className={cn(
              "rounded-full p-2 transition-colors",
              fav ? "text-rose-500" : "text-plum-200 hover:text-rose-400",
            )}
          >
            <Icon name="Heart" className={cn("h-5 w-5", fav && "fill-rose-200")} />
          </button>
        </div>
      </div>

      <span
        className={cn(
          "mt-3 inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium",
          accent.tile,
          accent.icon,
        )}
      >
        {categoryName(prompt.category, loc)}
      </span>
      <h3 className="mt-2 font-medium text-plum-700">{loc(prompt.title)}</h3>
      <p className="mt-1 flex-1 text-sm leading-relaxed text-muted">{loc(prompt.description)}</p>

      <div className="mt-3">
        <StarRating
          value={rating}
          onRate={(n) => {
            ratings.set(prompt.id, n);
            setRating(n);
          }}
        />
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Link href={`/sandbox?p=${prompt.id}`} className={buttonClasses("primary", "sm")}>
          <Icon name="Sparkles" className="h-4 w-4" aria-hidden="true" />
          {t("library.runInSandbox")}
        </Link>
        <button type="button" onClick={copy} className={buttonClasses("secondary", "sm")}>
          <Icon name={copied ? "Check" : "Copy"} className="h-4 w-4" aria-hidden="true" />
          {copied ? t("common.copied") : t("common.copy")}
        </button>
      </div>
    </div>
  );
}
