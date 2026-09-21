import { z } from "zod";

export const sesionSchema = z.object({
  fecha: z.coerce.date(),
  duracionMinutos: z.coerce.number().int().positive(),
  observaciones: z.string().optional(),
});

export type SesionInput = z.infer<typeof sesionSchema>;