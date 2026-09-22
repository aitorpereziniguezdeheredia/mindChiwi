"use client";

import { useActionState } from "react";
import { categorias, etiquetasCategoria } from "@/back/validations/objetivos";
import type { ObjetivoFormState } from "@/back/actions/objetivos";
import { FormField, inputStyles } from "@/front/components/ui/FormField";
import { Button } from "@/front/components/ui/Button";

type ObjetivoFormProps = {
  action: (prevState: ObjetivoFormState, formData: FormData) => Promise<ObjetivoFormState>;
};

export function ObjetivoForm({ action }: ObjetivoFormProps) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="mb-6">
      <div className="grid gap-4 md:grid-cols-2">
        <FormField label="Objetivo" htmlFor="nombre" error={state?.error?.nombre?.[0]}>
          <input id="nombre" name="nombre" required className={inputStyles} />
        </FormField>
        <FormField label="Categoría" htmlFor="categoria">
          <select id="categoria" name="categoria" defaultValue={categorias[0]} className={inputStyles}>
            {categorias.map((c) => (
              <option key={c} value={c}>
                {etiquetasCategoria[c]}
              </option>
            ))}
          </select>
        </FormField>
      </div>
      <Button type="submit" disabled={isPending} variant="secondary">
        {isPending ? "Añadiendo..." : "Añadir objetivo"}
      </Button>
    </form>
  );
}