import { requireSession } from "@/back/auth/require-session";
import { AppShell } from "@/front/components/layout/AppShell";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  await requireSession();

  return <AppShell>{children}</AppShell>;
}