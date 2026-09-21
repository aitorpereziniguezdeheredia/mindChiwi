import { requireSession } from "@/back/auth/require-session";

export default async function DashboardPage() {
  const session = await requireSession();

  return (
    <main>
      <h1>Bienvenido, {session.user.name}</h1>
    </main>
  );
}