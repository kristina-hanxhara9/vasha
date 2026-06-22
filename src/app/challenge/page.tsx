"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { CHALLENGE } from "@/lib/content/challenge";
import { progress } from "@/lib/local";
import { SectionHeading } from "@/components/ui/Card";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export default function ChallengePage() {
  const { t, loc } = useI18n();
  const [done, setDone] = useState<string[]>([]);
  const [focus, setFocus] = useState(1);

  useEffect(() => {
    const list = progress.done("challenge");
    setDone(list);
    const firstIncomplete = CHALLENGE.find((d) => !list.includes(String(d.day)))?.day ?? 30;
    setFocus(firstIncomplete);
  }, []);

  const isDone = (day: number) => done.includes(String(day));
  const doneCount = done.length;
  const allDone = doneCount >= 30;

  const streak = useMemo(() => {
    let s = 0;
    for (const d of CHALLENGE) {
      if (done.includes(String(d.day))) s++;
      else break;
    }
    return s;
  }, [done]);

  const focusDay = CHALLENGE.find((d) => d.day === focus) ?? CHALLENGE[0];
  const taskHref = focusDay.scenarioId
    ? `/sandbox?s=${focusDay.scenarioId}`
    : `/sandbox?q=${encodeURIComponent(loc(focusDay.task))}`;

  const toggle = (day: number) => {
    const next = progress.setDone("challenge", String(day), !isDone(day));
    setDone(next);
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <SectionHeading title={t("challenge.title")} subtitle={t("challenge.subtitle")} />

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1.5 text-sm font-medium text-gold-800">
          <Icon name="Flame" className="h-4 w-4" aria-hidden="true" />
          {streak > 0 ? t("challenge.streak", { n: streak }) : t("challenge.streakNone")}
        </span>
        <div className="min-w-[140px] flex-1">
          <div className="h-2 rounded-full bg-plum-100">
            <div
              className="h-2 rounded-full bg-plum-500 transition-all"
              style={{ width: `${Math.round((doneCount / 30) * 100)}%` }}
            />
          </div>
        </div>
        <span className="text-xs text-muted">{t("challenge.progress", { done: doneCount })}</span>
      </div>

      <div className="vasha-card mt-6 p-6">
        {allDone ? (
          <div className="text-center">
            <Icon name="Crown" className="mx-auto h-8 w-8 text-gold-500" aria-hidden="true" />
            <p className="mt-2 font-display text-lg font-semibold text-plum-700">
              {t("challenge.completedAll")}
            </p>
          </div>
        ) : (
          <>
            <p className="text-xs font-medium uppercase tracking-wide text-gold-600">
              {t("challenge.dayLabel", { n: focusDay.day })} · {t("challenge.todayTask")}
            </p>
            <h2 className="mt-1 font-display text-xl font-semibold text-plum-700">{loc(focusDay.title)}</h2>
            <p className="mt-2 text-charcoal/85">{loc(focusDay.task)}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href={taskHref} className={buttonClasses("primary", "sm")}>
                <Icon name="Sparkles" className="h-4 w-4" aria-hidden="true" /> {t("challenge.doInSandbox")}
              </Link>
              <Button
                variant={isDone(focusDay.day) ? "secondary" : "gold"}
                size="sm"
                onClick={() => toggle(focusDay.day)}
              >
                <Icon name="Check" className="h-4 w-4" aria-hidden="true" />
                {isDone(focusDay.day) ? t("challenge.done") : t("challenge.markDone")}
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted">{t("challenge.encouragement")}</p>
          </>
        )}
      </div>

      <div className="mt-6 grid grid-cols-5 gap-2 sm:grid-cols-6">
        {CHALLENGE.map((d) => {
          const dDone = isDone(d.day);
          const active = d.day === focus;
          return (
            <button
              key={d.day}
              type="button"
              onClick={() => setFocus(d.day)}
              aria-label={t("challenge.dayLabel", { n: d.day })}
              className={cn(
                "flex aspect-square items-center justify-center rounded-xl border text-sm font-medium transition-colors",
                dDone
                  ? "border-plum-500 bg-plum-500 text-white"
                  : active
                    ? "border-plum-400 bg-plum-50 text-plum-700"
                    : "border-plum-100 bg-white text-plum-600 hover:bg-plum-50",
              )}
            >
              {dDone ? <Icon name="Check" className="h-4 w-4" aria-hidden="true" /> : d.day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
