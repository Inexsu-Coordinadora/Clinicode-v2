import { Consultorio } from "../entidades/consultorios/IConsultorio.js";


export interface IConsultorioRepositorio {
    crear(consultorio: Consultorio): Promise<void>;
    listar(): Promise<Consultorio[]>;
    actualizar(id_consultorio: string, datos: any): Promise<Consultorio>;
    eliminar(id_consultorio: string): Promise<boolean>;
    actualizarDisponibilidad(id_onsultorio: string, disponible: boolean): Promise<void>;
    obtenerConsultorioPorID(id: string): Promise<Consultorio | null>;
}
