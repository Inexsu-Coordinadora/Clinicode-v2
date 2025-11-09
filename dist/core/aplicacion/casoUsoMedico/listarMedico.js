export class ListarMedicos {
    medicosRepositorio;
    constructor(medicosRepositorio) {
        this.medicosRepositorio = medicosRepositorio;
    }
    async obtenerMedicos(limite) {
        return await this.medicosRepositorio.listarMedicos(limite);
    }
}
//# sourceMappingURL=listarMedico.js.map