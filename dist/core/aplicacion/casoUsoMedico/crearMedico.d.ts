import { IMedico } from "../../dominio/entidades/medicos/IMedico.js";
import { IMedicosRepositorio } from "../../dominio/repository/IMedicoRepositorio.js";
export declare class CrearMedico {
    private medicosRepositorio;
    constructor(medicosRepositorio: IMedicosRepositorio);
    crearMedico(datosMedico: IMedico): Promise<string>;
}
//# sourceMappingURL=crearMedico.d.ts.map