"use client";

import { toggleTareaAction, eliminarTareaAction } from "@/back/actions/tareas";

type TareaItemProps = {
  tarea: {
    id: string;
    titulo: string;
    completada: boolean;
    fecha: Date | null;
    paciente: { nombre: string; apellidos: string } | null;
  };
};

export function TareaItem({ tarea }: TareaItemProps) {
  return (
    <li>
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={(e) => toggleTareaAction(tarea.id, e.target.checked)}
      />
      <span style={{ textDecoration: tarea.completada ? "line-through" : "none" }}>
        {tarea.titulo}
      </span>
      {tarea.paciente && <small> — {tarea.paciente.nombre} {tarea.paciente.apellidos}</small>}
      {tarea.fecha && <small> — {tarea.fecha.toLocaleDateString()}</small>}
      <button onClick={() => eliminarTareaAction(tarea.id)}>Eliminar</button>
    </li>
  );
}