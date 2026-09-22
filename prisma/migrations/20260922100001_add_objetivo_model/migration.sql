-- CreateEnum
CREATE TYPE "CategoriaObjetivo" AS ENUM ('REGULACION_EMOCIONAL', 'HABILIDADES_SOCIALES', 'AUTOESTIMA', 'ATENCION', 'FRUSTRACION');

-- CreateEnum
CREATE TYPE "EstadoObjetivo" AS ENUM ('ACTIVO', 'CONSEGUIDO');

-- CreateTable
CREATE TABLE "Objetivo" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" "CategoriaObjetivo" NOT NULL,
    "estado" "EstadoObjetivo" NOT NULL DEFAULT 'ACTIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pacienteId" TEXT NOT NULL,

    CONSTRAINT "Objetivo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Objetivo_pacienteId_idx" ON "Objetivo"("pacienteId");

-- AddForeignKey
ALTER TABLE "Objetivo" ADD CONSTRAINT "Objetivo_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
