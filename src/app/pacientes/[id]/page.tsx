import { notFound } from "next/navigation";
import { obtenerPaciente } from "@/back/services/pacientes";
import { actualizarPacienteAction, eliminarPacienteAction } from "@/back/actions/pacientes";
import { PacienteForm } from "@/front/components/pacientes/PacienteForm";

export default async function PacienteDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const paciente = await obtenerPaciente(id);

  if (!paciente) {
    notFound();
  }

  const actualizarConId = actualizarPacienteAction.bind(null, paciente.id);
  const eliminarConId = eliminarPacienteAction.bind(null, paciente.id);

  return (
    <main>
      <h1>Editar paciente</h1>
      <PacienteForm
        action={actualizarConId}
        submitLabel="Guardar cambios"
        defaultValues={{
          nombre: paciente.nombre,
          apellidos: paciente.apellidos,
          fechaNacimiento: paciente.fechaNacimiento.toISOString().split("T")[0],
          notas: paciente.notas,
        }}
      />

      <form action={eliminarConId}>
        <button type="submit">Eliminar paciente</button>
      </form>
    </main>
  );
}