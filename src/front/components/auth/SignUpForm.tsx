"use client";

import { useState } from "react";
import { signUp } from "@/front/lib/auth-client";
import { Button } from "@/front/components/ui/Button";
import { FormField, inputStyles } from "@/front/components/ui/FormField";

export function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await signUp.email({ name, email, password });

    setLoading(false);

    if (error) {
      setError(error.message ?? "Algo salió mal, inténtalo de nuevo.");
      return;
    }

    window.location.href = "/dashboard";
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormField label="Nombre" htmlFor="name">
        <input id="name" value={name} onChange={(e) => setName(e.target.value)} required className={inputStyles} />
      </FormField>
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
          minLength={8}
          className={inputStyles}
        />
      </FormField>
      {error && <p className="text-sm text-[var(--clay)] mb-4">{error}</p>}
      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Creando cuenta..." : "Registrarme"}
      </Button>
    </form>
  );
}