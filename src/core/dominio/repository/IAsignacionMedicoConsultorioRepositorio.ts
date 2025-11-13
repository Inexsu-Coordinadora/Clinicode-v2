import { IAsignacionMedicoConsultorio } from "../entidades/asignacionMedicoConsultorio/IAsignacionMedicoConsultorio.js";

export interface IAsignacionMedicoConsultorioRepositorio {
    crearAsignacionMedicoConsultorio(datosAsignacion: IAsignacionMedicoConsultorio): 
    Promise<IAsignacionMedicoConsultorio>;
    
    listarAsignacionMedicoConsultorio(limite?: number): Promise<IAsignacionMedicoConsultorio[]>;
    
    obtenerAsignacionMedicoConsultorioPorId(idAsignacion: string): Promise<IAsignacionMedicoConsultorio | null>;
    
    actualizarAsignacionMedicoConsultorio(idAsignacion: string, datosAsignacion: IAsignacionMedicoConsultorio): 
    Promise<IAsignacionMedicoConsultorio | null>;
    
    eliminarAsignacionMedicoConsultorio(idAsignacion: string): Promise<void>;
    
    obtenerMedicoPorId(idMedico: string): Promise<any| null>;
    
    obtenerConsultorioPorId(idConsultorio: string): Promise<any | null>;
    
    buscarAsignacionesPorConsultorio(idConsultorio: string): Promise<IAsignacionMedicoConsultorio[]>;
    
    buscarAsignacionesPorMedico(idMedico: string): Promise<IAsignacionMedicoConsultorio[]>;
    
    buscarAsignacionDuplicada(datos: IAsignacionMedicoConsultorio): Promise<IAsignacionMedicoConsultorio | null>;
};
