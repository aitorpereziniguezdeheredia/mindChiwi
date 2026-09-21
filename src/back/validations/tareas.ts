import { z } from "zod";

const vacioAUndefined = (val: unknown) => (val === "" ? undefined : val);

export const tareaSchema = z.object({
  titulo: z.string().min(2, "El título debe tener al menos 2 caracteres"),
  fecha: z.preprocess(vacioAUndefined, z.coerce.date().optional()),
  pacienteId: z.preprocess(vacioAUndefined, z.string().optional()),
});

export type TareaInput = z.infer<typeof tareaSchema>;