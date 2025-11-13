import { IAsignacionMedicoConsultorio } from "../../dominio/entidades/asignacionMedicoConsultorio/IAsignacionMedicoConsultorio.js";
import { IAsignacionMedicoConsultorioRepositorio } from "../../dominio/repository/IAsignacionMedicoConsultorioRepositorio.js";

export class ObtenerAsignacionMedicoConsultorioID {
    constructor(private readonly repo: IAsignacionMedicoConsultorioRepositorio){}

    async ejecutar (idAsignacion:string): Promise<IAsignacionMedicoConsultorio | null>{
        const asignacionObtenida = this.repo.obtenerAsignacionMedicoConsultorioPorId(idAsignacion);
        return await asignacionObtenida;
    }
};