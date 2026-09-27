import { listarPacientes } from "@/back/services/pacientes";
import { SesionDesdeCalendarioForm } from "@/front/components/sesiones/SesionDesdeCalendarioForm";
import { PageHeader } from "@/front/components/ui/PageHeader";
import { Card } from "@/front/components/ui/Card";

export default async function NuevaSesionPage() {
  const pacientes = await listarPacientes();

  return (
    <>
      <PageHeader title="Nueva sesión" />
      <Card className="max-w-lg">
        <SesionDesdeCalendarioForm pacientes={pacientes} />
      </Card>
    </>
  );
}