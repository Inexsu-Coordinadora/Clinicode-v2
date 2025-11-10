import { IAsignacionMedicoConsultorio } from "../../dominio/entidades/asignacionMedicoConsultorio/IAsignacionMedicoConsultorio.js";
import { IAsignacionMedicoConsultorioRepositorio } from "../../dominio/repository/IAsignacionMedicoConsultorioRepositorio.js";


export class ActualizarAsignacionMedicoConsultorio {
    constructor(private readonly repo:IAsignacionMedicoConsultorioRepositorio ) {}

    async ejecutar (idAsignacion:string, datosAsignacion: IAsignacionMedicoConsultorio): 
    Promise<IAsignacionMedicoConsultorio | null> {
        const asignacionActualizada = this.repo.actualizarAsignacionMedicoConsultorio(idAsignacion,datosAsignacion);
        return await asignacionActualizada;
    }
};