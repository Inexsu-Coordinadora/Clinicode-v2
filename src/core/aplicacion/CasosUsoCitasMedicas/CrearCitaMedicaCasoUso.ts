import { EstadosCita } from "../../../common/estadoCita.js";
import { CitasMedicas } from "../../dominio/entidades/CitasMedicas/CitasMedicas.js";
import { ICitasMedicas } from "../../dominio/entidades/CitasMedicas/ICitasMedicas.js";
import { ICitasMedicasRepositorio } from "../../dominio/repository/ICitasMedicasRepositorio.js";
import { IConsultorioRepositorio } from "../../dominio/repository/IConsultorioRepositorio.js";
import { IMedicosRepositorio } from "../../dominio/repository/IMedicoRepositorio.js";
import { IPacienteRepositorio } from "../../dominio/repository/IPacienteRepositorio.js";
import { CrearCitaMedicaDTO } from "../../infraestructura/esquemas/CitaMedicaEsquemas/CrearCitaMedicaEsquema.js";
export class CrearCitaMedicaCasoUso {
    constructor(
        private citaRepositorio: ICitasMedicasRepositorio,
        private pacienteRepositorio: IPacienteRepositorio,
        private medicoRepositorio: IMedicosRepositorio,
        private consultorioRepositorio: IConsultorioRepositorio
    ) { }

    async ejecutar(datos: CrearCitaMedicaDTO): Promise<ICitasMedicas> {

        const paciente = await this.pacienteRepositorio.obtenerPacientePorId(datos.id_paciente);
        if (!paciente) throw new Error("El paciente no existe.");

        const medico = await this.medicoRepositorio.obtenerMedicoPorId(datos.id_medico);
        if (!medico) throw new Error("El médico no existe.");

        if (datos.id_consultorio) {
            const consultorio = await this.consultorioRepositorio.obtenerConsultorioPorID(datos.id_consultorio);
            if (!consultorio) throw new Error("El consultorio no existe.");
        }

        const conflicto = await this.citaRepositorio.validarConflictosDeAgenda(datos);
        if (conflicto) throw new Error(conflicto);

        const id_cita = crypto.randomUUID();

        const nuevaCita = new CitasMedicas({
            id_cita,
            ...datos,
            estado: EstadosCita.PROGRAMADA,
            creadaEn: new Date().toISOString(),
            actualizadaEn: null,
        });

        const citaCreada = await this.citaRepositorio.crearCitaMedica(nuevaCita);
        return citaCreada;
    }
}