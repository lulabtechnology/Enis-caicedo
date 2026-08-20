import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
};

export function Button({
  href,
  onClick,
  children,
  variant = "primary",
  className,
  type = "button"
}: Props) {
  const base =
    "premium-button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold no-underline transition duration-300 focus:outline-none focus:ring-2 focus:ring-brand-aqua/35";

  const styles: Record<string, string> = {
    primary:
      "premium-button-primary border border-brand-aqua/25 bg-brand-deep text-white shadow-glow hover:-translate-y-0.5",
    secondary:
      "premium-button-secondary border border-slate-200/90 bg-white/92 text-brand-ink shadow-soft hover:-translate-y-0.5 hover:border-brand-aqua/40",
    ghost:
      "border border-transparent bg-transparent text-brand-ink hover:border-brand-aqua/20 hover:bg-white/70"
  };

  const cls = cn(base, styles[variant], className);

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={cls}>
      {children}
    </button>
  );
}
