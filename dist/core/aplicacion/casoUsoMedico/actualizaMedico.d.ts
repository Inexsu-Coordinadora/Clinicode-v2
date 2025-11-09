import { IMedico } from "../../dominio/entidades/medicos/IMedico.js";
import { IMedicosRepositorio } from "../../dominio/repository/IMedicoRepositorio.js";
export declare class ActualizarMedico {
    private medicosRepositorio;
    constructor(medicosRepositorio: IMedicosRepositorio);
    actualizarMedico(idMedico: string, datos: IMedico): Promise<IMedico | null>;
}
//# sourceMappingURL=actualizaMedico.d.ts.map