"use client";

import { useActionState } from "react";
import { crearTareaAction } from "@/back/actions/tareas";
import { FormField, inputStyles } from "@/front/components/ui/FormField";
import { Button } from "@/front/components/ui/Button";

type TareaFormProps = {
  pacientes: { id: string; nombre: string; apellidos: string }[];
};

export function TareaForm({ pacientes }: TareaFormProps) {
  const [state, formAction, isPending] = useActionState(crearTareaAction, null);

  return (
    <form action={formAction} className="mb-6">
      <div className="grid gap-4 md:grid-cols-3">
        <FormField label="Título" htmlFor="titulo" error={state?.error?.titulo?.[0]}>
          <input id="titulo" name="titulo" required className={inputStyles} />
        </FormField>
        <FormField label="Fecha (opcional)" htmlFor="fecha">
          <input id="fecha" name="fecha" type="date" className={inputStyles} />
        </FormField>
        <FormField label="Paciente (opcional)" htmlFor="pacienteId">
          <select id="pacienteId" name="pacienteId" defaultValue="" className={inputStyles}>
            <option value="">— Ninguno —</option>
            {pacientes.map((p) => (
              <option key={p.id} value={p.id}>
                {p.nombre} {p.apellidos}
              </option>
            ))}
          </select>
        </FormField>
      </div>
      <Button type="submit" disabled={isPending} variant="secondary">
        {isPending ? "Añadiendo..." : "Añadir tarea"}
      </Button>
    </form>
  );
}