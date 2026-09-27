import { PacienteForm } from "@/front/components/pacientes/PacienteForm";
import { crearPacienteAction } from "@/back/actions/pacientes";
import { PageHeader } from "@/front/components/ui/PageHeader";
import { Card } from "@/front/components/ui/Card";

export default function NuevoPacientePage() {
  return (
    <>
        <PageHeader title="Nuevo paciente" />
        <Card className="max-w-lg">
          <PacienteForm action={crearPacienteAction} submitLabel="Crear paciente" />
        </Card>
    </>
  );
}