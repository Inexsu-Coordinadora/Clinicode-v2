import { IConsultarCitasPaciente } from "../entidades/servicioConsultarCitasPaciente/IConsultarCitasPaciente.js";

export interface IServicioConsultarCitasPacientesRepositorio {
  obtenerCitasPorPaciente(
    numeroDocumento: string
  ): Promise<{ mensaje: string; citas: IConsultarCitasPaciente[] }>;
}

