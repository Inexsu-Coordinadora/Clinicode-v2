import { ICitasMedicas } from "./ICitasMedicas.js";

export class CitasMedicas implements ICitasMedicas {
    id_cita: string;
    id_paciente: string;
    id_medico: string;
    id_consultorio: string;
    fecha_cita: Date;
    motivoCita: string;
    estado: "Atendida" | "Programada" | "Cancelada" | "Reprogramada";
    creadaEn: string;
    actualizadaEn: string | null;


    constructor(datosCita: ICitasMedicas) {
        this.id_cita = crypto.randomUUID();
        this.id_paciente = datosCita.id_paciente;
        this.id_medico = datosCita.id_medico;
        this.id_consultorio = datosCita.id_consultorio;
        this.fecha_cita = datosCita.fecha_cita;
        this.motivoCita = datosCita.motivoCita;
        this.estado = datosCita.estado;
        this.creadaEn = datosCita.creadaEn;
        this.actualizadaEn = datosCita.actualizadaEn ?? null;
    }
}