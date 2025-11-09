import { IMedico } from "../../dominio/entidades/medicos/IMedico.js";
import { MedicoDTO } from "../../infraestructura/esquemas/MedicoEsquema.js";
export interface IMedicoCasosUso {
    listarMedicos(limite?: number): Promise<IMedico[]>;
    obtenerMedicoPorId(idMedico: string): Promise<IMedico | null>;
    crearMedico(medico: MedicoDTO): Promise<string>;
    actualizarMedico(idMedico: string, medico: IMedico): Promise<IMedico | null>;
    eliminarMedico(idMedico: string): Promise<void>;
}
//# sourceMappingURL=IMedicoCasosUso.d.ts.map