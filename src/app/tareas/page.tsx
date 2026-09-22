import { listarTareas } from "@/back/services/tareas";
import { listarPacientes } from "@/back/services/pacientes";
import { TareaForm } from "@/front/components/tareas/TareaForm";
import { TareaItem } from "@/front/components/tareas/TareaItem";
import { AppNav } from "@/front/components/layout/AppNav";
import { PageHeader } from "@/front/components/ui/PageHeader";
import { Card } from "@/front/components/ui/Card";

export default async function TareasPage() {
  const [tareas, pacientes] = await Promise.all([listarTareas(), listarPacientes()]);

  return (
    <>
      <AppNav />
      <main className="max-w-5xl mx-auto px-7 py-10">
        <PageHeader title="Tareas" />
        <Card>
          <TareaForm pacientes={pacientes} />
          {tareas.length === 0 ? (
            <p className="text-sm text-[var(--ink-soft)]">No hay tareas todavía.</p>
          ) : (
            <ul>
              {tareas.map((tarea) => (
                <TareaItem key={tarea.id} tarea={tarea} />
              ))}
            </ul>
          )}
        </Card>
      </main>
    </>
  );
}