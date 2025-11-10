import { ICitasMedicas } from "../entidades/CitasMedicas/ICitasMedicas.js";

export interface ICitasMedicasRepositorio {
    crearCitaMedica(citaMedica: ICitasMedicas): Promise<ICitasMedicas>;
    obtenerCitasMedicas(): Promise<ICitasMedicas[]>;
    obtenerCitaMedicaPorID(idCita: string): Promise<ICitasMedicas | null>;
    actualizarCitaMedica(idCita: string, datosCita: ICitasMedicas): Promise<ICitasMedicas | null>;
    eliminarCitaMedica(idCita: string): Promise<boolean>;
}