import { z } from "zod";

export const pacienteSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  apellidos: z.string().min(2, "Los apellidos deben tener al menos 2 caracteres"),
  fechaNacimiento: z.coerce.date(),
  notas: z.string().optional(),
});

export type PacienteInput = z.infer<typeof pacienteSchema>;