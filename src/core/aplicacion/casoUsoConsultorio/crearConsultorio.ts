import { IConsultorioRepositorio } from "../../dominio/repository/IConsultorioRepositorio";
import { Consultorio } from "../../dominio/entidades/consultorios/IConsultorio";


export class CrearConsultorio {
    constructor(private repo: IConsultorioRepositorio) { }

    async ejecutar(consultorio: Consultorio) {
        await this.repo.crear(consultorio);
    }
}
