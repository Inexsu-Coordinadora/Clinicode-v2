import { IServicioConsultarCitasPacientesRepositorio } from "../../dominio/repository/IServicioConsultarCitasPacientesRepositorio.js";
import { ServicioConsultarCitasPacienteEsquema } from "../../infraestructura/esquemas/ServicioConsultarCitasPacienteEsquema.js";

export class ServicioConsultarCitasPacienteCasoUso {
  constructor(private readonly consultarCitasRepositorio: IServicioConsultarCitasPacientesRepositorio) {}

  async consultarCitasMedicas(numeroDocumento: string) {
    const validacion = ServicioConsultarCitasPacienteEsquema.safeParse({
      numero_documento: numeroDocumento,
    });

    if (!validacion.success) {
      const mensajeError = validacion.error.issues
        .map((e: { message: string }) => e.message)
        .join(", ");
      throw { codigo: 400, mensaje: mensajeError };
    }

    const citas = await this.consultarCitasRepositorio.obtenerCitasPorPaciente(numeroDocumento);

    return citas; 
  }
}
