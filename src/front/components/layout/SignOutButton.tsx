"use client";

import { signOut } from "@/front/lib/auth-client";
import { Button } from "@/front/components/ui/Button";

export function SignOutButton() {
  async function handleSignOut() {
    await signOut();
    window.location.href = "/login";
  }

  return (
    <Button variant="secondary" onClick={handleSignOut} className="text-xs px-3 py-1.5">
      Cerrar sesión
    </Button>
  );
}