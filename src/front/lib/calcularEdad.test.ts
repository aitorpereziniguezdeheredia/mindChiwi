import { describe, it, expect } from "vitest";
import { calcularEdad } from "./calcularEdad";

describe("calcularEdad", () => {
  it("calcula bien cuando ya pasó el cumpleaños este año", () => {
    const haceOchoAnos = new Date();
    haceOchoAnos.setFullYear(haceOchoAnos.getFullYear() - 8);
    haceOchoAnos.setDate(haceOchoAnos.getDate() - 1);

    expect(calcularEdad(haceOchoAnos)).toBe(8);
  });

  it("resta un año si el cumpleaños todavía no ha llegado", () => {
    const nacimiento = new Date();
    nacimiento.setFullYear(nacimiento.getFullYear() - 8);
    nacimiento.setDate(nacimiento.getDate() + 1);

    expect(calcularEdad(nacimiento)).toBe(7);
  });
});