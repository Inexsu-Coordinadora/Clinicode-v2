import { ICitasMedicas } from "../../dominio/entidades/CitasMedicas/ICitasMedicas.js";
import { ICitasMedicasRepositorio } from "../../dominio/repository/ICitasMedicasRepositorio.js";
import { ActualizarCitaMedicaDTO } from "../../infraestructura/esquemas/CitaMedicaEsquemas/ActualizarCitaMedicaEsquema.js";


export class ActualizarCitaMedicaCasoUso {
    constructor(private repositorio: ICitasMedicasRepositorio) { }

    async ejecutar(id_cita: string, datos: ActualizarCitaMedicaDTO): Promise<ICitasMedicas | null> {
        datos.actualizadaEn = new Date().toISOString();
        return await this.repositorio.actualizarCitaMedica(id_cita, datos);
    }
}