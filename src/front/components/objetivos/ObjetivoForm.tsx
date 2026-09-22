"use client";

import { useActionState } from "react";
import { categorias, etiquetasCategoria } from "@/back/validations/objetivos";
import type { ObjetivoFormState } from "@/back/actions/objetivos";

type ObjetivoFormProps = {
  action: (prevState: ObjetivoFormState, formData: FormData) => Promise<ObjetivoFormState>;
};

export function ObjetivoForm({ action }: ObjetivoFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction}>
      <div>
        <label htmlFor="nombre">Objetivo</label>
        <input id="nombre" name="nombre" required />
        {state?.error?.nombre && <p style={{ color: "red" }}>{state.error.nombre[0]}</p>}
      </div>
      <div>
        <label htmlFor="categoria">Categoría</label>
        <select id="categoria" name="categoria" defaultValue={categorias[0]}>
          {categorias.map((c) => (
            <option key={c} value={c}>
              {etiquetasCategoria[c]}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Añadiendo..." : "Añadir objetivo"}
      </button>
    </form>
  );
}