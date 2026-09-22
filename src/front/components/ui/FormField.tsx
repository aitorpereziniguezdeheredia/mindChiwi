export const inputStyles =
  "w-full rounded-lg border border-[var(--line)] bg-[var(--panel)] px-3 py-2 text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--pine)]";

type FormFieldProps = {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
};

export function FormField({ label, htmlFor, error, children }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={htmlFor} className="block text-sm font-medium text-[var(--ink-soft)] mb-1">
        {label}
      </label>
      {children}
      {error && <p className="mt-1 text-sm text-[var(--clay)]">{error}</p>}
    </div>
  );
}