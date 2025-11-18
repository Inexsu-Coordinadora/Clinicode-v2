import { FastifyInstance } from "fastify";
import { obtenerCitasPorPaciente } from "../controladores/servicioConsultarCitasPacienteControlador.js";

export async function servicioConsultarCitasPacienteEnrutador(app: FastifyInstance) {
  app.get("/paciente/:numeroDocumento/citas", obtenerCitasPorPaciente);
}
