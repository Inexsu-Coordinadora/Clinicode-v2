import { IPaciente } from "../../dominio/entidades/pacientes/Ipaciente.js";
import { IPacienteRepositorio } from "../../dominio/repository/IPacienteRepositorio.js";

export class ActualizarPaciente {
    constructor(private readonly repo: IPacienteRepositorio) {}

    async ejecutar(id_paciente: string, datosPaciente: IPaciente): Promise<IPaciente | null>{
        const pacienteActualizado = await this.repo.actualizarPaciente(id_paciente,datosPaciente);
        return pacienteActualizado || null;
    }
};