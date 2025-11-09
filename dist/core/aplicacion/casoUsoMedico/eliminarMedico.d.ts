import { IMedicosRepositorio } from "../../dominio/repository/IMedicoRepositorio.js";
export declare class EliminarMedico {
    private medicosRepositorio;
    constructor(medicosRepositorio: IMedicosRepositorio);
    eliminarMedico(idMedico: string): Promise<void>;
}
//# sourceMappingURL=eliminarMedico.d.ts.map