import { IAsignacionMedicoConsultorio } from "../entidades/asignacionMedicoConsultorio/IAsignacionMedicoConsultorio.js";

export interface IAsignacionMedicoConsultorioRepositorio {
    crearAsignacionMedicoConsultorio(datosAsignacion: IAsignacionMedicoConsultorio): Promise<string>;

    listarAsignacionMedicoConsultorio(limite?: number): Promise<IAsignacionMedicoConsultorio[]>;
    
    obtenerAsignacionMedicoConsultorioPorId(idAsignacion: string): Promise<IAsignacionMedicoConsultorio | null>;

    actualizarAsignacionMedicoConsultorio(idAsignacion: string, datosAsignacion: IAsignacionMedicoConsultorio): Promise<IAsignacionMedicoConsultorio | null>;
    
    eliminarAsignacionMedicoConsultorio(idAsignacion: string): Promise<void>;
};