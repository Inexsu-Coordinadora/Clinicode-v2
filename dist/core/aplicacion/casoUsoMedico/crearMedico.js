import { randomUUID } from "crypto";
import { Medico } from "../../dominio/entidades/medicos/Medico.js";
export class CrearMedico {
    medicosRepositorio;
    constructor(medicosRepositorio) {
        this.medicosRepositorio = medicosRepositorio;
    }
    async crearMedico(datosMedico) {
        const idMedico = randomUUID();
        const nuevoMedico = new Medico(datosMedico, idMedico);
        const idInsertado = await this.medicosRepositorio.crearMedico(nuevoMedico);
        return idInsertado;
    }
}
//# sourceMappingURL=crearMedico.js.map