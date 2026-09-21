import { prisma } from "@/back/db/client";
import type { PacienteInput } from "@/back/validations/pacientes";

export async function crearPaciente(data: PacienteInput) {
  return prisma.paciente.create({ data });
}

export async function listarPacientes() {
  return prisma.paciente.findMany({
    orderBy: { createdAt: "desc" },
  });
}