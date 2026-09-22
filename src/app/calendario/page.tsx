import { requireSession } from "@/back/auth/require-session";
import { obtenerSemana } from "@/back/services/calendario";
import { AppNav } from "@/front/components/layout/AppNav";
import { PageHeader } from "@/front/components/ui/PageHeader";
import { Card } from "@/front/components/ui/Card";

export default async function CalendarioPage() {
  await requireSession();
  const dias = await obtenerSemana(new Date());
  const hoy = new Date().toDateString();

  return (
    <>
      <AppNav />
      <main className="max-w-5xl mx-auto px-7 py-10">
        <PageHeader title="Calendario" description="Semana actual" />
        <div className="grid grid-cols-2 md:grid-cols-7 gap-3">
          {dias.map((dia) => {
            const esHoy = dia.fecha.toDateString() === hoy;
            return (
              <Card key={dia.fecha.toISOString()} className={esHoy ? "border-[var(--pine)]" : ""}>
                <h3 className="text-xs font-medium text-[var(--ink-soft)] mb-2 capitalize">
                  {dia.fecha.toLocaleDateString("es-ES", { weekday: "short", day: "numeric" })}
                </h3>
                {dia.sesiones.length === 0 ? (
                  <p className="text-xs text-[var(--ink-soft)]">—</p>
                ) : (
                  <ul className="space-y-1">
                    {dia.sesiones.map((s) => (
                      <li key={s.id} className="text-xs bg-[var(--bg)] rounded px-2 py-1">
                        {s.paciente.nombre}
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            );
          })}
        </div>
      </main>
    </>
  );
}