"use client";

import { useI18n } from "@/lib/i18n/LanguageProvider";
import type { Localized } from "@/lib/types";

const PARTS: { n: string; title: Localized; body: Localized; ex: Localized }[] = [
  {
    n: "01",
    title: { sq: "Roli", en: "Role" },
    body: { sq: "Kush të ndihmon.", en: "Who is helping you." },
    ex: { sq: "Sillu si një këshilltare karriere.", en: "Act as a career advisor." },
  },
  {
    n: "02",
    title: { sq: "Konteksti", en: "Context" },
    body: { sq: "Situata jote, me detaje.", en: "Your situation, with details." },
    ex: { sq: "Kam dy fëmijë dhe pak kohë.", en: "I have two kids and little time." },
  },
  {
    n: "03",
    title: { sq: "Detyra", en: "Task" },
    body: { sq: "Çfarë do saktësisht.", en: "What you want, exactly." },
    ex: { sq: "Shkruaj një CV për mua.", en: "Write a CV for me." },
  },
  {
    n: "04",
    title: { sq: "Formati", en: "Format" },
    body: { sq: "Si e do përgjigjen.", en: "How you want the answer." },
    ex: { sq: "E shkurtër, me pika, në shqip.", en: "Short, in bullet points, in Albanian." },
  },
];

/** A short, besa-style lesson on the anatomy of a good command. */
export function KomandaGuide() {
  const { loc } = useI18n();
  return (
    <section className="rounded-[2rem] border border-rose-100 bg-gradient-to-b from-rose-50 to-white p-6 sm:p-8">
      <h2 className="font-display text-2xl font-semibold text-plum-700 sm:text-3xl">
        {loc({ sq: "Si ndërtohet një komandë e mirë", en: "How a good command is built" })}
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-charcoal/75 sm:text-base">
        {loc({
          sq: "Çdo komandë më poshtë e ke gati gjysmë të bërë. Truku është t'i japësh detajet e tua — pjesët në [kllapa]. Sa më shumë i tregon AI-së, aq më e mirë del përgjigjja. AI mëson nga ti, jo anasjelltas.",
          en: "Every command below is half-made for you. The trick is to add your details — the parts in [brackets]. The more you tell the AI, the better the answer. The AI learns from you, not the other way around.",
        })}
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {PARTS.map((p) => (
          <div key={p.n} className="rounded-2xl bg-white/70 p-4">
            <span className="font-display text-2xl font-semibold tabular-nums text-rose-400">{p.n}</span>
            <h3 className="mt-1 font-semibold text-plum-700">{loc(p.title)}</h3>
            <p className="mt-0.5 text-sm leading-relaxed text-muted">{loc(p.body)}</p>
            <p className="mt-2 font-serif text-sm italic text-plum-500">“{loc(p.ex)}”</p>
          </div>
        ))}
      </div>
    </section>
  );
}
