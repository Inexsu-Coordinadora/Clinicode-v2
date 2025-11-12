import { ICitasMedicas } from "../../dominio/entidades/CitasMedicas/ICitasMedicas.js";
import { ICitasMedicasRepositorio } from "../../dominio/repository/ICitasMedicasRepositorio.js";

export class ObtenerCitaMedicaPorIdCasoUso {
    constructor(private repositorio: ICitasMedicasRepositorio) { }

    async ejecutar(id_cita: string): Promise<ICitasMedicas | null> {
        return await this.repositorio.obtenerCitaMedicaPorID(id_cita);
    }
}