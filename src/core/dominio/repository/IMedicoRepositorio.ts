import { IMedico } from "../../dominio/entidades/medicos/IMedico.js";

export interface IMedicosRepositorio {
  crearMedico(datosMedico: IMedico): Promise<string>;
  listarMedicos(limite?: number): Promise<IMedico[]>;
  obtenerMedicoPorId(idMedico: string): Promise<IMedico | null>;
  actualizarMedico(idMedico: string, datosMedico: IMedico): Promise<IMedico>;
  eliminarMedico(idMedico: string): Promise<void>;
}
