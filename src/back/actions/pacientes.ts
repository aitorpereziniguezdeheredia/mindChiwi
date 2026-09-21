"use server";

import { pacienteSchema } from "@/back/validations/pacientes";
import { crearPaciente } from "@/back/services/pacientes";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type CrearPacienteState = {
  error?: Record<string, string[] | undefined>;
} | null;

export async function crearPacienteAction(
  _prevState: CrearPacienteState,
  formData: FormData
): Promise<CrearPacienteState> {
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