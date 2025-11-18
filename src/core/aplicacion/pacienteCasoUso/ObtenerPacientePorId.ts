import { IPaciente } from "../../dominio/entidades/pacientes/Ipaciente.js";
import { IPacienteRepositorio } from "../../dominio/repository/IPacienteRepositorio.js";

export class ObtenerPacientePorId {
    constructor(private readonly repo: IPacienteRepositorio) {}

    async ejecutar(id_paciente: string): Promise<IPaciente | null> {
        const pacienteObtenido = await this.repo.obtenerPacientePorId(id_paciente);
        return pacienteObtenido;
    }
};