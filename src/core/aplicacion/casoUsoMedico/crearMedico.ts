import { randomUUID } from "crypto";
import { IMedico } from "../../dominio/entidades/medicos/IMedico.js";
import { IMedicosRepositorio } from "../../dominio/repository/IMedicoRepositorio.js";
import { Medico } from "../../dominio/entidades/medicos/Medico.js";

export class CrearMedico {
  constructor(private medicosRepositorio: IMedicosRepositorio) {}

  async crearMedico(datosMedico: IMedico): Promise<string> {
    const idMedico = randomUUID();
    const nuevoMedico = new Medico(datosMedico, idMedico);
    const idInsertado = await this.medicosRepositorio.crearMedico(nuevoMedico);

    return idInsertado;
  }
}
