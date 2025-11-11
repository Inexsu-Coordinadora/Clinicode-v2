import { DatosReprogramacion } from "../../dominio/entidades/CitasMedicas/ICitasMedicas.js";
import { ICitasMedicasRepositorio } from "../../dominio/repository/ICitasMedicasRepositorio.js";


export class CancelarOReprogramarCitaCasoUso {
    private citasRepo: ICitasMedicasRepositorio;

    constructor(citasRepo: ICitasMedicasRepositorio) {
        this.citasRepo = citasRepo;
    }

    async ejecutar(
        idCita: string,
        accion: "cancelar" | "reprogramar",
        datos?: DatosReprogramacion
    ) {
        const cita = await this.citasRepo.obtenerCitaMedicaPorID(idCita);
        if (!cita) throw new Error("Cita no encontrada");

        if (accion === "cancelar") {
            cita.estadoCita = "Cancelada";
        }

        if (accion === "reprogramar") {
            if (!datos?.fechaCita || !datos?.idConsultorio) {
                throw new Error("Datos de reprogramación incompletos");
            }

            cita.fechaCita = datos.fechaCita;
            cita.idConsultorio = datos.idConsultorio;
            cita.estadoCita = "Programada";
        }

        const citaActualizada = await this.citasRepo.actualizarCitaMedica(idCita, cita);
        return citaActualizada;
    }
}
