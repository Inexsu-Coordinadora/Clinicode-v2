import { IMedicosRepositorio } from "../../dominio/repository/IMedicoRepositorio.js";

export class EliminarMedico {
  constructor(private medicosRepositorio: IMedicosRepositorio) {}

  async eliminarMedico(idMedico: string): Promise<void> {
    await this.medicosRepositorio.eliminarMedico(idMedico);
  }
}
