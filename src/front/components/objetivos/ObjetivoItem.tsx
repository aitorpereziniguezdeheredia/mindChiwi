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
  return (
    <li>
      <input
        type="checkbox"
        checked={objetivo.estado === "CONSEGUIDO"}
        onChange={(e) =>
          toggleObjetivoAction(objetivo.id, pacienteId, e.target.checked ? "CONSEGUIDO" : "ACTIVO")
        }
      />
      <span style={{ textDecoration: objetivo.estado === "CONSEGUIDO" ? "line-through" : "none" }}>
        {objetivo.nombre}
      </span>
      <small> — {etiquetasCategoria[objetivo.categoria]}</small>
    </li>
  );
}