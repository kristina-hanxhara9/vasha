"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { fetchLessons } from "@/lib/lessonsDb";
import { progress } from "@/lib/local";
import { SectionHeading } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import type { Lesson } from "@/lib/types";

export default function LessonsPage() {
  const { t, loc } = useI18n();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    fetchLessons().then(setLessons).catch(() => {});
  }, []);

  useEffect(() => {
    const update = () => setDone(progress.done("lessons"));
    update();
    window.addEventListener("vasha:storage", update);
    return () => window.removeEventListener("vasha:storage", update);
  }, []);

  const total = lessons.length;
  const doneCount = done.length;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <SectionHeading title={t("lessons.title")} subtitle={t("lessons.subtitle")} />

      <div className="mt-5 flex items-center gap-3">
        <div className="h-2 flex-1 rounded-full bg-plum-100">
          <div
            className="h-2 rounded-full bg-plum-500 transition-all"
            style={{ width: `${total ? Math.round((doneCount / total) * 100) : 0}%` }}
          />
        </div>
        <span className="whitespace-nowrap text-xs text-muted">
          {t("lessons.progress", { done: doneCount, total })}
        </span>
      </div>

      <div className="mt-6 space-y-3">
        {lessons.map((l, i) => {
          const isDone = done.includes(l.id);
          return (
            <Link key={l.id} href={`/lessons/${l.slug}`} className="block">
              <div className="vasha-card flex items-center gap-4 p-4">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-plum-50 text-plum-500">
                  <Icon name={l.icon} className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className="text-xs text-muted">
                      {t("lessons.lessonOf", { n: i + 1 })} · {t("lessons.minutesShort", { n: l.minutes })}
                    </span>
                    {isDone ? (
                      <span className="inline-flex items-center gap-1 text-xs text-plum-600">
                        <Icon name="Check" className="h-3 w-3" aria-hidden="true" /> {t("lessons.completed")}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-0.5 truncate font-medium text-plum-700">{loc(l.title)}</h3>
                  <p className="line-clamp-1 text-sm text-muted">{loc(l.summary)}</p>
                </div>
                <Icon name="ChevronRight" className="h-5 w-5 shrink-0 text-plum-300" aria-hidden="true" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
