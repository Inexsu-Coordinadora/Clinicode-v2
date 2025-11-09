import { IMedico } from "../../dominio/entidades/medicos/IMedico.js";
import { IMedicosRepositorio } from "../../dominio/repository/IMedicoRepositorio.js";
export declare class ObtenerMedicoPorId {
    private medicosRepositorio;
    constructor(medicosRepositorio: IMedicosRepositorio);
    obtenerMedicoPorId(idMedico: string): Promise<IMedico | null>;
}
//# sourceMappingURL=obtenerMedicoPorId.d.ts.map