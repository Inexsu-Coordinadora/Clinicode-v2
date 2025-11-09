export class Medico {
    id_medico;
    nombres;
    apellidos;
    numero_licencia;
    id_especialidad;
    telefono;
    correo;
    constructor(datosMedico, idMedico) {
        this.id_medico = idMedico;
        this.nombres = datosMedico.nombres;
        this.apellidos = datosMedico.apellidos;
        this.numero_licencia = datosMedico.numero_licencia;
        this.id_especialidad = datosMedico.id_especialidad;
        this.telefono = datosMedico.telefono ?? null;
        this.correo = datosMedico.correo ?? null;
    }
}
//# sourceMappingURL=Medico.js.map