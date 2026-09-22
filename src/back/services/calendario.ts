import { listarSesionesEntre } from "@/back/services/sesiones";

function inicioDeSemana(fecha: Date) {
  const d = new Date(fecha);
  const dia = d.getDay();
  const diff = dia === 0 ? -6 : 1 - dia;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function finDeSemana(inicio: Date) {
  const d = new Date(inicio);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
}

export async function obtenerSemana(fechaReferencia: Date) {
  const inicio = inicioDeSemana(fechaReferencia);
  const fin = finDeSemana(inicio);
  const sesiones = await listarSesionesEntre(inicio, fin);

  return Array.from({ length: 7 }, (_, i) => {
    const dia = new Date(inicio);
    dia.setDate(dia.getDate() + i);
    return {
      fecha: dia,
      sesiones: sesiones.filter((s) => s.fecha.toDateString() === dia.toDateString()),
    };
  });
}