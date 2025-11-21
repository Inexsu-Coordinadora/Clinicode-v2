import { ICitasMedicas } from "../../dominio/entidades/CitasMedicas/ICitasMedicas";
import { ICitasMedicasRepositorio } from "../../dominio/repository/ICitasMedicasRepositorio";
import { ActualizarCitaMedicaDTO } from "../../infraestructura/esquemas/CitaMedicaEsquemas/ActualizarCitaMedicaEsquema";


export class ActualizarCitaMedicaCasoUso {
    constructor(private repositorio: ICitasMedicasRepositorio) { }

    async ejecutar(id_cita: string, datos: ActualizarCitaMedicaDTO): Promise<ICitasMedicas | null> {

        const citaExistente = await this.repositorio.obtenerCitaMedicaPorID(id_cita);
        if (!citaExistente) {
            throw new Error("La cita médica no existe.");
        }

        const citaActualizada: ICitasMedicas = {
            ...citaExistente,
            actualizadaEn: new Date().toISOString(),
        };

        if (datos.id_paciente !== undefined) {
            citaActualizada.id_paciente = datos.id_paciente;
        }
        if (datos.id_medico !== undefined) {
            citaActualizada.id_medico = datos.id_medico;
        }
        if (datos.id_consultorio !== undefined) {
            citaActualizada.id_consultorio = datos.id_consultorio;
        }
        if (datos.fecha_cita !== undefined) {
            citaActualizada.fecha_cita = datos.fecha_cita;
        }
        if (datos.motivoCita !== undefined) {
            citaActualizada.motivoCita = datos.motivoCita;
        }
        if (datos.estado !== undefined) {
            citaActualizada.estado = datos.estado;
        }

        return await this.repositorio.actualizarCitaMedica(id_cita, citaActualizada);
    }
}