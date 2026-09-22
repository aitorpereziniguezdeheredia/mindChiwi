import { requireSession } from "@/back/auth/require-session";
import { obtenerSemana } from "@/back/services/calendario";

export default async function CalendarioPage() {
  await requireSession();
  const dias = await obtenerSemana(new Date());

  return (
    <main>
      <h1>Calendario — esta semana</h1>
      <div style={{ display: "flex", gap: "1rem" }}>
        {dias.map((dia) => (
          <div key={dia.fecha.toISOString()}>
            <h3>{dia.fecha.toLocaleDateString("es-ES", { weekday: "short", day: "numeric" })}</h3>
            {dia.sesiones.length === 0 ? (
              <p>—</p>
            ) : (
              <ul>
                {dia.sesiones.map((s) => (
                  <li key={s.id}>{s.paciente.nombre} {s.paciente.apellidos}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}