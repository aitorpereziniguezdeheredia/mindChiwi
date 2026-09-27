"use client";

import { useState } from "react";
import { categoriasRecurso, etiquetasCategoriaRecurso } from "@/back/validations/recursos";
import { Card } from "@/front/components/ui/Card";

type Recurso = {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: (typeof categoriasRecurso)[number];
};

export function RecursosFiltrados({ recursos }: { recursos: Recurso[] }) {
  const [filtro, setFiltro] = useState<string>("TODOS");

  const visibles = filtro === "TODOS" ? recursos : recursos.filter((r) => r.categoria === filtro);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFiltro("TODOS")}
          className={`text-sm rounded-full px-4 py-1.5 border transition-colors ${
            filtro === "TODOS"
              ? "bg-[var(--pine)] text-white border-[var(--pine)]"
              : "border-[var(--line)] text-[var(--ink-soft)]"
          }`}
        >
          Todos
        </button>
        {categoriasRecurso.map((cat) => (
          <button
            key={cat}
            onClick={() => setFiltro(cat)}
            className={`text-sm rounded-full px-4 py-1.5 border transition-colors ${
              filtro === cat
                ? "bg-[var(--pine)] text-white border-[var(--pine)]"
                : "border-[var(--line)] text-[var(--ink-soft)]"
            }`}
          >
            {etiquetasCategoriaRecurso[cat]}
          </button>
        ))}
      </div>

      {visibles.length === 0 ? (
        <p className="text-sm text-[var(--ink-soft)]">No hay recursos en esta categoría.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {visibles.map((recurso) => (
            <Card key={recurso.id}>
              <p className="text-xs text-[var(--clay)] mb-1">{etiquetasCategoriaRecurso[recurso.categoria]}</p>
              <h3 className="font-semibold text-sm mb-1">{recurso.titulo}</h3>
              <p className="text-sm text-[var(--ink-soft)]">{recurso.descripcion}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}