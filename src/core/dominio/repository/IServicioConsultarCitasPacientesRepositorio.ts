import { IConsultarCitasPaciente } from "../entidades/servicioConsultarCitasPaciente/IConsultarCitasPaciente.js";

export interface IServicioConsultarCitasPacientesRepositorio {
  obtenerCitasPorPaciente(numeroDocumento: string): Promise<IConsultarCitasPaciente[]>;
}
