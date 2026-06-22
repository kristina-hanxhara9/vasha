import Link from "next/link";
import { WomanMark } from "./WomanMark";
import { cn } from "@/lib/utils";

export function Logo({ className, tagline = true }: { className?: string; tagline?: boolean }) {
  return (
    <Link
      href="/"
      aria-label="VASHA"
      className={cn("inline-flex items-center gap-2 text-plum-700", className)}
    >
      <WomanMark className="h-7 w-7 shrink-0" />
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
