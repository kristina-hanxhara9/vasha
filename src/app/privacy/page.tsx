"use client";

import { useI18n } from "@/lib/i18n/LanguageProvider";
import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/Icon";

export default function PrivacyPage() {
  const { t } = useI18n();
  const points = ["p1", "p2", "p3", "p4"];

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-plum-50 text-plum-500">
          <Icon name="ShieldCheck" className="h-6 w-6" aria-hidden="true" />
        </span>
        <h1 className="font-display text-2xl font-semibold text-plum-700 sm:text-3xl">
          {t("privacy.title")}
        </h1>
      </div>
      <p className="mt-4 leading-relaxed text-charcoal/80">{t("privacy.intro")}</p>
      <Card className="mt-6">
        <ul className="space-y-4">
          {points.map((p) => (
            <li key={p} className="flex gap-3">
              <Icon name="Check" className="mt-1 h-4 w-4 shrink-0 text-gold-600" aria-hidden="true" />
              <span className="text-[15px] leading-relaxed text-charcoal/85">{t(`privacy.${p}`)}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
