import Link from "next/link";
import { listarPacientes } from "@/back/services/pacientes";
import { AppNav } from "@/front/components/layout/AppNav";
import { PageHeader } from "@/front/components/ui/PageHeader";
import { Card } from "@/front/components/ui/Card";
import { buttonBase, buttonStyles } from "@/front/components/ui/Button";
import { calcularEdad } from "@/front/lib/calcularEdad";

export default async function PacientesPage() {
  const pacientes = await listarPacientes();

  return (
    <>
      <AppNav />
      <main className="max-w-5xl mx-auto px-7 py-10">
        <PageHeader
          title="Pacientes"
          action={
            <Link href="/pacientes/nuevo" className={`${buttonBase} ${buttonStyles.primary}`}>
              + Nuevo paciente
            </Link>
          }
        />

        {pacientes.length === 0 ? (
          <p className="text-sm text-[var(--ink-soft)]">Todavía no hay pacientes.</p>
        ) : (
          <Card>
            <ul>
              {pacientes.map((paciente) => (
                <li key={paciente.id} className="border-t border-[var(--line)] first:border-t-0">
                  <Link
                    href={`/pacientes/${paciente.id}`}
                    className="flex items-center justify-between py-3 text-sm hover:text-[var(--pine)]"
                  >
                    <span>{paciente.nombre} {paciente.apellidos}</span>
                    <span className="text-[var(--ink-soft)]">{calcularEdad(paciente.fechaNacimiento)} años</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </main>
    </>
  );
}