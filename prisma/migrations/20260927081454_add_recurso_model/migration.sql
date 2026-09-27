-- CreateEnum
CREATE TYPE "CategoriaRecurso" AS ENUM ('EMOCIONES', 'AUTOESTIMA', 'HABILIDADES_SOCIALES', 'ATENCION', 'REGULACION_EMOCIONAL', 'FRUSTRACION', 'MIEDOS');

-- CreateTable
CREATE TABLE "Recurso" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "categoria" "CategoriaRecurso" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Recurso_pkey" PRIMARY KEY ("id")
);
