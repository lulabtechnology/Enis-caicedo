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
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-brand-aqua/40";
  const styles: Record<string, string> = {
    primary:
      "bg-brand-ink text-white hover:opacity-95 shadow-soft border border-brand-ink",
    secondary:
      "bg-white text-slate-900 border border-slate-200 hover:border-slate-300 shadow-soft",
    ghost: "bg-transparent text-slate-900 hover:bg-slate-50 border border-transparent"
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
