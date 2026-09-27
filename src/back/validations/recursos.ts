export const categoriasRecurso = [
  "EMOCIONES",
  "AUTOESTIMA",
  "HABILIDADES_SOCIALES",
  "ATENCION",
  "REGULACION_EMOCIONAL",
  "FRUSTRACION",
  "MIEDOS",
] as const;

export const etiquetasCategoriaRecurso: Record<(typeof categoriasRecurso)[number], string> = {
  EMOCIONES: "Emociones",
  AUTOESTIMA: "Autoestima",
  HABILIDADES_SOCIALES: "Habilidades sociales",
  ATENCION: "Atención",
  REGULACION_EMOCIONAL: "Regulación emocional",
  FRUSTRACION: "Frustración",
  MIEDOS: "Miedos",
};