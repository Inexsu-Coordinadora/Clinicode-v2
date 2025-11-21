import { ICitasMedicas } from "../../dominio/entidades/CitasMedicas/ICitasMedicas";
import { ICitasMedicasRepositorio } from "../../dominio/repository/ICitasMedicasRepositorio";
import { ActualizarCitaMedicaDTO } from "../../infraestructura/esquemas/CitaMedicaEsquemas/ActualizarCitaMedicaEsquema";


export class ActualizarCitaMedicaCasoUso {
    constructor(private repositorio: ICitasMedicasRepositorio) { }

    async ejecutar(id_cita: string, datos: ActualizarCitaMedicaDTO): Promise<ICitasMedicas | null> {
        datos.actualizadaEn = new Date().toISOString();
        return await this.repositorio.actualizarCitaMedica(id_cita, datos);
    }
}