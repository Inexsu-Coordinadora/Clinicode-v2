import { IPacienteRepositorio } from "../../dominio/repository/IPacienteRepositorio.js";

export class EliminarPaciente {
    constructor(private readonly repo: IPacienteRepositorio) {}

    async ejecutar(id_paciente: string): Promise<void>{
        await this.repo.eliminarPaciente(id_paciente);
    }
};
