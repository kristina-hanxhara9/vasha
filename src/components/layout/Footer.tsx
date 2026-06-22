"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-plum-100 bg-ivory">
      <div className="mx-auto max-w-6xl px-4 pb-28 pt-10 sm:px-6 lg:pb-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <Logo />
            <p className="mt-2 max-w-xs text-sm text-muted">{t("footer.madeWith")}</p>
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/privacy" className="text-charcoal/70 hover:text-plum-700">
              {t("footer.privacy")}
            </Link>
            <Link href="/lessons" className="text-charcoal/70 hover:text-plum-700">
              {t("nav.lessons")}
            </Link>
            <Link href="/community" className="text-charcoal/70 hover:text-plum-700">
              {t("nav.community")}
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-xs text-muted">
          © {year} VASHA · {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
