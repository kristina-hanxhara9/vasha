"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { SCENARIOS } from "@/lib/content/scenarios";
import { SectionHeading } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export default function ToolsPage() {
  const { loc } = useI18n();
  const tools = SCENARIOS.filter((s) => s.tool);

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <SectionHeading
        title={loc({ sq: "Mjetet e AI", en: "AI Tools" })}
        subtitle={loc({
          sq: "Mjete të fuqishme që lexojnë foto e dokumente dhe të japin ndihmë reale për vendin tënd.",
          en: "Powerful tools that read photos and documents and give real help for your country.",
        })}
      />
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {tools.map((s, i) => (
          <Reveal key={s.id} delay={i * 80}>
            <Link
              href={`/sandbox?s=${s.id}`}
              className="vasha-card group flex h-full items-start gap-3 p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-rose-100 text-rose-600 transition-transform duration-300 group-hover:scale-110">
                <Icon name={s.icon} className="h-6 w-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-semibold text-plum-700">{loc(s.title)}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{loc(s.description)}</span>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-rose-600">
                  {loc({ sq: "Provoje", en: "Try it" })}
                  <Icon name="ArrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
