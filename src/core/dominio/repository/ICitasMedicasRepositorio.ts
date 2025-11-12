import { ICitasMedicas } from "../entidades/CitasMedicas/ICitasMedicas.js";

export interface ICitasMedicasRepositorio {
    crearCitaMedica(citaMedica: ICitasMedicas): Promise<ICitasMedicas>;
    obtenerCitasMedicas(): Promise<ICitasMedicas[]>;
    obtenerCitaMedicaPorID(id_cita: string): Promise<ICitasMedicas | null>;
    actualizarCitaMedica(id_cita: string, datosCita: ICitasMedicas): Promise<ICitasMedicas | null>;
    eliminarCitaMedica(id_cita: string): Promise<boolean>;
}