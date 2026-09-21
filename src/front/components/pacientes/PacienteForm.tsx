"use client";

import { useActionState } from "react";
import { crearPacienteAction } from "@/back/actions/pacientes";

export function PacienteForm() {
  const [state, formAction, isPending] = useActionState(crearPacienteAction, null);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="nombre">Nombre</label>
        <input id="nombre" name="nombre" required />
        {state?.error?.nombre && <p style={{ color: "red" }}>{state.error.nombre[0]}</p>}
      </div>
      <div>
        <label htmlFor="apellidos">Apellidos</label>
        <input id="apellidos" name="apellidos" required />
        {state?.error?.apellidos && <p style={{ color: "red" }}>{state.error.apellidos[0]}</p>}
      </div>
      <div>
        <label htmlFor="fechaNacimiento">Fecha de nacimiento</label>
        <input id="fechaNacimiento" name="fechaNacimiento" type="date" required />
        {state?.error?.fechaNacimiento && <p style={{ color: "red" }}>{state.error.fechaNacimiento[0]}</p>}
      </div>
      <div>
        <label htmlFor="notas">Notas</label>
        <textarea id="notas" name="notas" />
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Guardando..." : "Crear paciente"}
      </button>
    </form>
  );
}