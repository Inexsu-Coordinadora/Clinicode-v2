import { FastifyInstance } from "fastify";
import { servicioConsultarCitasPacienteRepositorioSupabase } from "../../core/infraestructura/repositorios/servicioConsultarCitasPacienteRepositorioSupabase.js";
import { ServicioConsultarCitasPacienteCasoUso } from "../../core/aplicacion/casoUsoServicioConsultarCitasPaciente/servicioConsultarCitasPaciente.js";
import { IServicioConsultarCitasPacientesRepositorio } from "../../core/dominio/repository/IServicioConsultarCitasPacientesRepositorio.js";

export async function servicioConsultarCitasPacienteEnrutador(app: FastifyInstance) {
  const servicioConsultarCitaRepositorio: IServicioConsultarCitasPacientesRepositorio = new servicioConsultarCitasPacienteRepositorioSupabase();
  const consultarCitasPaciente = new ServicioConsultarCitasPacienteCasoUso(servicioConsultarCitaRepositorio);

  app.get("/paciente/:numeroDocumento/citas", async (request, reply) => {
    try {
      const { numeroDocumento } = request.params as { numeroDocumento: string };
      const citas = await consultarCitasPaciente.consultarCitasMedicas(numeroDocumento);

      reply.send(citas);
    } catch (error: any) {
      reply.status(error.codigo || 500).send({
        error: error.mensaje || "Error interno del servidor",
      });
    }
  });
}
