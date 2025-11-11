import { IAsignacionMedicoConsultorio } from "../../dominio/entidades/asignacionMedicoConsultorio/IAsignacionMedicoConsultorio.js";
import { IAsignacionMedicoConsultorioRepositorio } from "../../dominio/repository/IAsignacionMedicoConsultorioRepositorio.js";

export class CrearAsignacionMedicoConsultorio {
    constructor(private readonly repo: IAsignacionMedicoConsultorioRepositorio){}

    async ejecutar(datosAsignacion:IAsignacionMedicoConsultorio): Promise<IAsignacionMedicoConsultorio> {
        const asignacionCreada = await this.repo.crearAsignacionMedicoConsultorio(datosAsignacion);
        return asignacionCreada;
    }
};