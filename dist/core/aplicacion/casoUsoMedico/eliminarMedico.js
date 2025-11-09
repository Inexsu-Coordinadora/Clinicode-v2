export class EliminarMedico {
    medicosRepositorio;
    constructor(medicosRepositorio) {
        this.medicosRepositorio = medicosRepositorio;
    }
    async eliminarMedico(idMedico) {
        await this.medicosRepositorio.eliminarMedico(idMedico);
    }
}
//# sourceMappingURL=eliminarMedico.js.map