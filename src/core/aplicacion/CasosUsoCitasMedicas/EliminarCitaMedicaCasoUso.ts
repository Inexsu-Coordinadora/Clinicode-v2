import { ICitasMedicasRepositorio } from "../../dominio/repository/ICitasMedicasRepositorio.js";

export class EliminarCitaMedicaCasoUso {
    constructor(private repositorio: ICitasMedicasRepositorio) { }

    async ejecutar(idCita: string): Promise<boolean> {
        return await this.repositorio.eliminarCitaMedica(idCita);
    }
}