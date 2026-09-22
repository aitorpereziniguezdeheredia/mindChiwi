"use server";

import { objetivoSchema } from "@/back/validations/objetivos";
import { crearObjetivo, toggleObjetivoEstado } from "@/back/services/objetivos";
import { revalidatePath } from "next/cache";

export type ObjetivoFormState = {
  error?: Record<string, string[] | undefined>;
} | null;

export async function crearObjetivoAction(
  pacienteId: string,
  _prevState: ObjetivoFormState,
  formData: FormData
): Promise<ObjetivoFormState> {
  const raw = {
    nombre: formData.get("nombre"),
    categoria: formData.get("categoria"),
  };

  const parsed = objetivoSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await crearObjetivo(pacienteId, parsed.data);

  revalidatePath(`/pacientes/${pacienteId}`);
  return null;
}

export async function toggleObjetivoAction(id: string, pacienteId: string, estado: "ACTIVO" | "CONSEGUIDO") {
  await toggleObjetivoEstado(id, estado);
  revalidatePath(`/pacientes/${pacienteId}`);
}