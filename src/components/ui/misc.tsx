import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

export function Spinner({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)} aria-hidden="true">
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-plum-400 [animation-delay:-0.3s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-plum-400 [animation-delay:-0.15s]" />
      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-plum-400" />
    </span>
  );
}

export function IconCircle({
  name,
  className,
  iconClass,
}: {
  name: string;
  className?: string;
  iconClass?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-plum-50 text-plum-500",
        className,
      )}
    >
      <Icon name={name} className={cn("h-5 w-5", iconClass)} aria-hidden="true" />
    </span>
  );
}

export function Pill({
  children,
  tone = "plum",
  className,
}: {
  children: React.ReactNode;
  tone?: "plum" | "gold" | "muted";
  className?: string;
}) {
  const tones = {
    plum: "bg-plum-50 text-plum-700",
    gold: "bg-gold-100 text-gold-800",
    muted: "bg-black/5 text-muted",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function DemoBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gold-100 px-2.5 py-1 text-xs font-medium text-gold-800">
      <Icon name="Sparkles" className="h-3 w-3" aria-hidden="true" />
      {label}
    </span>
  );
}

export function EmptyState({
  icon = "Sparkles",
  title,
  body,
  children,
}: {
  icon?: string;
  title: string;
  body?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-plum-200 bg-white/60 px-6 py-12 text-center">
      <IconCircle name={icon} className="h-14 w-14 rounded-3xl" iconClass="h-6 w-6" />
      <h3 className="mt-4 text-lg font-semibold text-plum-700">{title}</h3>
      {body ? <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-muted">{body}</p> : null}
      {children ? <div className="mt-5">{children}</div> : null}
    </div>
  );
}
