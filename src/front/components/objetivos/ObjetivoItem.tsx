"use client";

import { toggleObjetivoAction } from "@/back/actions/objetivos";
import { etiquetasCategoria } from "@/back/validations/objetivos";

type ObjetivoItemProps = {
  objetivo: {
    id: string;
    nombre: string;
    categoria: keyof typeof etiquetasCategoria;
    estado: "ACTIVO" | "CONSEGUIDO";
  };
  pacienteId: string;
};

export function ObjetivoItem({ objetivo, pacienteId }: ObjetivoItemProps) {
  const conseguido = objetivo.estado === "CONSEGUIDO";

  return (
    <li className="flex items-center gap-3 border-t border-[var(--line)] first:border-t-0 py-3">
      <input
        type="checkbox"
        checked={conseguido}
        onChange={(e) =>
          toggleObjetivoAction(objetivo.id, pacienteId, e.target.checked ? "CONSEGUIDO" : "ACTIVO")
        }
        className="h-4 w-4 accent-[var(--pine)]"
      />
      <span className={`text-sm flex-1 ${conseguido ? "line-through text-[var(--ink-soft)]" : ""}`}>
        {objetivo.nombre}
      </span>
      <span className="text-xs text-[var(--ink-soft)] bg-[var(--bg)] border border-[var(--line)] rounded-full px-2.5 py-1">
        {etiquetasCategoria[objetivo.categoria]}
      </span>
    </li>
  );
}