import { CitasMedicas } from "../../dominio/entidades/CitasMedicas/CitasMedicas.js";
import { ICitasMedicas } from "../../dominio/entidades/CitasMedicas/ICitasMedicas.js";
import { ICitasMedicasRepositorio } from "../../dominio/repository/ICitasMedicasRepositorio.js";
export class CrearCitaMedicaCasoUso {
    constructor(private repositorio: ICitasMedicasRepositorio) { }

    async ejecutar(datos: ICitasMedicas): Promise<ICitasMedicas> {

        const paciente = await this.repositorio.obtenerPacientePorId(datos.id_paciente);
        if (!paciente) throw new Error("El paciente no existe.");

        const medico = await this.repositorio.obtenerMedicoPorId(datos.id_medico);
        if (!medico) throw new Error("El médico no existe.");

        if (datos.id_consultorio) {
            const consultorio = await this.repositorio.obtenerConsultorioPorId(datos.id_consultorio);
            if (!consultorio) throw new Error("El consultorio no existe.");
        }

        const conflicto = await this.repositorio.validarConflictosDeAgenda(datos);
        if (conflicto) throw new Error(conflicto);

        const nuevaCita = new CitasMedicas({
            ...datos,
            estado: "Programada",
            creadaEn: new Date().toISOString(),
            actualizadaEn: null,
        });

        const citaCreada = await this.repositorio.crearCitaMedica(nuevaCita);
        return citaCreada;
    }
}