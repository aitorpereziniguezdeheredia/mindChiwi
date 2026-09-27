import { prisma } from "../src/back/db/client";

const recursos = [
  {
    titulo: "El termómetro de las emociones",
    descripcion: "Actividad para identificar y nombrar cómo se siente el niño o niña durante la sesión.",
    categoria: "EMOCIONES" as const,
  },
  {
    titulo: "El frasco de los logros",
    descripcion: "Ejercicio semanal para registrar pequeños logros y reforzar la autoestima.",
    categoria: "AUTOESTIMA" as const,
  },
  {
    titulo: "Juego de turnos",
    descripcion: "Dinámica para practicar la espera y la escucha en grupo.",
    categoria: "HABILIDADES_SOCIALES" as const,
  },
  {
    titulo: "Caja de la atención",
    descripcion: "Actividad breve para entrenar la atención sostenida antes de empezar la sesión.",
    categoria: "ATENCION" as const,
  },
  {
    titulo: "El semáforo de la calma",
    descripcion: "Guía visual de tres pasos para gestionar momentos de frustración.",
    categoria: "FRUSTRACION" as const,
  },
  {
    titulo: "El mapa de los miedos",
    descripcion: "Dinámica para nombrar y situar visualmente los miedos del niño o niña.",
    categoria: "MIEDOS" as const,
  },
];

async function main() {
  for (const recurso of recursos) {
    await prisma.recurso.create({ data: recurso });
  }
  console.log(`Creados ${recursos.length} recursos.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });