import { IConsultorioRepositorio } from "../../dominio/repository/IConsultorioRepositorio.js";
import { Consultorio } from "../../dominio/entidades/consultorios/IConsultorio.js";


export class ListarConsultorios {
    constructor(private repo: IConsultorioRepositorio) { }

    async ejecutar(): Promise<Consultorio[]> {
        return await this.repo.listar();
    }
}
