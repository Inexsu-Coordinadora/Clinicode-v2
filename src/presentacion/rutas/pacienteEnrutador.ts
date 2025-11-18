import { crearPacienteControlador, listarPacienesControlador, obtenerPacientePorIdControlador } from "../controladores/pacienteControlador.js";
import { actualizarPacienteControlador, eliminarPacienteControlador } from "../controladores/pacienteControlador.js";
import { FastifyInstance } from "fastify";

export async function pacienteEnrutador(app: FastifyInstance) {
    app.get('/pacientes',listarPacienesControlador);
    app.get('/pacientes/:id_paciente',obtenerPacientePorIdControlador);
    app.post('/pacientes', crearPacienteControlador);
    app.put('/pacientes/:id_paciente',actualizarPacienteControlador);
    app.delete('/pacientes/:id_paciente',eliminarPacienteControlador);
};