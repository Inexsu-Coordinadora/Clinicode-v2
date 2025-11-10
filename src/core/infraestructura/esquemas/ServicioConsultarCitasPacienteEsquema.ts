import { z } from "zod";

export const ServicioConsultarCitasPacienteEsquema = z.object({
  numero_documento: z
    .string()
    .nonempty("El número de documento del paciente es obligatorio")
    .min(10, "El número de documento debe tener al menos 10 caracteres")
    .max(10, "El número de documento no puede superar los 10 caracteres"),
});

export type ConsultarCitasPacienteDTO = z.infer<typeof ServicioConsultarCitasPacienteEsquema>;
