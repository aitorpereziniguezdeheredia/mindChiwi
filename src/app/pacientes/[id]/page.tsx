import { notFound } from "next/navigation";
import { obtenerPaciente } from "@/back/services/pacientes";
import { listarSesionesDePaciente } from "@/back/services/sesiones";
import {
  actualizarPacienteAction,
  eliminarPacienteAction,
} from "@/back/actions/pacientes";
import { crearSesionAction } from "@/back/actions/sesiones";
import { PacienteForm } from "@/front/components/pacientes/PacienteForm";
import { SesionForm } from "@/front/components/sesiones/SesionForm";
import { listarObjetivosDePaciente } from "@/back/services/objetivos";
import { crearObjetivoAction } from "@/back/actions/objetivos";
import { ObjetivoForm } from "@/front/components/objetivos/ObjetivoForm";
import { ObjetivoItem } from "@/front/components/objetivos/ObjetivoItem";

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

  const sesiones = await listarSesionesDePaciente(paciente.id);
  const objetivos = await listarObjetivosDePaciente(paciente.id);
  const crearObjetivoConId = crearObjetivoAction.bind(null, paciente.id);

  const actualizarConId = actualizarPacienteAction.bind(null, paciente.id);
  const eliminarConId = eliminarPacienteAction.bind(null, paciente.id);
  const crearSesionConId = crearSesionAction.bind(null, paciente.id);

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

      <h2>Sesiones</h2>
      <SesionForm action={crearSesionConId} />

      {sesiones.length === 0 ? (
        <p>Todavía no hay sesiones registradas.</p>
      ) : (
        <ul>
          {sesiones.map((sesion) => (
            <li key={sesion.id}>
              {sesion.fecha.toLocaleDateString()} — {sesion.duracionMinutos} min
              {sesion.observaciones && <p>{sesion.observaciones}</p>}
            </li>
          ))}
        </ul>
      )}
      <h2>Objetivos</h2>
      <ObjetivoForm action={crearObjetivoConId} />

      {objetivos.length === 0 ? (
        <p>Todavía no hay objetivos.</p>
      ) : (
        <ul>
          {objetivos.map((o) => (
            <ObjetivoItem key={o.id} objetivo={o} pacienteId={paciente.id} />
          ))}
        </ul>
      )}
    </main>
  );
}
