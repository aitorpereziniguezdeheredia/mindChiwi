import { prisma } from "@/back/db/client";
import type { TareaInput } from "@/back/validations/tareas";

export async function crearTarea(data: TareaInput) {
  return prisma.tarea.create({ data });
}

export async function listarTareas() {
  return prisma.tarea.findMany({
    orderBy: { createdAt: "desc" },
    include: { paciente: true },
  });
}

export async function toggleTareaCompletada(id: string, completada: boolean) {
  return prisma.tarea.update({ where: { id }, data: { completada } });
}

export async function eliminarTarea(id: string) {
  return prisma.tarea.delete({ where: { id } });
}

export async function listarTareasPendientes(limite = 5) {
  return prisma.tarea.findMany({
    where: { completada: false },
    orderBy: { createdAt: "desc" },
    take: limite,
    include: { paciente: true },
  });
}

export async function contarTareasPendientes() {
  return prisma.tarea.count({ where: { completada: false } });
}