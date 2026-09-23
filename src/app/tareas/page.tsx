import { listarTareas } from "@/back/services/tareas";
import { listarPacientes } from "@/back/services/pacientes";
import { TareaForm } from "@/front/components/tareas/TareaForm";
import { TareaItem } from "@/front/components/tareas/TareaItem";
import { AppNav } from "@/front/components/layout/AppNav";
import { PageHeader } from "@/front/components/ui/PageHeader";
import { Card } from "@/front/components/ui/Card";

export default async function TareasPage() {
  const [tareas, pacientes] = await Promise.all([listarTareas(), listarPacientes()]);

  const pendientes = tareas.filter((t) => !t.completada);
  const completadas = tareas.filter((t) => t.completada);

  return (
    <>
      <AppNav />
      <main className="max-w-5xl mx-auto px-7 py-10">
        <PageHeader title="Tareas" />
        <Card>
          <TareaForm pacientes={pacientes} />

          <h2 className="font-display text-base font-medium mb-1">Pendientes</h2>
          {pendientes.length === 0 ? (
            <p className="text-sm text-[var(--ink-soft)] mb-6">No hay tareas pendientes.</p>
          ) : (
            <ul className="mb-6">
              {pendientes.map((tarea) => (
                <TareaItem key={tarea.id} tarea={tarea} />
              ))}
            </ul>
          )}

          {completadas.length > 0 && (
            <>
              <h2 className="font-display text-base font-medium text-[var(--ink-soft)] mb-1">Completadas</h2>
              <ul>
                {completadas.map((tarea) => (
                  <TareaItem key={tarea.id} tarea={tarea} />
                ))}
              </ul>
            </>
          )}
        </Card>
      </main>
    </>
  );
}