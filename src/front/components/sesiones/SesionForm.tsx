"use client";

import { useActionState } from "react";
import type { SesionFormState } from "@/back/actions/sesiones";
import { FormField, inputStyles } from "@/front/components/ui/FormField";
import { Button } from "@/front/components/ui/Button";

type SesionFormProps = {
  action: (prevState: SesionFormState, formData: FormData) => Promise<SesionFormState>;
};

export function SesionForm({ action }: SesionFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="mb-6">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Fecha" htmlFor="fecha" error={state?.error?.fecha?.[0]}>
          <input id="fecha" name="fecha" type="date" required className={inputStyles} />
        </FormField>
        <FormField label="Duración (min)" htmlFor="duracionMinutos" error={state?.error?.duracionMinutos?.[0]}>
          <input id="duracionMinutos" name="duracionMinutos" type="number" required className={inputStyles} />
        </FormField>
      </div>
      <FormField label="Observaciones" htmlFor="observaciones">
        <textarea id="observaciones" name="observaciones" className={inputStyles} rows={2} />
      </FormField>
      <Button type="submit" disabled={isPending} variant="secondary">
        {isPending ? "Guardando..." : "Añadir sesión"}
      </Button>
    </form>
  );
}