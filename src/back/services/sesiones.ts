import { prisma } from "@/back/db/client";
import type { SesionInput } from "@/back/validations/sesiones";

export async function crearSesion(pacienteId: string, data: SesionInput) {
  return prisma.sesion.create({ data: { ...data, pacienteId } });
}

export async function listarSesionesDePaciente(pacienteId: string) {
  return prisma.sesion.findMany({
    where: { pacienteId },
    orderBy: { fecha: "desc" },
  });
}