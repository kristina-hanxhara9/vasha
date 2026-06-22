import { cn } from "@/lib/utils";

type Variant = "primary" | "gold" | "secondary" | "ghost" | "rose";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-ivory disabled:cursor-not-allowed disabled:opacity-60";

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "px-5 py-2.5",
  lg: "text-base px-7 py-3.5",
};

const variants: Record<Variant, string> = {
  primary: "bg-plum-500 text-white hover:bg-plum-600 focus-visible:ring-plum-300",
  gold: "bg-gold-500 text-plum-900 hover:bg-gold-400 focus-visible:ring-gold-300",
  secondary:
    "bg-white text-plum-700 border border-plum-200 hover:bg-plum-50 focus-visible:ring-plum-200",
  ghost: "text-plum-700 hover:bg-plum-50 focus-visible:ring-plum-200",
  rose: "bg-rose-500 text-white hover:bg-rose-600 focus-visible:ring-rose-300",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", fullWidth = false) {
  return cn(base, sizes[size], variants[variant], fullWidth && "w-full");
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return <button className={cn(buttonClasses(variant, size, fullWidth), className)} {...props} />;
}
