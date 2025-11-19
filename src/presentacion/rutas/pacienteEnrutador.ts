import { crearPacienteControlador, listarPacienesControlador, obtenerPacientePorIdControlador } from "../controladores/pacienteControlador.js";
import { actualizarPacienteControlador, eliminarPacienteControlador } from "../controladores/pacienteControlador.js";
import { FastifyInstance } from "fastify";

export async function pacienteEnrutador(app: FastifyInstance) {
    app.get('/pacientes',listarPacienesControlador);
    app.get('/pacientes/:idPaciente',obtenerPacientePorIdControlador);
    app.post('/pacientes', crearPacienteControlador);
    app.put('/pacientes/:idPaciente',actualizarPacienteControlador);
    app.delete('/pacientes/:idPaciente',eliminarPacienteControlador);
};