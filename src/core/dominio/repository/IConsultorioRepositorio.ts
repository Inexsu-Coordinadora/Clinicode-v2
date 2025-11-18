import { Consultorio } from "../entidades/consultorios/IConsultorio.js";


export interface IConsultorioRepositorio {
    crear(consultorio: Consultorio): Promise<void>;
    listar(): Promise<Consultorio[]>;
    obtenerPorId(idConsultorio: string): Promise<Consultorio | null>;
}
