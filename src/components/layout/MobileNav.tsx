"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const ITEMS = [
  { key: "sandbox", href: "/sandbox", icon: "Sparkles" },
  { key: "library", href: "/library", icon: "BookMarked" },
  { key: "lessons", href: "/lessons", icon: "GraduationCap" },
  { key: "challenge", href: "/challenge", icon: "Flame" },
  { key: "community", href: "/community", icon: "Users" },
];

export function MobileNav() {
  const { t } = useI18n();
  const pathname = usePathname();

  return (
    <nav className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-plum-100 bg-white/95 backdrop-blur lg:hidden">
      <ul className="mx-auto grid max-w-md grid-cols-5">
        {ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <li key={item.key}>
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium transition-colors",
                  active ? "text-plum-600" : "text-muted",
                )}
              >
                <Icon name={item.icon} className="h-5 w-5" aria-hidden="true" />
                {t(`nav.${item.key}`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
