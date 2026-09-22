import { z } from "zod";

export const categorias = [
  "REGULACION_EMOCIONAL",
  "HABILIDADES_SOCIALES",
  "AUTOESTIMA",
  "ATENCION",
  "FRUSTRACION",
] as const;

export const objetivoSchema = z.object({
  nombre: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  categoria: z.enum(categorias),
});

export type ObjetivoInput = z.infer<typeof objetivoSchema>;

export const etiquetasCategoria: Record<(typeof categorias)[number], string> = {
  REGULACION_EMOCIONAL: "Regulación emocional",
  HABILIDADES_SOCIALES: "Habilidades sociales",
  AUTOESTIMA: "Autoestima",
  ATENCION: "Atención",
  FRUSTRACION: "Gestión de la frustración",
};