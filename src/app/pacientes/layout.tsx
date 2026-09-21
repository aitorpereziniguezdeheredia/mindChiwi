import { requireSession } from "@/back/auth/require-session";

export default async function PacientesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireSession();

  return <>{children}</>;
}