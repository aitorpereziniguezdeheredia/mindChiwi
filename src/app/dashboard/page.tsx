import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/back/auth/auth";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  return (
    <main>
      <h1>Bienvenido, {session.user.name}</h1>
    </main>
  );
}