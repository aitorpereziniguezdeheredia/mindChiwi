import { notFound } from "next/navigation";
import { obtenerPaciente } from "@/back/services/pacientes";
import { listarSesionesDePaciente } from "@/back/services/sesiones";
import { listarObjetivosDePaciente } from "@/back/services/objetivos";
import { actualizarPacienteAction, eliminarPacienteAction } from "@/back/actions/pacientes";
import { crearSesionAction } from "@/back/actions/sesiones";
import { crearObjetivoAction } from "@/back/actions/objetivos";
import { PacienteForm } from "@/front/components/pacientes/PacienteForm";
import { SesionForm } from "@/front/components/sesiones/SesionForm";
import { ObjetivoForm } from "@/front/components/objetivos/ObjetivoForm";
import { ObjetivoItem } from "@/front/components/objetivos/ObjetivoItem";
import { AppNav } from "@/front/components/layout/AppNav";
import { PageHeader } from "@/front/components/ui/PageHeader";
import { Card } from "@/front/components/ui/Card";
import { Button } from "@/front/components/ui/Button";

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

  const [sesiones, objetivos] = await Promise.all([
    listarSesionesDePaciente(paciente.id),
    listarObjetivosDePaciente(paciente.id),
  ]);

  const actualizarConId = actualizarPacienteAction.bind(null, paciente.id);
  const eliminarConId = eliminarPacienteAction.bind(null, paciente.id);
  const crearSesionConId = crearSesionAction.bind(null, paciente.id);
  const crearObjetivoConId = crearObjetivoAction.bind(null, paciente.id);

  return (
    <>
      <AppNav />
      <main className="max-w-5xl mx-auto px-7 py-10">
        <PageHeader
          title={`${paciente.nombre} ${paciente.apellidos}`}
          action={
            <form action={eliminarConId}>
              <Button type="submit" variant="danger">
                Eliminar paciente
              </Button>
            </form>
          }
        />

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="md:col-span-2 max-w-lg">
            <h2 className="font-display text-lg font-medium mb-3">Datos del paciente</h2>
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
          </Card>

          <Card>
            <h2 className="font-display text-lg font-medium mb-3">Sesiones</h2>
            <SesionForm action={crearSesionConId} />
            {sesiones.length === 0 ? (
              <p className="text-sm text-[var(--ink-soft)]">Todavía no hay sesiones registradas.</p>
            ) : (
              <ul>
                {sesiones.map((sesion) => (
                  <li key={sesion.id} className="border-t border-[var(--line)] first:border-t-0 py-3">
                    <p className="text-sm">
                      <span className="text-[var(--ink-soft)]">{sesion.fecha.toLocaleDateString()}</span> — {sesion.duracionMinutos} min
                    </p>
                    {sesion.observaciones && (
                      <p className="text-sm text-[var(--ink-soft)] mt-1">{sesion.observaciones}</p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <Card>
            <h2 className="font-display text-lg font-medium mb-3">Objetivos</h2>
            <ObjetivoForm action={crearObjetivoConId} />
            {objetivos.length === 0 ? (
              <p className="text-sm text-[var(--ink-soft)]">Todavía no hay objetivos.</p>
            ) : (
              <ul>
                {objetivos.map((o) => (
                  <ObjetivoItem key={o.id} objetivo={o} pacienteId={paciente.id} />
                ))}
              </ul>
            )}
          </Card>
        </div>
      </main>
    </>
  );
}