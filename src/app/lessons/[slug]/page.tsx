"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { fetchLessons } from "@/lib/lessonsDb";
import { progress } from "@/lib/local";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { Lesson } from "@/lib/types";

export default function LessonPage({ params }: { params: { slug: string } }) {
  const { t, loc } = useI18n();
  const [lesson, setLesson] = useState<Lesson | null | undefined>(undefined);
  const [idx, setIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetchLessons()
      .then((all) => {
        const i = all.findIndex((l) => l.slug === params.slug);
        if (i >= 0) {
          setLesson(all[i]);
          setIdx(i);
          setDone(progress.isDone("lessons", all[i].id));
        } else {
          setLesson(null);
        }
      })
      .catch(() => setLesson(null));
  }, [params.slug]);

  if (lesson === undefined) {
    return <div className="mx-auto max-w-2xl px-4 py-16 text-center text-muted">{t("common.loading")}</div>;
  }
  if (lesson === null) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-muted">404</p>
        <Link href="/lessons" className={cn(buttonClasses("secondary"), "mt-4")}>
          {t("nav.lessons")}
        </Link>
      </div>
    );
  }

  const taskHref = lesson.task.scenarioId
    ? `/sandbox?s=${lesson.task.scenarioId}`
    : `/sandbox?q=${encodeURIComponent(loc(lesson.task.prompt))}`;

  return (
    <article className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Link
        href="/lessons"
        className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-plum-700"
      >
        <Icon name="ChevronRight" className="h-4 w-4 rotate-180" aria-hidden="true" /> {t("nav.lessons")}
      </Link>

      <div className="mt-3 flex items-start gap-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-plum-50 text-plum-500">
          <Icon name={lesson.icon} className="h-6 w-6" aria-hidden="true" />
        </span>
        <div>
          <p className="text-xs text-muted">
            {t("lessons.lessonOf", { n: idx + 1 })} · {t("lessons.minutesShort", { n: lesson.minutes })}
          </p>
          <h1 className="font-display text-2xl font-semibold text-plum-700">{loc(lesson.title)}</h1>
        </div>
      </div>

      <p className="mt-3 leading-relaxed text-charcoal/80">{loc(lesson.summary)}</p>

      <div className="mt-6 space-y-6">
        {lesson.sections.map((s, i) => (
          <section key={i}>
            <h2 className="font-display text-lg font-semibold text-plum-700">{loc(s.heading)}</h2>
            <p className="mt-1.5 leading-relaxed text-charcoal/85">{loc(s.body)}</p>
          </section>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-gold-200 bg-gold-50 p-5">
        <div className="flex items-center gap-2 text-gold-800">
          <Icon name="Sparkles" className="h-5 w-5" aria-hidden="true" />
          <h2 className="font-display text-lg font-semibold">{t("lessons.yourTask")}</h2>
        </div>
        <p className="mt-2 text-charcoal/85">{loc(lesson.task.prompt)}</p>
        <Link href={taskHref} className={cn(buttonClasses("primary"), "mt-4")}>
          <Icon name="Sparkles" className="h-4 w-4" aria-hidden="true" /> {t("lessons.doInSandbox")}
        </Link>
      </div>

      <div className="mt-6">
        {done ? (
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-plum-600">
            <Icon name="Check" className="h-4 w-4" aria-hidden="true" /> {t("lessons.completedMsg")}
          </span>
        ) : (
          <Button
            variant="secondary"
            onClick={() => {
              progress.setDone("lessons", lesson.id, true);
              setDone(true);
            }}
          >
            <Icon name="Check" className="h-4 w-4" aria-hidden="true" /> {t("lessons.markComplete")}
          </Button>
        )}
      </div>
    </article>
  );
}
