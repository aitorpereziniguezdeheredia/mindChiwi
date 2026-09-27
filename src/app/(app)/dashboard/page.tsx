import Link from "next/link";
import { requireSession } from "@/back/auth/require-session";
import { listarProximasSesiones, contarSesionesEstaSemana } from "@/back/services/sesiones";
import { listarTareasPendientes, contarTareasPendientes } from "@/back/services/tareas";
import { listarPacientesRecientes, contarPacientes } from "@/back/services/pacientes";
import { obtenerSemana } from "@/back/services/calendario";
import { PageHeader } from "@/front/components/ui/PageHeader";
import { Card } from "@/front/components/ui/Card";
import { Avatar } from "@/front/components/ui/Avatar";
import { DayChip } from "@/front/components/ui/DayChip";
import { buttonBase, buttonStyles } from "@/front/components/ui/Button";
import { formatFechaRelativa } from "@/front/lib/formatFechaRelativa";

export default async function DashboardPage() {
  const session = await requireSession();

  const [
    proximasSesiones,
    tareasPendientes,
    pacientesRecientes,
    totalPacientes,
    totalTareasPendientes,
    sesionesEstaSemana,
    dias,
  ] = await Promise.all([
    listarProximasSesiones(),
    listarTareasPendientes(),
    listarPacientesRecientes(),
    contarPacientes(),
    contarTareasPendientes(),
    contarSesionesEstaSemana(),
    obtenerSemana(new Date()),
  ]);

  return (
    <>
      <PageHeader
        title={`Bienvenido, ${session.user.name}`}
        description="Esto es lo que tienes hoy."
        action={
          <div className="flex gap-3">
            <Link href="/pacientes/nuevo" className={`${buttonBase} ${buttonStyles.primary}`}>
              + Nuevo paciente
            </Link>
            <Link href="/tareas" className={`${buttonBase} ${buttonStyles.secondary}`}>
              + Nueva tarea
            </Link>
          </div>
        }
      />

      <Card className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg font-medium">Tu semana</h2>
          <Link href="/calendario" className="text-sm text-[var(--pine)] underline">
            Ver calendario completo →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
          {dias.map((dia) => (
            <div key={dia.fecha.toISOString()} className="rounded-lg border border-[var(--line)] p-2 min-h-[90px]">
              <p className="text-xs text-[var(--ink-soft)] capitalize mb-1.5">
                {dia.fecha.toLocaleDateString("es-ES", { weekday: "short", day: "numeric" })}
              </p>
              {dia.sesiones.map((s) => (
                <DayChip key={s.id} variant="pine">
                  {s.fecha.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })} {s.paciente.nombre}
                </DayChip>
              ))}
              {dia.tareas.map((t) => (
                <DayChip key={t.id} variant="clay">
                  {t.titulo}
                </DayChip>
              ))}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-5 md:grid-cols-2">
        <Card>
          <h2 className="font-display text-lg font-medium mb-3">Próximas sesiones</h2>
          {proximasSesiones.length === 0 ? (
            <p className="text-sm text-[var(--ink-soft)]">No hay sesiones próximas.</p>
          ) : (
            <ul className="space-y-2">
              {proximasSesiones.map((s) => (
                <li key={s.id} className="flex gap-3 items-start text-sm border-t border-[var(--line)] pt-2 first:border-t-0 first:pt-0">
                  <span className="w-2 h-2 rounded-full bg-[var(--pine)] mt-1.5 shrink-0" />
                  <div>
                    <p className="font-medium">{s.paciente.nombre} {s.paciente.apellidos}</p>
                    <p className="text-xs text-[var(--ink-soft)]">
                      {s.fecha.toLocaleDateString()} · {s.fecha.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="font-display text-lg font-medium mb-3">Tareas pendientes</h2>
          {tareasPendientes.length === 0 ? (
            <p className="text-sm text-[var(--ink-soft)]">No hay tareas pendientes.</p>
          ) : (
            <ul className="space-y-2">
              {tareasPendientes.map((t) => (
                <li key={t.id} className="flex gap-3 items-start text-sm border-t border-[var(--line)] pt-2 first:border-t-0 first:pt-0">
                  <span className="w-2 h-2 rounded-full bg-[var(--honey)] mt-1.5 shrink-0" />
                  <div>
                    <p className="font-medium">{t.titulo}</p>
                    <p className="text-xs text-[var(--ink-soft)]">
                      {t.paciente ? `${t.paciente.nombre} ${t.paciente.apellidos}` : "Sin paciente"}
                      {formatFechaRelativa(t.fecha) && ` · ${formatFechaRelativa(t.fecha)}`}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="font-display text-lg font-medium mb-3">Pacientes recientes</h2>
          {pacientesRecientes.length === 0 ? (
            <p className="text-sm text-[var(--ink-soft)]">Todavía no hay pacientes.</p>
          ) : (
            <ul className="space-y-2">
              {pacientesRecientes.map((p) => (
                <li key={p.id} className="flex items-center gap-3 text-sm border-t border-[var(--line)] pt-2 first:border-t-0 first:pt-0">
                  <Avatar nombre={p.nombre} apellidos={p.apellidos} size="sm" />
                  <Link href={`/pacientes/${p.id}`} className="hover:text-[var(--pine)]">
                    {p.nombre} {p.apellidos}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card>
          <h2 className="font-display text-lg font-medium mb-3">Resumen</h2>
          <div className="flex gap-6">
            <div>
              <p className="font-display text-2xl font-medium">{totalPacientes}</p>
              <p className="text-xs text-[var(--ink-soft)]">Pacientes</p>
            </div>
            <div>
              <p className="font-display text-2xl font-medium">{totalTareasPendientes}</p>
              <p className="text-xs text-[var(--ink-soft)]">Tareas pendientes</p>
            </div>
            <div>
              <p className="font-display text-2xl font-medium">{sesionesEstaSemana}</p>
              <p className="text-xs text-[var(--ink-soft)]">Sesiones esta semana</p>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}