import { ICitasMedicas } from "./ICitasMedicas.js";

export class CitasMedicas implements ICitasMedicas {
    idCita: string;
    idPaciente: string;
    idMedico: string;
    idConsultorio: string;
    fechaCita: string;
    motivoCita: string;
    estadoCita: "Atendida" | "Programada" | "Cancelada";
    creadaEn: string;
    actualizadaEn: string | null;


    constructor(datosCita: ICitasMedicas) {
        this.idCita = crypto.randomUUID();
        this.idPaciente = datosCita.idPaciente;
        this.idMedico = datosCita.idMedico;
        this.idConsultorio = datosCita.idConsultorio;
        this.fechaCita = datosCita.fechaCita;
        this.motivoCita = datosCita.motivoCita;
        this.estadoCita = datosCita.estadoCita;
        this.creadaEn = datosCita.creadaEn;
        this.actualizadaEn = datosCita.actualizadaEn ?? null;
    }
}