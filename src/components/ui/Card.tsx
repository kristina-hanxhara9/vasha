import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("vasha-card p-5 sm:p-6", className)}>{children}</div>;
}

export function SectionHeading({
  title,
  subtitle,
  center = false,
  className,
}: {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center && "mx-auto max-w-2xl text-center", className)}>
      <h1 className="text-balance text-2xl font-semibold text-plum-700 sm:text-3xl">{title}</h1>
      {subtitle ? (
        <p className="mt-2 text-balance text-[15px] leading-relaxed text-muted sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
