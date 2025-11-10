import { FastifyRequest, FastifyReply } from "fastify";
import { servicioConsultarCitasPacienteRepositorioSupabase } from "../../core/infraestructura/repositorios/servicioConsultarCitasPacienteRepositorioSupabase.js";
import { ServicioConsultarCitasPacienteCasoUso } from "../../core/aplicacion/casoUsoServicioConsultarCitasPaciente/servicioConsultarCitasPaciente.js";

const citaRepo = new servicioConsultarCitasPacienteRepositorioSupabase();
const consultarCitasPacienteCasoUso = new ServicioConsultarCitasPacienteCasoUso(citaRepo);

export const obtenerCitasPorPaciente = async (
  req: FastifyRequest<{ Params: { numeroDocumento: string } }>,
  res: FastifyReply
): Promise<void> => {
  try {
    const { numeroDocumento } = req.params;
    const citas = await consultarCitasPacienteCasoUso.consultarCitasMedicas(numeroDocumento);

    res.status(200).send({
      exito: true,
      data: citas,
    });
  } catch (error: unknown) {
    if (typeof error === "object" && error !== null && "mensaje" in error) {
      const err = error as { codigo?: number; mensaje?: string };
      res.status(err.codigo || 500).send({
        exito: false,
        mensaje: err.mensaje || "Error interno del servidor",
      });
    } else {
      res.status(500).send({
        exito: false,
        mensaje: "Error interno del servidor",
      });
    }
  }
};
