import { PacienteForm } from "@/front/components/pacientes/PacienteForm";
import { crearPacienteAction } from "@/back/actions/pacientes";

export default function NuevoPacientePage() {
  return (
    <main>
      <h1>Nuevo paciente</h1>
      <PacienteForm action={crearPacienteAction} submitLabel="Crear paciente" />
    </main>
  );
}