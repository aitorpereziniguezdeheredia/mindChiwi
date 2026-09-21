"use client";

import { useActionState } from "react";
import type { SesionFormState } from "@/back/actions/sesiones";

type SesionFormProps = {
  action: (prevState: SesionFormState, formData: FormData) => Promise<SesionFormState>;
};

export function SesionForm({ action }: SesionFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="fecha">Fecha</label>
        <input id="fecha" name="fecha" type="date" required />
        {state?.error?.fecha && <p style={{ color: "red" }}>{state.error.fecha[0]}</p>}
      </div>
      <div>
        <label htmlFor="duracionMinutos">Duración (minutos)</label>
        <input id="duracionMinutos" name="duracionMinutos" type="number" required />
        {state?.error?.duracionMinutos && <p style={{ color: "red" }}>{state.error.duracionMinutos[0]}</p>}
      </div>
      <div>
        <label htmlFor="observaciones">Observaciones</label>
        <textarea id="observaciones" name="observaciones" />
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Guardando..." : "Añadir sesión"}
      </button>
    </form>
  );
}