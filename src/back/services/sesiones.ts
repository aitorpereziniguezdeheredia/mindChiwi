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

export async function listarProximasSesiones(limite = 5) {
  return prisma.sesion.findMany({
    where: { fecha: { gte: new Date() } },
    orderBy: { fecha: "asc" },
    take: limite,
    include: { paciente: true },
  });
}

export async function contarSesionesEstaSemana() {
  const inicioSemana = new Date();
  inicioSemana.setDate(inicioSemana.getDate() - inicioSemana.getDay());
  inicioSemana.setHours(0, 0, 0, 0);

  return prisma.sesion.count({
    where: { fecha: { gte: inicioSemana } },
  });
}