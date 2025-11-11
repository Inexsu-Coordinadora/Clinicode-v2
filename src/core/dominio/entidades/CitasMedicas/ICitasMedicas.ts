export interface ICitasMedicas {
    idCita: string;
    idPaciente: string;
    idMedico: string;
    idConsultorio: string;
    fechaCita: string;
    motivoCita: string;
    estadoCita: 'Atendida' | 'Programada' | 'Cancelada';

    creadaEn: string;
    actualizadaEn: string | null;
}

export interface DatosReprogramacion {
    fechaCita?: string;
    idConsultorio?: string;
}