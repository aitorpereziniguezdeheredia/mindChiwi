type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-2xl bg-[var(--panel)] border border-[var(--line)] p-5 ${className}`}>
      {children}
    </div>
  );
}