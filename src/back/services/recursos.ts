import { prisma } from "@/back/db/client";

export async function listarRecursos() {
  return prisma.recurso.findMany({ orderBy: { createdAt: "asc" } });
}