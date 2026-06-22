"use client";

import { useI18n } from "@/lib/i18n/LanguageProvider";
import { SCENARIOS } from "@/lib/content/scenarios";
import { Icon } from "@/components/ui/Icon";
import type { Localized } from "@/lib/types";

const FREE: { title: Localized; desc: Localized } = {
  title: { sq: "Diçka tjetër — kërkesë e lirë", en: "Something else — free request" },
  desc: { sq: "Shkruaj çfarëdo që të duhet me fjalët e tua.", en: "Write whatever you need, in your own words." },
};

export function ScenarioPicker({ onPick }: { onPick: (id: string) => void }) {
  const { t, loc } = useI18n();

  return (
    <div>
      <h2 className="font-display text-xl font-semibold text-plum-700">{t("sandbox.pickScenario")}</h2>
      <p className="mt-1 text-sm text-muted">{t("sandbox.languageHint")}</p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onPick(s.id)}
            className="group flex items-start gap-3 rounded-2xl border border-plum-100 bg-white p-4 text-left transition-colors hover:border-plum-300 hover:bg-plum-50"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-plum-50 text-plum-500 transition-colors group-hover:bg-white">
              <Icon name={s.icon} className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="flex items-center gap-2 font-medium text-plum-700">
                {loc(s.title)}
                {s.tool ? (
                  <span className="rounded-full bg-gold-100 px-1.5 py-0.5 text-[10px] font-medium text-gold-800">
                    {loc({ sq: "Mjet", en: "Tool" })}
                  </span>
                ) : null}
              </span>
              <span className="mt-0.5 block text-sm leading-snug text-muted">{loc(s.description)}</span>
            </span>
          </button>
        ))}
        <button
          type="button"
          onClick={() => onPick("free")}
          className="group flex items-start gap-3 rounded-2xl border border-dashed border-plum-200 bg-white p-4 text-left transition-colors hover:border-plum-300 hover:bg-plum-50 sm:col-span-2"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-gold-100 text-gold-700">
            <Icon name="Wand2" className="h-5 w-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block font-medium text-plum-700">{loc(FREE.title)}</span>
            <span className="mt-0.5 block text-sm leading-snug text-muted">{loc(FREE.desc)}</span>
          </span>
        </button>
      </div>
    </div>
  );
}
