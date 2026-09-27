"use server";

import { sesionSchema } from "@/back/validations/sesiones";
import { crearSesion } from "@/back/services/sesiones";
import { revalidatePath } from "next/cache";
import { requireSession } from "@/back/auth/require-session";
import { redirect } from "next/navigation";
import { combinarFechaHoraMadrid } from "@/front/lib/fechaMadrid";

export type SesionFormState = {
  error?: Record<string, string[] | undefined>;
} | null;

export async function crearSesionAction(
  pacienteId: string,
  _prevState: SesionFormState,
  formData: FormData,
): Promise<SesionFormState> {
  await requireSession();

  const fecha = formData.get("fecha");
  const hora = formData.get("hora");

  const raw = {
    fecha:
      fecha && hora
        ? combinarFechaHoraMadrid(String(fecha), String(hora))
        : fecha,
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

export type SesionDesdeCalendarioState = {
  error?: Record<string, string[] | undefined>;
} | null;

export async function crearSesionDesdeCalendarioAction(
  _prevState: SesionDesdeCalendarioState,
  formData: FormData,
): Promise<SesionDesdeCalendarioState> {
  await requireSession();

  const pacienteId = formData.get("pacienteId");

  if (typeof pacienteId !== "string" || pacienteId.length === 0) {
    return { error: { pacienteId: ["Selecciona un paciente"] } };
  }

  const fecha = formData.get("fecha");
  const hora = formData.get("hora");

  const raw = {
    fecha:
      fecha && hora
        ? combinarFechaHoraMadrid(String(fecha), String(hora))
        : fecha,
    duracionMinutos: formData.get("duracionMinutos"),
    observaciones: formData.get("observaciones"),
  };

  const parsed = sesionSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await crearSesion(pacienteId, parsed.data);

  revalidatePath("/calendario");
  revalidatePath("/dashboard");
  redirect("/calendario");
}
