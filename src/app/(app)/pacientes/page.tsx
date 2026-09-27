import Link from "next/link";
import { listarPacientes } from "@/back/services/pacientes";
import { PageHeader } from "@/front/components/ui/PageHeader";
import { Card } from "@/front/components/ui/Card";
import { Avatar } from "@/front/components/ui/Avatar";
import { buttonBase, buttonStyles } from "@/front/components/ui/Button";
import { calcularEdad } from "@/front/lib/calcularEdad";
import { etiquetasCategoria } from "@/back/validations/objetivos";

export default async function PacientesPage() {
  const pacientes = await listarPacientes();

  return (
    <>
      <PageHeader
        title="Pacientes"
        description={`${pacientes.length} pacientes activos`}
        action={
          <Link href="/pacientes/nuevo" className={`${buttonBase} ${buttonStyles.primary}`}>
            + Nuevo paciente
          </Link>
        }
      />

      {pacientes.length === 0 ? (
        <p className="text-sm text-[var(--ink-soft)]">Todavía no hay pacientes.</p>
      ) : (
        <div className="space-y-3">
          {pacientes.map((paciente) => {
            const proximaSesion = paciente.sesiones[0];
            const objetivoActivo = paciente.objetivos[0];

            return (
              <Link key={paciente.id} href={`/pacientes/${paciente.id}`}>
                <Card className="flex items-center gap-4 hover:border-[var(--pine)] transition-colors">
                  <Avatar nombre={paciente.nombre} apellidos={paciente.apellidos} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{paciente.nombre} {paciente.apellidos}</p>
                    <p className="text-xs text-[var(--ink-soft)]">
                      {calcularEdad(paciente.fechaNacimiento)} años
                      {objetivoActivo && ` · ${etiquetasCategoria[objetivoActivo.categoria]}`}
                    </p>
                  </div>
                  {proximaSesion && (
                    <p className="text-xs text-[var(--ink-soft)] shrink-0">
                      Próxima: {proximaSesion.fecha.toLocaleDateString("es-ES", { weekday: "short", day: "numeric" })}
                    </p>
                  )}
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}