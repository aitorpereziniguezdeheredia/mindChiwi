"use client";

import { useActionState } from "react";
import type { PacienteFormState } from "@/back/actions/pacientes";

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
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" name="nombre" defaultValue={defaultValues?.nombre} required />
        {state?.error?.nombre && <p style={{ color: "red" }}>{state.error.nombre[0]}</p>}
      </div>
      <div>
        <label htmlFor="apellidos">Apellidos</label>
        <input id="apellidos" name="apellidos" defaultValue={defaultValues?.apellidos} required />
        {state?.error?.apellidos && <p style={{ color: "red" }}>{state.error.apellidos[0]}</p>}
      </div>
      <div>
        <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
        <input id="fechaNacimiento" name="fechaNacimiento" type="date" defaultValue={defaultValues?.fechaNacimiento} required />
        {state?.error?.fechaNacimiento && <p style={{ color: "red" }}>{state.error.fechaNacimiento[0]}</p>}
      </div>
      <div>
        <label htmlFor="notas">Notas</label>
        <textarea id="notas" name="notas" defaultValue={defaultValues?.notas ?? ""} />
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Guardando..." : submitLabel}
      </button>
    </form>
  );
}