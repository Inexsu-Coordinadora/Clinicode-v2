import { IMedico } from "../../dominio/entidades/medicos/IMedico.js";
import { IMedicosRepositorio } from "../../dominio/repository/IMedicoRepositorio.js";
export declare class ListarMedicos {
    private medicosRepositorio;
    constructor(medicosRepositorio: IMedicosRepositorio);
    obtenerMedicos(limite?: number): Promise<IMedico[]>;
}
//# sourceMappingURL=listarMedico.d.ts.map