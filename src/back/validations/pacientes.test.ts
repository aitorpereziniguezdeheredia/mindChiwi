import { describe, it, expect } from "vitest";
import { pacienteSchema } from "./pacientes";

describe("pacienteSchema", () => {
  it("acepta datos válidos", () => {
    const resultado = pacienteSchema.safeParse({
      nombre: "Martina",
      apellidos: "Ruiz",
      fechaNacimiento: "2017-03-10",
    });

    expect(resultado.success).toBe(true);
  });

  it("rechaza un nombre demasiado corto", () => {
    const resultado = pacienteSchema.safeParse({
      nombre: "M",
      apellidos: "Ruiz",
      fechaNacimiento: "2017-03-10",
    });

    expect(resultado.success).toBe(false);
  });

  it("rechaza si falta la fecha de nacimiento", () => {
    const resultado = pacienteSchema.safeParse({
      nombre: "Martina",
      apellidos: "Ruiz",
    });

    expect(resultado.success).toBe(false);
  });
});