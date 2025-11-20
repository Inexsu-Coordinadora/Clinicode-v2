import { ICitasMedicas } from "../../dominio/entidades/CitasMedicas/ICitasMedicas";
import { ICitasMedicasRepositorio } from "../../dominio/repository/ICitasMedicasRepositorio";


export class ActualizarCitaMedicaCasoUso {
    constructor(private repositorio: ICitasMedicasRepositorio) { }

    async ejecutar(id_cita: string, datos: ICitasMedicas): Promise<ICitasMedicas | null> {
        datos.actualizadaEn = new Date().toISOString();
        return await this.repositorio.actualizarCitaMedica(id_cita, datos);
    }
}