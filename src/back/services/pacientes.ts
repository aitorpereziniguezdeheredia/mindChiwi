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

export async function obtenerPaciente(id: string) {
  return prisma.paciente.findUnique({ where: { id } });
}

export async function actualizarPaciente(id: string, data: PacienteInput) {
  return prisma.paciente.update({ where: { id }, data });
}

export async function eliminarPaciente(id: string) {
  return prisma.paciente.delete({ where: { id } });
}

export async function listarPacientesRecientes(limite = 5) {
  return prisma.paciente.findMany({
    orderBy: { updatedAt: "desc" },
    take: limite,
  });
}

export async function contarPacientes() {
  return prisma.paciente.count();
}