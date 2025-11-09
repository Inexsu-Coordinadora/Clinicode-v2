import { IMedicosRepositorio } from "../../dominio/repository/IMedicoRepositorio.js";
import { IMedico } from "../../dominio/entidades/medicos/IMedico.js";
import 'dotenv/config';
export declare class MedicoRepositorio implements IMedicosRepositorio {
    private supabase;
    constructor();
    crearMedico(datosMedico: IMedico): Promise<string>;
    listarMedicos(limite?: number): Promise<IMedico[]>;
    obtenerMedicoPorId(idMedico: string): Promise<IMedico | null>;
    actualizarMedico(idMedico: string, datosMedico: IMedico): Promise<IMedico>;
    eliminarMedico(idMedico: string): Promise<void>;
}
//# sourceMappingURL=medicoRepositorioSupabase.d.ts.map