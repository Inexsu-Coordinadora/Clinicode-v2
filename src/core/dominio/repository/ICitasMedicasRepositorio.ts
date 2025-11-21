import { ActualizarCitaMedicaDTO } from "../../infraestructura/esquemas/CitaMedicaEsquemas/ActualizarCitaMedicaEsquema";
import { CrearCitaMedicaDTO } from "../../infraestructura/esquemas/CitaMedicaEsquemas/CrearCitaMedicaEsquema";
import { ICitasMedicas } from "../entidades/CitasMedicas/ICitasMedicas";

export interface ICitasMedicasRepositorio {
    crearCitaMedica(citaMedica: ICitasMedicas): Promise<ICitasMedicas>;
    obtenerCitasMedicas(): Promise<ICitasMedicas[]>;
    obtenerCitaMedicaPorID(idCita: string): Promise<ICitasMedicas | null>;
    actualizarCitaMedica(idCita: string, datosCita: ActualizarCitaMedicaDTO): Promise<ICitasMedicas | null>;
    eliminarCitaMedica(idCita: string): Promise<boolean>;
    validarConflictosDeAgenda(cita: CrearCitaMedicaDTO): Promise<string | null>;
}