type DayChipProps = {
  variant: "pine" | "clay";
  children: React.ReactNode;
};

export function DayChip({ variant, children }: DayChipProps) {
  const styles =
    variant === "pine"
      ? "bg-[var(--pine-light)] text-[var(--pine)]"
      : "bg-[color-mix(in_srgb,var(--clay)_18%,transparent)] text-[var(--clay)]";

  return <div className={`text-xs rounded-lg px-2 py-1.5 mb-1.5 leading-snug ${styles}`}>{children}</div>;
}