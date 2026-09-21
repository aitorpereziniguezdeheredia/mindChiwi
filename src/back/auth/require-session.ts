import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/back/auth/auth";

export async function requireSession() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/login");
  }

  return session;
}