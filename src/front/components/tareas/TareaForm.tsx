"use client";

import { useActionState } from "react";
import { crearTareaAction } from "@/back/actions/tareas";

type TareaFormProps = {
  pacientes: { id: string; nombre: string; apellidos: string }[];
};

export function TareaForm({ pacientes }: TareaFormProps) {
  const [state, formAction, isPending] = useActionState(crearTareaAction, null);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="titulo">Título</label>
        <input id="titulo" name="titulo" required />
        {state?.error?.titulo && <p style={{ color: "red" }}>{state.error.titulo[0]}</p>}
      </div>
      <div>
        <label htmlFor="fecha">Fecha (opcional)</label>
        <input id="fecha" name="fecha" type="date" />
      </div>
      <div>
        <label htmlFor="pacienteId">Paciente (opcional)</label>
        <select id="pacienteId" name="pacienteId" defaultValue="">
          <option value="">— Ninguno —</option>
          {pacientes.map((p) => (
            <option key={p.id} value={p.id}>
              {p.nombre} {p.apellidos}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Añadiendo..." : "Añadir tarea"}
      </button>
    </form>
  );
}