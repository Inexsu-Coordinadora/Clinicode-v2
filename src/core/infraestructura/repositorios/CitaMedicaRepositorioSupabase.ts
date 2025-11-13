import { ICitasMedicas } from "../../dominio/entidades/CitasMedicas/ICitasMedicas.js";
import { ICitasMedicasRepositorio } from "../../dominio/repository/ICitasMedicasRepositorio.js";
import { supabase } from "../cliente-db/clienteSupabase.js";

export class CitasMedicasRepositorioSupabase implements ICitasMedicasRepositorio {

    async crearCitaMedica(citaMedica: ICitasMedicas): Promise<ICitasMedicas> {
        const { data, error } = await supabase
            .from("citas_medicas")
            .insert([
                {
                    id_cita: citaMedica.idCita,
                    id_paciente: citaMedica.idPaciente,
                    id_medico: citaMedica.idMedico,
                    id_consultorio: citaMedica.idConsultorio,
                    fecha_cita: citaMedica.fechaCita,
                    motivo: citaMedica.motivoCita,
                    estado: citaMedica.estadoCita ?? "Programada",
                    creada_en: new Date().toISOString(),
                    actualizada_en: citaMedica.actualizadaEn ?? null,
                },
            ])
            .select()
            .single();

        if (error) throw new Error(error.message);

        return {
            idCita: data.id_cita,
            idPaciente: data.id_paciente,
            idMedico: data.id_medico,
            idConsultorio: data.id_consultorio,
            fechaCita: data.fecha_cita,
            motivoCita: data.motivo,
            estadoCita: data.estado,
            creadaEn: data.creado_en,
            actualizadaEn: data.actualizado_en,
        };
    }

    async obtenerCitasMedicas(): Promise<ICitasMedicas[]> {
        const { data, error } = await supabase
            .from("citas_medicas")
            .select("*");

        if (error) throw new Error(error.message);
        return data as ICitasMedicas[];
    }

    async obtenerCitaMedicaPorID(idCita: string): Promise<ICitasMedicas | null> {
        const { data, error } = await supabase
            .from("citas_medicas")
            .select("*")
            .eq("id_cita", idCita)
            .single();

        if (error) {
            if (error.code === "PGRST116") return null;
            throw new Error(error.message);
        }

        return data as ICitasMedicas;
    }

    async actualizarCitaMedica(idCita: string, datosCita: ICitasMedicas): Promise<ICitasMedicas | null> {
        const { data, error } = await supabase
            .from("citas_medicas")
            .update({
                id_paciente: datosCita.idPaciente,
                id_medico: datosCita.idMedico,
                id_consultorio: datosCita.idConsultorio,
                fecha_cita: datosCita.fechaCita,
                motivo: datosCita.motivoCita,
                estado: datosCita.estadoCita,
                actualizada_en: new Date().toISOString(),
            })
            .eq("id_cita", idCita)
            .select()
            .single();

        if (error) throw new Error(error.message);
        if (!data) return null;

        return {
            idCita: data.id_cita,
            idPaciente: data.id_paciente,
            idMedico: data.id_medico,
            idConsultorio: data.id_consultorio,
            fechaCita: data.fecha_cita,
            motivoCita: data.motivo,
            estadoCita: data.estado,
            creadaEn: data.creado_en,
            actualizadaEn: data.actualizado_en,
        };
    }

    async eliminarCitaMedica(idCita: string): Promise<boolean> {
        const { error } = await supabase
            .from("citas_medicas")
            .delete()
            .eq("id_cita", idCita);

        if (error) throw new Error(error.message);
        return true;
    }

    async obtenerPacientePorId(idPaciente: string) {
        const { data } = await supabase.from("pacientes").select("id_paciente").eq("id_paciente", idPaciente).maybeSingle();
        return data;
    }

    async obtenerMedicoPorId(idMedico: string) {
        const { data } = await supabase.from("medicos").select("id_medico").eq("id_medico", idMedico).maybeSingle();
        return data;
    }

    async obtenerConsultorioPorId(idConsultorio: string) {
        const { data } = await supabase.from("consultorios").select("id_consultorio").eq("id_consultorio", idConsultorio).maybeSingle();
        return data;
    }

    async validarConflictosDeAgenda(cita: ICitasMedicas): Promise<string | null> {
        const { idMedico, idPaciente, idConsultorio, fechaCita } = cita;

        const medicoConflict = await supabase
            .from("citas_medicas")
            .select("id_cita")
            .eq("id_medico", idMedico)
            .eq("fecha_cita", fechaCita)
            .maybeSingle();

        if (medicoConflict?.data) return "El médico ya tiene una cita en este horario.";

        const pacienteConflict = await supabase
            .from("citas_medicas")
            .select("id_cita")
            .eq("id_paciente", idPaciente)
            .eq("fecha_cita", fechaCita)
            .maybeSingle();

        if (pacienteConflict?.data) return "El paciente ya tiene una cita en este horario.";

        if (idConsultorio) {
            const consultorioConflict = await supabase
                .from("citas_medicas")
                .select("id_cita")
                .eq("id_consultorio", idConsultorio)
                .eq("fecha_cita", fechaCita)
                .maybeSingle();

            if (consultorioConflict?.data) return "El consultorio ya tiene una cita en este horario.";
        }

        return null;
    }
}

