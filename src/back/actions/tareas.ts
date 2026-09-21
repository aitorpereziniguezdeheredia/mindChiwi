"use server";

import { tareaSchema } from "@/back/validations/tareas";
import { crearTarea, toggleTareaCompletada, eliminarTarea } from "@/back/services/tareas";
import { revalidatePath } from "next/cache";

export type TareaFormState = {
  error?: Record<string, string[] | undefined>;
} | null;

export async function crearTareaAction(
  _prevState: TareaFormState,
  formData: FormData
): Promise<TareaFormState> {
  const raw = {
    titulo: formData.get("titulo"),
    fecha: formData.get("fecha"),
    pacienteId: formData.get("pacienteId"),
  };

  const parsed = tareaSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await crearTarea(parsed.data);

  revalidatePath("/tareas");
  return null;
}

export async function toggleTareaAction(id: string, completada: boolean) {
  await toggleTareaCompletada(id, completada);
  revalidatePath("/tareas");
}

export async function eliminarTareaAction(id: string) {
  await eliminarTarea(id);
  revalidatePath("/tareas");
}