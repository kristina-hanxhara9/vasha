"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import {
  fetchLessons,
  upsertLesson,
  deleteLesson,
  importStarterLessons,
} from "@/lib/lessonsDb";
import { SectionHeading } from "@/components/ui/Card";
import { Button, buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { Lesson } from "@/lib/types";

const inputCls =
  "w-full rounded-xl border border-plum-200 bg-white px-3 py-2 text-sm outline-none focus:border-plum-400 focus:ring-2 focus:ring-plum-200";

const BLANK = {
  id: "",
  slug: "",
  icon: "BookOpen",
  minutes: "5",
  titleSq: "",
  titleEn: "",
  summarySq: "",
  summaryEn: "",
  sections: "[\n  { \"heading\": { \"sq\": \"\", \"en\": \"\" }, \"body\": { \"sq\": \"\", \"en\": \"\" } }\n]",
  taskSq: "",
  taskEn: "",
  scenarioId: "",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-charcoal">{label}</span>
      {children}
    </label>
  );
}

export default function AdminLessonsPage() {
  const { loc } = useI18n();
  const auth = useAuth();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [form, setForm] = useState({ ...BLANK });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const reload = () => fetchLessons().then(setLessons).catch(() => {});
  useEffect(() => {
    reload();
  }, []);

  const set = (k: keyof typeof BLANK, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const edit = (l: Lesson) => {
    setError("");
    setForm({
      id: l.id,
      slug: l.slug,
      icon: l.icon,
      minutes: String(l.minutes),
      titleSq: l.title.sq,
      titleEn: l.title.en,
      summarySq: l.summary.sq,
      summaryEn: l.summary.en,
      sections: JSON.stringify(l.sections, null, 2),
      taskSq: l.task.prompt.sq,
      taskEn: l.task.prompt.en,
      scenarioId: l.task.scenarioId || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const save = async () => {
    setError("");
    if (!form.id.trim() || !form.slug.trim()) {
      setError(loc({ sq: "Plotëso id-në dhe slug-un.", en: "Fill in id and slug." }));
      return;
    }
    let sections: Lesson["sections"];
    try {
      sections = JSON.parse(form.sections);
      if (!Array.isArray(sections)) throw new Error("not array");
    } catch {
      setError(loc({ sq: "Seksionet nuk janë JSON i vlefshëm.", en: "Sections is not valid JSON." }));
      return;
    }
    const lesson: Lesson = {
      id: form.id.trim(),
      slug: form.slug.trim(),
      icon: form.icon || "BookOpen",
      minutes: Number(form.minutes) || 5,
      title: { sq: form.titleSq, en: form.titleEn },
      summary: { sq: form.summarySq, en: form.summaryEn },
      sections,
      task: {
        prompt: { sq: form.taskSq, en: form.taskEn },
        ...(form.scenarioId.trim() ? { scenarioId: form.scenarioId.trim() } : {}),
      },
    };
    setBusy(true);
    const ok = await upsertLesson(lesson, lessons.length);
    setBusy(false);
    if (ok) {
      setForm({ ...BLANK });
      reload();
    } else {
      setError(loc({ sq: "Ruajtja dështoi (a je admin?).", en: "Save failed (are you an admin?)." }));
    }
  };

  const remove = async (id: string) => {
    await deleteLesson(id);
    reload();
  };

  const importStarter = async () => {
    setBusy(true);
    await importStarterLessons();
    setBusy(false);
    reload();
  };

  if (!auth.ready) {
    return <div className="mx-auto max-w-2xl px-4 py-16 text-center text-muted">…</div>;
  }
  if (!auth.isAdmin) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <Icon name="Lock" className="mx-auto h-8 w-8 text-plum-400" aria-hidden="true" />
        <h1 className="mt-3 font-display text-xl font-semibold text-plum-700">
          {loc({ sq: "Vetëm për administratore", en: "Admins only" })}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {loc({
            sq: "Kjo faqe është për të menaxhuar mësimet. Kërko të bëhesh admin.",
            en: "This page manages lessons. Ask to be made an admin.",
          })}
        </p>
        <Link href="/lessons" className={cn(buttonClasses("secondary"), "mt-5")}>
          {loc({ sq: "Kthehu te mësimet", en: "Back to lessons" })}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <SectionHeading
        title={loc({ sq: "Menaxho mësimet", en: "Manage lessons" })}
        subtitle={loc({ sq: "Shto, ndrysho ose fshi mësime. Ndryshimet shfaqen menjëherë.", en: "Add, edit or delete lessons. Changes show immediately." })}
      />

      <div className="vasha-card mt-6 p-5">
        <h2 className="font-display text-lg font-semibold text-plum-700">
          {form.id ? loc({ sq: "Ndrysho mësimin", en: "Edit lesson" }) : loc({ sq: "Mësim i ri", en: "New lesson" })}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field label="id">
            <input className={inputCls} value={form.id} onChange={(e) => set("id", e.target.value)} placeholder="cfare-eshte-ai" />
          </Field>
          <Field label="slug (URL)">
            <input className={inputCls} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="cfare-eshte-ai" />
          </Field>
          <Field label={loc({ sq: "Ikona (Tabler/lucide)", en: "Icon (lucide name)" })}>
            <input className={inputCls} value={form.icon} onChange={(e) => set("icon", e.target.value)} placeholder="BookOpen" />
          </Field>
          <Field label={loc({ sq: "Minuta", en: "Minutes" })}>
            <input className={inputCls} type="number" value={form.minutes} onChange={(e) => set("minutes", e.target.value)} />
          </Field>
          <Field label="Titulli (shqip)">
            <input className={inputCls} value={form.titleSq} onChange={(e) => set("titleSq", e.target.value)} />
          </Field>
          <Field label="Title (English)">
            <input className={inputCls} value={form.titleEn} onChange={(e) => set("titleEn", e.target.value)} />
          </Field>
          <Field label="Përmbledhja (shqip)">
            <input className={inputCls} value={form.summarySq} onChange={(e) => set("summarySq", e.target.value)} />
          </Field>
          <Field label="Summary (English)">
            <input className={inputCls} value={form.summaryEn} onChange={(e) => set("summaryEn", e.target.value)} />
          </Field>
        </div>

        <div className="mt-3">
          <Field label={loc({ sq: "Seksionet (JSON: [{ heading:{sq,en}, body:{sq,en} }])", en: "Sections (JSON)" })}>
            <textarea
              className={cn(inputCls, "font-mono text-xs")}
              rows={6}
              value={form.sections}
              onChange={(e) => set("sections", e.target.value)}
            />
          </Field>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <Field label="Detyra (shqip)">
            <input className={inputCls} value={form.taskSq} onChange={(e) => set("taskSq", e.target.value)} />
          </Field>
          <Field label="Task (English)">
            <input className={inputCls} value={form.taskEn} onChange={(e) => set("taskEn", e.target.value)} />
          </Field>
          <Field label={loc({ sq: "Skenari i detyrës (opsionale: cv, business…)", en: "Task scenario (optional)" })}>
            <input className={inputCls} value={form.scenarioId} onChange={(e) => set("scenarioId", e.target.value)} placeholder="cv" />
          </Field>
        </div>

        {error ? <p className="mt-3 text-sm text-red-700">{error}</p> : null}

        <div className="mt-4 flex flex-wrap gap-2">
          <Button onClick={save} disabled={busy}>
            <Icon name="Check" className="h-4 w-4" aria-hidden="true" />
            {loc({ sq: "Ruaj mësimin", en: "Save lesson" })}
          </Button>
          {form.id ? (
            <Button variant="ghost" onClick={() => setForm({ ...BLANK })}>
              {loc({ sq: "Anulo", en: "Cancel" })}
            </Button>
          ) : null}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-plum-700">
          {loc({ sq: "Mësimet", en: "Lessons" })} ({lessons.length})
        </h2>
        <Button variant="secondary" size="sm" onClick={importStarter} disabled={busy}>
          <Icon name="Upload" className="h-4 w-4" aria-hidden="true" />
          {loc({ sq: "Importo mësimet fillestare", en: "Import starter lessons" })}
        </Button>
      </div>

      <div className="mt-3 space-y-2">
        {lessons.map((l) => (
          <div key={l.id} className="vasha-card flex items-center gap-3 p-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-plum-50 text-plum-500">
              <Icon name={l.icon} className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-plum-700">{loc(l.title)}</p>
              <p className="truncate text-xs text-muted">/{l.slug}</p>
            </div>
            <button type="button" onClick={() => edit(l)} className="text-xs text-plum-600 hover:underline">
              {loc({ sq: "Ndrysho", en: "Edit" })}
            </button>
            <button type="button" onClick={() => remove(l.id)} className="text-muted hover:text-red-600" aria-label="delete">
              <Icon name="Trash" className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
