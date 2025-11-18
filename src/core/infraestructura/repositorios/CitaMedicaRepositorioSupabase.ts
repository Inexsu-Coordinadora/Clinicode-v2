import { ICitasMedicas } from "../../dominio/entidades/CitasMedicas/ICitasMedicas.js";
import { ICitasMedicasRepositorio } from "../../dominio/repository/ICitasMedicasRepositorio.js";
import { supabase } from "../cliente-db/clienteSupabase.js";

export class CitasMedicasRepositorioSupabase implements ICitasMedicasRepositorio {

    async crearCitaMedica(citaMedica: ICitasMedicas): Promise<ICitasMedicas> {
        const { data, error } = await supabase
            .from("citas_medicas")
            .insert([{
                id_cita: citaMedica.id_cita,
                id_paciente: citaMedica.id_paciente,
                id_medico: citaMedica.id_medico,
                id_consultorio: citaMedica.id_consultorio,
                fecha_cita: (citaMedica.fecha_cita instanceof Date) ? citaMedica.fecha_cita.toISOString() : citaMedica.fecha_cita,
                motivo: citaMedica.motivoCita,
                estado: citaMedica.estado ?? "Programada",
                creada_en: citaMedica.creadaEn ?? new Date().toISOString(),
                actualizada_en: citaMedica.actualizadaEn ?? null,
            }])
            .select()
            .single();

        if (error) throw error;

        return {
            id_cita: data.id_cita,
            id_paciente: data.id_paciente,
            id_medico: data.id_medico,
            id_consultorio: data.id_consultorio,
            fecha_cita: new Date(data.fecha_cita),
            motivoCita: data.motivo,
            estado: data.estado,
            creadaEn: data.creada_en,
            actualizadaEn: data.actualizada_en,
        };
    }

    async obtenerCitasMedicas(): Promise<ICitasMedicas[]> {
        const { data, error } = await supabase
            .from("citas_medicas")
            .select("*");

        if (error) throw error;

        return (data as any[]).map(d => ({
            id_cita: d.id_cita,
            id_paciente: d.id_paciente,
            id_medico: d.id_medico,
            id_consultorio: d.id_consultorio,
            fecha_cita: new Date(d.fecha_cita),
            motivoCita: d.motivo,
            estado: d.estado,
            creadaEn: d.creada_en,
            actualizadaEn: d.actualizada_en,
        })) as ICitasMedicas[];
    }

    async obtenerCitaMedicaPorID(id_cita: string): Promise<ICitasMedicas | null> {
        const { data, error } = await supabase
            .from("citas_medicas")
            .select("*")
            .eq("id_cita", id_cita)
            .single();

        if (error) return null;

        return {
            id_cita: data.id_cita,
            id_paciente: data.id_paciente,
            id_medico: data.id_medico,
            id_consultorio: data.id_consultorio,
            fecha_cita: new Date(data.fecha_cita),
            motivoCita: data.motivo,
            estado: data.estado,
            creadaEn: data.creada_en,
            actualizadaEn: data.actualizada_en,
        };
    }

    async actualizarCitaMedica(id_cita: string, datosCita: ICitasMedicas): Promise<ICitasMedicas | null> {
        const payload: any = {
            id_paciente: datosCita.id_paciente,
            id_medico: datosCita.id_medico,
            id_consultorio: datosCita.id_consultorio,
            fecha_cita: (datosCita.fecha_cita instanceof Date) ? datosCita.fecha_cita.toISOString() : datosCita.fecha_cita,
            motivo: datosCita.motivoCita,
            estado: datosCita.estado,
            actualizada_en: datosCita.actualizadaEn ?? new Date().toISOString(),
        };

        const { data, error } = await supabase
            .from("citas_medicas")
            .update(payload)
            .eq("id_cita", id_cita)
            .select()
            .single();

        if (error) throw error;

        return {
            id_cita: data.id_cita,
            id_paciente: data.id_paciente,
            id_medico: data.id_medico,
            id_consultorio: data.id_consultorio,
            fecha_cita: new Date(data.fecha_cita),
            motivoCita: data.motivo,
            estado: data.estado,
            creadaEn: data.creada_en,
            actualizadaEn: data.actualizada_en,
        };
    }

    async eliminarCitaMedica(id_cita: string): Promise<boolean> {
        const { error } = await supabase
            .from("citas_medicas")
            .delete()
            .eq("id_cita", id_cita);

        if (error) throw new Error(error.message);
        return true;
    }
}


