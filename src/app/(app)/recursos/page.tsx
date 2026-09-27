import { listarRecursos } from "@/back/services/recursos";
import { RecursosFiltrados } from "@/front/components/recursos/RecursosFiltrados";
import { PageHeader } from "@/front/components/ui/PageHeader";

export default async function RecursosPage() {
  const recursos = await listarRecursos();

  return (
    <>
      <PageHeader title="Biblioteca de recursos" description="Actividades organizadas por lo que trabajan" />
      <RecursosFiltrados recursos={recursos} />
    </>
  );
}