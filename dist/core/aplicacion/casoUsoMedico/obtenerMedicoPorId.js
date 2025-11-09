export class ObtenerMedicoPorId {
    medicosRepositorio;
    constructor(medicosRepositorio) {
        this.medicosRepositorio = medicosRepositorio;
    }
    async obtenerMedicoPorId(idMedico) {
        const medico = await this.medicosRepositorio.obtenerMedicoPorId(idMedico);
        return medico;
    }
}
//# sourceMappingURL=obtenerMedicoPorId.js.map