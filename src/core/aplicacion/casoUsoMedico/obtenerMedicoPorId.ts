import { IMedico } from "../../dominio/entidades/medicos/IMedico.js";
import { IMedicosRepositorio } from "../../dominio/repository/IMedicoRepositorio.js";

export class ObtenerMedicoPorId {
  constructor(private medicosRepositorio: IMedicosRepositorio) {}

  async obtenerMedicoPorId(id_medico: string): Promise<IMedico | null> {
    const medico = await this.medicosRepositorio.obtenerMedicoPorId(id_medico);
    return medico;
  }
}
