import { ICitasMedicas } from "../../dominio/entidades/CitasMedicas/ICitasMedicas.js";
import { ICitasMedicasRepositorio } from "../../dominio/repository/ICitasMedicasRepositorio.js";


export class ActualizarCitaMedicaCasoUso {
    constructor(private repositorio: ICitasMedicasRepositorio) { }

    async ejecutar(idCita: string, datos: ICitasMedicas): Promise<ICitasMedicas | null> {
        datos.actualizadaEn = new Date().toISOString();
        return await this.repositorio.actualizarCitaMedica(idCita, datos);
    }
}