import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/back/auth/auth";

export default async function PacientesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  return <>{children}</>;
}