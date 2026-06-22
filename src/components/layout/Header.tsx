"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { LanguageToggle } from "./LanguageToggle";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { useAuth } from "@/components/auth/AuthProvider";
import { buttonClasses } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const NAV = [
  { key: "sandbox", href: "/sandbox" },
  { key: "tools", href: "/tools" },
  { key: "library", href: "/library" },
  { key: "lessons", href: "/lessons" },
  { key: "community", href: "/community" },
  { key: "challenge", href: "/challenge" },
];

export function Header() {
  const { t } = useI18n();
  const { ready, isAuthed, user, tier } = useAuth();
  const pathname = usePathname();
  const initial = (user?.name || user?.email || "V").trim().charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-plum-100 bg-ivory/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-6">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-plum-100 text-plum-700"
                      : "text-charcoal/70 hover:bg-plum-50 hover:text-plum-700",
                  )}
                >
                  {t(`nav.${item.key}`)}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageToggle />
          {ready && isAuthed ? (
            <Link href="/account" className="flex items-center gap-2" aria-label={t("common.account")}>
              {tier === "premium" ? (
                <span className="hidden items-center gap-1 rounded-full bg-gold-100 px-2 py-1 text-xs font-medium text-gold-800 sm:inline-flex">
                  <Icon name="Crown" className="h-3 w-3" aria-hidden="true" />
                  {t("common.premium")}
                </span>
              ) : null}
              <span className="grid h-9 w-9 place-items-center rounded-full bg-plum-500 text-sm font-medium text-white">
                {initial}
              </span>
            </Link>
          ) : (
            <>
              <Link
                href="/login?mode=login"
                className="hidden text-sm font-medium text-plum-700 hover:underline sm:inline"
              >
                {t("common.signIn")}
              </Link>
              <Link
                href="/sandbox"
                className={cn(buttonClasses("rose", "sm"), "hidden sm:inline-flex")}
              >
                {t("common.getStarted")}
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
