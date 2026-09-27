export function formatFechaRelativa(fecha: Date | null): string | null {
  if (!fecha) return null;

  const hoy = new Date();
  const manana = new Date();
  manana.setDate(hoy.getDate() + 1);

  if (fecha.toDateString() === hoy.toDateString()) return "hoy";
  if (fecha.toDateString() === manana.toDateString()) return "mañana";

  return fecha.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
}