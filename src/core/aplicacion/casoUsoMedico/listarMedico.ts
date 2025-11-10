import { IMedico } from "../../dominio/entidades/medicos/IMedico.js";
import { IMedicosRepositorio } from "../../dominio/repository/IMedicoRepositorio.js";

export class ListarMedicos {
  constructor(private medicosRepositorio: IMedicosRepositorio) {}

  async obtenerMedicos(limite?: number): Promise<IMedico[]> {
    return await this.medicosRepositorio.listarMedicos(limite);
  }
}
