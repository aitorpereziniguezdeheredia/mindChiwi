"use client";

import { useActionState } from "react";
import type { PacienteFormState } from "@/back/actions/pacientes";
import { FormField, inputStyles } from "@/front/components/ui/FormField";
import { Button } from "@/front/components/ui/Button";

type PacienteFormProps = {
  action: (prevState: PacienteFormState, formData: FormData) => Promise<PacienteFormState>;
  defaultValues?: {
    nombre: string;
    apellidos: string;
    fechaNacimiento: string;
    notas: string | null;
  };
  submitLabel?: string;
};

export function PacienteForm({ action, defaultValues, submitLabel = "Guardar" }: PacienteFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction}>
      <FormField label="Nombre" htmlFor="nombre" error={state?.error?.nombre?.[0]}>
        <input id="nombre" name="nombre" defaultValue={defaultValues?.nombre} required className={inputStyles} />
      </FormField>
      <FormField label="Apellidos" htmlFor="apellidos" error={state?.error?.apellidos?.[0]}>
        <input id="apellidos" name="apellidos" defaultValue={defaultValues?.apellidos} required className={inputStyles} />
      </FormField>
      <FormField label="Fecha de nacimiento" htmlFor="fechaNacimiento" error={state?.error?.fechaNacimiento?.[0]}>
        <input
          id="fechaNacimiento"
          name="fechaNacimiento"
          type="date"
          defaultValue={defaultValues?.fechaNacimiento}
          required
          className={inputStyles}
        />
      </FormField>
      <FormField label="Notas" htmlFor="notas">
        <textarea id="notas" name="notas" defaultValue={defaultValues?.notas ?? ""} className={inputStyles} rows={3} />
      </FormField>
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Guardando..." : submitLabel}
      </Button>
    </form>
  );
}