function offsetMadridEnHoras(fecha: Date): number {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Madrid",
    timeZoneName: "shortOffset",
  }).formatToParts(fecha);

  const nombreZona = partes.find((p) => p.type === "timeZoneName")?.value ?? "GMT+1";
  const coincide = nombreZona.match(/GMT([+-]\d+)/);
  return coincide ? Number(coincide[1]) : 1;
}

export function combinarFechaHoraMadrid(fecha: string, hora: string): string {
  const fechaAproximada = new Date(`${fecha}T12:00:00Z`);
  const offset = offsetMadridEnHoras(fechaAproximada);
  const signo = offset >= 0 ? "+" : "-";
  const offsetTexto = `${signo}${String(Math.abs(offset)).padStart(2, "0")}:00`;

  return `${fecha}T${hora}:00${offsetTexto}`;
}