import { IPaciente } from "../entidades/pacientes/Ipaciente.js";

export interface IPacienteRepositorio {
    crearPaciente(datosPaciente: IPaciente): Promise<string>;
    listarPacientes(limite?: number): Promise<IPaciente[]>;
    obtenerPacientePorId(id_paciente: string): Promise<IPaciente | null>;
    actualizarPaciente(id_paciente: string, datosPaciente: IPaciente): Promise<IPaciente>;
    eliminarPaciente(id_paciente: string): Promise<void>;
};