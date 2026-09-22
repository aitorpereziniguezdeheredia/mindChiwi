"use client";

import { useState } from "react";
import { signIn } from "@/front/lib/auth-client";
import { Button } from "@/front/components/ui/Button";
import { FormField, inputStyles } from "@/front/components/ui/FormField";

export function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await signIn.email({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message ?? "Email o contraseña incorrectos.");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Email" htmlFor="email">
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={inputStyles}
        />
      </FormField>
      <FormField label="Contraseña" htmlFor="password">
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={inputStyles}
        />
      </FormField>
      {error && <p className="text-sm text-[var(--clay)] mb-4">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Entrando..." : "Iniciar sesión"}
      </Button>
    </form>
  );
}