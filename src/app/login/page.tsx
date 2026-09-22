import Link from "next/link";
import { SignInForm } from "@/front/components/auth/SignInForm";
import { Card } from "@/front/components/ui/Card";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl font-medium text-[var(--ink)] mb-6 text-center">
          Iniciar sesión
        </h1>
        <Card>
          <SignInForm />
        </Card>
        <p className="mt-4 text-center text-sm text-[var(--ink-soft)]">
          ¿No tienes cuenta?{" "}
          <Link href="/registro" className="text-[var(--pine)] underline">
            Crear cuenta
          </Link>
        </p>
      </div>
    </main>
  );
}