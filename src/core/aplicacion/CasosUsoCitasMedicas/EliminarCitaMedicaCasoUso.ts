import { ICitasMedicasRepositorio } from "../../dominio/repository/ICitasMedicasRepositorio.js";

export class EliminarCitaMedicaCasoUso {
    constructor(private repositorio: ICitasMedicasRepositorio) { }

    async ejecutar(id_cita: string): Promise<boolean> {
        return await this.repositorio.eliminarCitaMedica(id_cita);
    }
}