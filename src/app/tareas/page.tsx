import { listarTareas } from "@/back/services/tareas";
import { listarPacientes } from "@/back/services/pacientes";
import { TareaForm } from "@/front/components/tareas/TareaForm";
import { TareaItem } from "@/front/components/tareas/TareaItem";

export default async function TareasPage() {
  const [tareas, pacientes] = await Promise.all([listarTareas(), listarPacientes()]);

  return (
    <main>
      <h1>Tareas</h1>
      <TareaForm pacientes={pacientes} />

      {tareas.length === 0 ? (
        <p>No hay tareas todavía.</p>
      ) : (
        <ul>
          {tareas.map((tarea) => (
            <TareaItem key={tarea.id} tarea={tarea} />
          ))}
        </ul>
      )}
    </main>
  );
}