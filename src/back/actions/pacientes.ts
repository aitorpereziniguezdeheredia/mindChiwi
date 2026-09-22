"use server";

import { pacienteSchema } from "@/back/validations/pacientes";
import {
  crearPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "@/back/services/pacientes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireSession } from "@/back/auth/require-session";

export type PacienteFormState = {
  error?: Record<string, string[] | undefined>;
} | null;

export async function crearPacienteAction(
  _prevState: PacienteFormState,
  formData: FormData
): Promise<PacienteFormState> {
  await requireSession();

  const raw = {
    nombre: formData.get("nombre"),
    apellidos: formData.get("apellidos"),
    fechaNacimiento: formData.get("fechaNacimiento"),
    notas: formData.get("notas"),
  };

  const parsed = pacienteSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await crearPaciente(parsed.data);

  revalidatePath("/pacientes");
  redirect("/pacientes");
}

export async function actualizarPacienteAction(
  id: string,
  _prevState: PacienteFormState,
  formData: FormData
): Promise<PacienteFormState> {
  await requireSession();

  const raw = {
    nombre: formData.get("nombre"),
    apellidos: formData.get("apellidos"),
    fechaNacimiento: formData.get("fechaNacimiento"),
    notas: formData.get("notas"),
  };

  const parsed = pacienteSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  await actualizarPaciente(id, parsed.data);

  revalidatePath("/pacientes");
  revalidatePath(`/pacientes/${id}`);
  redirect("/pacientes");
}

export async function eliminarPacienteAction(id: string) {
  await requireSession();

  await eliminarPaciente(id);
  revalidatePath("/pacientes");
  redirect("/pacientes");
}