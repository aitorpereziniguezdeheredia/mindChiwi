import Link from "next/link";
import { listarPacientes } from "@/back/services/pacientes";

export default async function PacientesPage() {
  const pacientes = await listarPacientes();

  return (
    <main>
      <h1>Pacientes</h1>
      <Link href="/pacientes/nuevo">+ Nuevo paciente</Link>

      {pacientes.length === 0 ? (
        <p>Todavía no hay pacientes.</p>
      ) : (
        <ul>
          {pacientes.map((paciente) => (
            <li key={paciente.id}>
              {paciente.nombre} {paciente.apellidos}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}