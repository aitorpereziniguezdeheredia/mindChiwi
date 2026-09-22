import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "danger";

export const buttonBase =
  "rounded-lg px-5 py-2.5 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-block";

export const buttonStyles: Record<Variant, string> = {
  primary: "bg-[var(--pine)] text-[var(--panel)] hover:bg-[var(--pine-deep)]",
  secondary: "bg-transparent text-[var(--ink-soft)] border border-[var(--line)] hover:bg-[var(--panel)]",
  danger: "bg-transparent text-[var(--clay)] border border-[var(--clay)] hover:bg-[var(--clay)] hover:text-[var(--panel)]",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  return <button className={`${buttonBase} ${buttonStyles[variant]} ${className}`} {...props} />;
}