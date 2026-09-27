import Link from "next/link";
import { obtenerSemana } from "@/back/services/calendario";
import { PageHeader } from "@/front/components/ui/PageHeader";
import { Card } from "@/front/components/ui/Card";
import { DayChip } from "@/front/components/ui/DayChip";
import { buttonBase, buttonStyles } from "@/front/components/ui/Button";

export default async function CalendarioPage() {
  const dias = await obtenerSemana(new Date());

  return (
    <>
      <PageHeader
        title="Calendario"
        description="Semana actual"
        action={
          <Link href="/calendario/nueva-sesion" className={`${buttonBase} ${buttonStyles.primary}`}>
            + Nueva sesión
          </Link>
        }
      />
      <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
        {dias.map((dia) => (
          <Card key={dia.fecha.toISOString()} className="min-h-[160px]">
            <h3 className="text-xs font-medium text-[var(--ink-soft)] mb-2 capitalize">
              {dia.fecha.toLocaleDateString("es-ES", { weekday: "short", day: "numeric" })}
            </h3>
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
            {dia.sesiones.length === 0 && dia.tareas.length === 0 && (
              <p className="text-xs text-[var(--ink-soft)]">—</p>
            )}
          </Card>
        ))}
      </div>
    </>
  );
}