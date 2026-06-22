import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

export function Logo({ className, tagline = true }: { className?: string; tagline?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="VASHA"
      className={cn("inline-flex items-center gap-1.5 text-plum-700", className)}
    >
      <Icon name="Crown" className="h-5 w-5 shrink-0 text-gold-500" aria-hidden="true" />
      <span className="leading-none">
        <span className="block font-display text-xl font-semibold tracking-[0.12em]">VASHA</span>
        {tagline ? (
          <span className="mt-0.5 hidden text-[9px] font-medium uppercase tracking-[0.16em] text-muted sm:block">
            AI për gratë shqiptare
          </span>
        ) : null}
      </span>
    </Link>
  );
}
