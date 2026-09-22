import { PacienteForm } from "@/front/components/pacientes/PacienteForm";
import { crearPacienteAction } from "@/back/actions/pacientes";
import { AppNav } from "@/front/components/layout/AppNav";
import { PageHeader } from "@/front/components/ui/PageHeader";
import { Card } from "@/front/components/ui/Card";

export default function NuevoPacientePage() {
  return (
    <>
      <AppNav />
      <main className="max-w-5xl mx-auto px-7 py-10">
        <PageHeader title="Nuevo paciente" />
        <Card className="max-w-lg">
          <PacienteForm action={crearPacienteAction} submitLabel="Crear paciente" />
        </Card>
      </main>
    </>
  );
}