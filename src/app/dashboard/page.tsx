import Link from "next/link";
import { requireSession } from "@/back/auth/require-session";
import { listarProximasSesiones, contarSesionesEstaSemana } from "@/back/services/sesiones";
import { listarTareasPendientes, contarTareasPendientes } from "@/back/services/tareas";
import { listarPacientesRecientes, contarPacientes } from "@/back/services/pacientes";

export default async function DashboardPage() {
  const session = await requireSession();

  const [proximasSesiones, tareasPendientes, pacientesRecientes, totalPacientes, totalTareasPendientes, sesionesEstaSemana] =
    await Promise.all([
      listarProximasSesiones(),
      listarTareasPendientes(),
      listarPacientesRecientes(),
      contarPacientes(),
      contarTareasPendientes(),
      contarSesionesEstaSemana(),
    ]);

  return (
    <main>
      <h1>Bienvenido, {session.user.name}</h1>

      <section>
        <h2>Próximas sesiones</h2>
        {proximasSesiones.length === 0 ? (
          <p>No hay sesiones próximas.</p>
        ) : (
          <ul>
            {proximasSesiones.map((s) => (
              <li key={s.id}>
                {s.fecha.toLocaleDateString()} — {s.paciente.nombre} {s.paciente.apellidos}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Tareas pendientes</h2>
        {tareasPendientes.length === 0 ? (
          <p>No hay tareas pendientes.</p>
        ) : (
          <ul>
            {tareasPendientes.map((t) => (
              <li key={t.id}>
                {t.titulo}
                {t.paciente && <small> — {t.paciente.nombre} {t.paciente.apellidos}</small>}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Pacientes recientes</h2>
        {pacientesRecientes.length === 0 ? (
          <p>Todavía no hay pacientes.</p>
        ) : (
          <ul>
            {pacientesRecientes.map((p) => (
              <li key={p.id}>
                <Link href={`/pacientes/${p.id}`}>{p.nombre} {p.apellidos}</Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Resumen</h2>
        <p>{totalPacientes} pacientes · {totalTareasPendientes} tareas pendientes · {sesionesEstaSemana} sesiones esta semana</p>
      </section>
    </main>
  );
}