import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FormField } from "./FormField";

describe("FormField", () => {
  it("muestra la etiqueta y lo que se le pase dentro", () => {
    render(
      <FormField label="Nombre" htmlFor="nombre">
        <input id="nombre" />
      </FormField>
    );

    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
  });

  it("muestra el mensaje de error cuando se le pasa uno", () => {
    render(
      <FormField label="Nombre" htmlFor="nombre" error="El nombre es obligatorio">
        <input id="nombre" />
      </FormField>
    );

    expect(screen.getByText("El nombre es obligatorio")).toBeInTheDocument();
  });

  it("no muestra ningún mensaje de error si no se le pasa", () => {
    render(
      <FormField label="Nombre" htmlFor="nombre">
        <input id="nombre" />
      </FormField>
    );

    expect(screen.queryByText(/obligatorio/)).not.toBeInTheDocument();
  });
});