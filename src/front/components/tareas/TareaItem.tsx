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
  const vencida = !tarea.completada && tarea.fecha !== null && tarea.fecha < new Date();

  return (
    <li className="flex items-center gap-3 border-t border-[var(--line)] first:border-t-0 py-3">
      <input
        type="checkbox"
        checked={tarea.completada}
        onChange={(e) => toggleTareaAction(tarea.id, e.target.checked)}
        className="h-4 w-4 accent-[var(--pine)]"
      />
      <span className={`text-sm flex-1 ${tarea.completada ? "line-through text-[var(--ink-soft)]" : ""}`}>
        {tarea.titulo}
        {tarea.paciente && <span className="text-[var(--ink-soft)]"> — {tarea.paciente.nombre} {tarea.paciente.apellidos}</span>}
        {tarea.fecha && (
          <span className={vencida ? "text-[var(--clay)] font-medium" : "text-[var(--ink-soft)]"}>
            {" "}— {tarea.fecha.toLocaleDateString()}{vencida ? " (vencida)" : ""}
          </span>
        )}
      </span>
      <button onClick={() => eliminarTareaAction(tarea.id)} className="text-xs text-[var(--clay)] hover:underline">
        Eliminar
      </button>
    </li>
  );
}