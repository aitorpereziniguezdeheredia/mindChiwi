import { prisma } from "@/back/db/client";
import type { ObjetivoInput } from "@/back/validations/objetivos";

export async function crearObjetivo(pacienteId: string, data: ObjetivoInput) {
  return prisma.objetivo.create({ data: { ...data, pacienteId } });
}

export async function listarObjetivosDePaciente(pacienteId: string) {
  return prisma.objetivo.findMany({
    where: { pacienteId },
    orderBy: { createdAt: "desc" },
  });
}

export async function toggleObjetivoEstado(id: string, estado: "ACTIVO" | "CONSEGUIDO") {
  return prisma.objetivo.update({ where: { id }, data: { estado } });
}