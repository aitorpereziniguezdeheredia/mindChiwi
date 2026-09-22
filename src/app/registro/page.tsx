import Link from "next/link";
import { SignUpForm } from "@/front/components/auth/SignUpForm";
import { Card } from "@/front/components/ui/Card";

export default function RegistroPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl font-medium text-[var(--ink)] mb-6 text-center">
          Crear cuenta
        </h1>
        <Card>
          <SignUpForm />
        </Card>
        <p className="mt-4 text-center text-sm text-[var(--ink-soft)]">
          ¿Ya tienes cuenta?{" "}
          <Link href="/login" className="text-[var(--pine)] underline">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </main>
  );
}