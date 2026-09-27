"use client";

import { useActionState } from "react";
import { crearSesionDesdeCalendarioAction } from "@/back/actions/sesiones";
import { FormField, inputStyles } from "@/front/components/ui/FormField";
import { Button } from "@/front/components/ui/Button";

type SesionDesdeCalendarioFormProps = {
  pacientes: { id: string; nombre: string; apellidos: string }[];
};

export function SesionDesdeCalendarioForm({
  pacientes,
}: SesionDesdeCalendarioFormProps) {
  const [state, formAction, isPending] = useActionState(
    crearSesionDesdeCalendarioAction,
    null,
  );

  return (
    <form action={formAction}>
      <FormField
        label="Paciente"
        htmlFor="pacienteId"
        error={state?.error?.pacienteId?.[0]}
      >
        <select
          id="pacienteId"
          name="pacienteId"
          defaultValue=""
          className={inputStyles}
          required
        >
          <option value="" disabled>
            Selecciona un paciente
          </option>
          {pacientes.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} {p.apellidos}
            </option>
          ))}
        </select>
      </FormField>
      <div className="grid gap-4 md:grid-cols-3">
        <FormField
          label="Fecha"
          htmlFor="fecha"
          error={state?.error?.fecha?.[0]}
        >
          <input
            id="fecha"
            name="fecha"
            type="date"
            required
            className={inputStyles}
          />
        </FormField>
        <FormField label="Hora" htmlFor="hora">
          <input
            id="hora"
            name="hora"
            type="time"
            required
            className={inputStyles}
          />
        </FormField>
        <FormField
          label="Duración (min)"
          htmlFor="duracionMinutos"
          error={state?.error?.duracionMinutos?.[0]}
        >
          <input
            id="duracionMinutos"
            name="duracionMinutos"
            type="number"
            required
            className={inputStyles}
          />
        </FormField>
      </div>
      <FormField label="Observaciones" htmlFor="observaciones">
        <textarea
          id="observaciones"
          name="observaciones"
          className={inputStyles}
          rows={2}
        />
      </FormField>
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? "Guardando..." : "Crear sesión"}
      </Button>
    </form>
  );
}
