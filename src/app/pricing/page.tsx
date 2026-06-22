"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { SectionHeading } from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export default function PricingPage() {
  const { loc } = useI18n();

  const perks = [
    { sq: "Praktikë e pakufizuar me AI", en: "Unlimited AI practice" },
    { sq: "E gjithë biblioteka e ideve", en: "The whole idea library" },
    { sq: "Të gjitha mësimet dhe sfida 30-ditëshe", en: "All lessons and the 30-day challenge" },
    { sq: "I gjithë komuniteti", en: "The whole community" },
    { sq: "Mjetet: dokumente, stil, ndihmë lokale", en: "The tools: documents, style, local help" },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <SectionHeading
        center
        title={loc({ sq: "Gjithçka është falas 💜", en: "Everything is free 💜" })}
        subtitle={loc({
          sq: "VASHA është plotësisht falas tani. Pa pagesa, pa kufij — vetëm ti dhe rritja jote.",
          en: "VASHA is completely free right now. No payments, no limits — just you and your growth.",
        })}
      />
      <div className="mx-auto mt-8 max-w-md rounded-2xl border-2 border-rose-300 bg-white p-6 shadow-card">
        <ul className="space-y-3">
          {perks.map((p, i) => (
            <li key={i} className="flex gap-2 text-sm text-charcoal/85">
              <Icon name="Heart" className="mt-0.5 h-4 w-4 shrink-0 text-rose-500" aria-hidden="true" />
              {loc(p)}
            </li>
          ))}
        </ul>
        <Link href="/sandbox" className={cn(buttonClasses("rose"), "mt-6 w-full")}>
          {loc({ sq: "Fillo tani — falas", en: "Start now — free" })}
          <Icon name="ArrowRight" className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}
