export interface ICitasMedicas {
    idCita: string;
    idPaciente: string;
    idMedico: string;
    idConsultorio: string;
    fechaCita: string;
    motivoCita: string;
    estadoCita: 'Atendida' | 'Programada' | 'Cancelada';

    // Nuevos datos para tener el control sobre la cita. 
    creadaEn: string;
    actualizadaEn: string | null;
}