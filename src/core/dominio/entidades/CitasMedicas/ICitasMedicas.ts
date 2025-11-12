export interface ICitasMedicas {
    id_cita: string;
    id_paciente: string;
    id_medico: string;
    id_consultorio: string;
    fecha_cita: Date;
    motivoCita: string;
    estado: 'Atendida' | 'Programada' | 'Cancelada' | 'Reprogramada';

    creadaEn: string;
    actualizadaEn: string | null;
}

export interface DatosReprogramacion {
    fecha_cita?: string;
    id_consultorio?: string;
}