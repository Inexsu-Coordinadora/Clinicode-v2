import { IServicioConsultarCitasPacientesRepositorio } from "../../dominio/repository/IServicioConsultarCitasPacientesRepositorio.js";
import { ServicioConsultarCitasPacienteEsquema } from "../../infraestructura/esquemas/ServicioConsultarCitasPacienteEsquema.js";
import { ErrorAplicacion } from "../../infraestructura/manejoErrores/manejadorErrores.js";

export class ServicioConsultarCitasPacienteCasoUso {
  constructor(
    private readonly consultarCitasRepositorio: IServicioConsultarCitasPacientesRepositorio
  ) {}

  async consultarCitasMedicas(numeroDocumento: string) {
    const validacion = ServicioConsultarCitasPacienteEsquema.safeParse({
      numero_documento: numeroDocumento,
    });

    if (!validacion.success) {
      const mensajeError = validacion.error.issues
        .map((e) => e.message)
        .join(", ");
      throw new ErrorAplicacion(400, mensajeError);
    }

    try {
      const citas = await this.consultarCitasRepositorio.obtenerCitasPorPaciente(numeroDocumento);
      return citas || [];
    } catch (error) {
      if (error instanceof ErrorAplicacion) throw error;
      throw new ErrorAplicacion(500, "Error al consultar las citas del paciente");
    }
  }
}
