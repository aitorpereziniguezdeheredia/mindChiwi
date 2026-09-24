import { describe, it, expect } from "vitest";
import { tareaSchema } from "./tareas";

describe("tareaSchema", () => {
  it("acepta una tarea sin fecha ni paciente (ambos opcionales)", () => {
    const resultado = tareaSchema.safeParse({ titulo: "Preparar informe" });
    expect(resultado.success).toBe(true);
  });

  it("acepta un campo de fecha vacío (viene así de un formulario sin rellenar)", () => {
    const resultado = tareaSchema.safeParse({ titulo: "Preparar informe", fecha: "" });
    expect(resultado.success).toBe(true);
  });

  it("rechaza un título vacío", () => {
    const resultado = tareaSchema.safeParse({ titulo: "" });
    expect(resultado.success).toBe(false);
  });
});