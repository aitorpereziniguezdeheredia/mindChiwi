"use server";

import { sesionSchema } from "@/back/validations/sesiones";
import { crearSesion } from "@/back/services/sesiones";
import { revalidatePath } from "next/cache";
import { requireSession } from "@/back/auth/require-session";

export type SesionFormState = {
  error?: Record<string, string[] | undefined>;
} | null;

export async function crearSesionAction(
  pacienteId: string,
  _prevState: SesionFormState,
  formData: FormData
): Promise<SesionFormState> {
  await requireSession();

  const raw = {
    fecha: formData.get("fecha"),
    duracionMinutos: formData.get("duracionMinutos"),
    observaciones: formData.get("observaciones"),
  };

  const parsed = sesionSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await crearSesion(pacienteId, parsed.data);

  revalidatePath(`/pacientes/${pacienteId}`);
  return null;
}