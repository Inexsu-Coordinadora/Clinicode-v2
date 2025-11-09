export class ActualizarMedico {
    medicosRepositorio;
    constructor(medicosRepositorio) {
        this.medicosRepositorio = medicosRepositorio;
    }
    async actualizarMedico(idMedico, datos) {
        const datosActualizados = {
            nombres: datos.nombres,
            apellidos: datos.apellidos,
            numero_licencia: datos.numero_licencia,
            id_especialidad: datos.id_especialidad,
            telefono: datos.telefono ?? null,
            correo: datos.correo ?? null,
        };
        const medicoActualizado = await this.medicosRepositorio.actualizarMedico(idMedico, datosActualizados);
        return medicoActualizado || null;
    }
}
//# sourceMappingURL=actualizaMedico.js.map