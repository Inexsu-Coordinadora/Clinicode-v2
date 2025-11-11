import { FastifyRequest, FastifyReply } from "fastify";
import { ServicioConsultarCitasPacienteRepositorioSupabase } from "../../core/infraestructura/repositorios/servicioConsultarCitasPacienteRepositorioSupabase.js";
import { ServicioConsultarCitasPacienteCasoUso } from "../../core/aplicacion/casoUsoServicioConsultarCitasPaciente/servicioConsultarCitasPaciente.js";
import { respuestaError } from "../../core/infraestructura/manejoErrores/manejadorErrores.js";

const repo = new ServicioConsultarCitasPacienteRepositorioSupabase();
const casoUso = new ServicioConsultarCitasPacienteCasoUso(repo);

export const obtenerCitasPorPaciente = async (
  req: FastifyRequest<{ Params: { numeroDocumento: string } }>,
  res: FastifyReply
) => {
  try {
    const { numeroDocumento } = req.params;
    const citas = await casoUso.consultarCitasMedicas(numeroDocumento);

    res.status(200).send({
      exito: true,
      data: citas,
    });
  } catch (error) {
    const err = respuestaError(error);
    res.status(err.codigo).send(err);
  }
};
