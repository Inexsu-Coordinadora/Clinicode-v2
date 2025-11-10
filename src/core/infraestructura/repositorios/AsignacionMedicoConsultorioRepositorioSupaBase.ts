import { IAsignacionMedicoConsultorio } from "../../dominio/entidades/asignacionMedicoConsultorio/IAsignacionMedicoConsultorio.js";
import { IAsignacionMedicoConsultorioRepositorio } from "../../dominio/repository/IAsignacionMedicoConsultorioRepositorio.js";
import { supabase } from "../cliente-db/clienteSupabase.js";
import { AsignacionMedicoConsultorioDTO } from "../esquemas/AgendaMedicoEsquema.js";
import { v4 as uuidv4 } from "uuid";

export class AsignacionMedicoConsultorioRepositorioSupaBase implements IAsignacionMedicoConsultorioRepositorio {
    
    async crearAsignacionMedicoConsultorio(datosAsignacion: AsignacionMedicoConsultorioDTO): Promise<string> {
        const { data: medico, error: errorMedico } = await supabase
        .from('medicos')
        .select('id_medico')
        .eq('id_medico', datosAsignacion.idMedico)
        .single();
        
        if (!medico || errorMedico) {
            throw new Error("El médico especificado no existe");
        }
        
        const { data: consultorio, error: errorConsultorio } = await supabase
        .from('consultorios')
        .select('id_consultorio')
        .eq('id_consultorio', datosAsignacion.idConsultorio)
        .single();
        
        if (!consultorio || errorConsultorio) {
            throw new Error("El consultorio especificado no existe");
        }
        
        const { data: asignacionExistente, error: errorAsignacion } = await supabase
        .from("asignacion_medico_consultorio")
        .select("id_asignacion")
        .eq("id_medico", datosAsignacion.idMedico)
        .eq("id_consultorio", datosAsignacion.idConsultorio)
        .eq("hora_inicio", datosAsignacion.horaInicio)
        .eq("hora_fin", datosAsignacion.horaFin);
        
        if (errorAsignacion) {
            throw new Error("Error al verificar asignaciones existentes");
        }
        
        if (asignacionExistente && asignacionExistente.length > 0) {
            throw new Error("Ya existe una asignación idéntica para este médico, consultorio y horario");
        }
        
        const { data, error } = await supabase
        .from("asignacion_medico_consultorio")
        .insert({
            id_asignacion: uuidv4(),
            id_medico: datosAsignacion.idMedico,
            id_consultorio: datosAsignacion.idConsultorio,
            dias_disponibles: datosAsignacion.diasDisponibles,
            hora_inicio: datosAsignacion.horaInicio,
            hora_fin: datosAsignacion.horaFin,
            creada_en: new Date().toISOString()
        })
        .select("id_asignacion")
        .single();
        
        if (error) {
            throw new Error(`Error al crear la asignación del médico al consultorio: ${error.message}`);
        }
        
        return data.id_asignacion;
    }

    async listarAsignacionMedicoConsultorio(limite?:number): Promise<IAsignacionMedicoConsultorio[]> {
        
        let query = supabase.from('asignacion_medico_consultorio').select('*');
        
        if (limite) {
            query = query.limit(limite);
        };
        
        const { data, error } = await query;
        
        if (error) throw new Error(error.message);
        
        return data as IAsignacionMedicoConsultorio[];
    }
    
    async obtenerAsignacionMedicoConsultorioPorId(idAsignacion: string): Promise<IAsignacionMedicoConsultorio | null> {
        const {data, error} = await supabase
        .from('asignacion_medico_consultorio').select('*').eq('id_asignacion', idAsignacion).single();
        
        if (error){
            throw new Error("Error al obtener la asignación del médico al consultorio" + error.message)
        }
        return data;
    }

    async actualizarAsignacionMedicoConsultorio(idAsignacion: string, datosAsignacion: IAsignacionMedicoConsultorio): 
    Promise<IAsignacionMedicoConsultorio | null> {
        
        const { data, error } = await supabase
        .from('asignacion_medico_consultorio')
        .update({
            id_medico: datosAsignacion.idMedico,
            id_consultorio: datosAsignacion.idConsultorio,
            dias_disponibles: datosAsignacion.diasDisponibles,
            hora_inicio: datosAsignacion.horaInicio,
            hora_fin: datosAsignacion.horaFin,
            creada_en: new Date().toISOString(),
        })
        .eq("id_asignacion", idAsignacion) 
        .select("*") 
        .single();
        
        if (error) {
            throw new Error("Error al actualizar la asignación del médico al consultorio: " + error.message);
        }
        
        return data as IAsignacionMedicoConsultorio;
    }

    async eliminarAsignacionMedicoConsultorio(idAsignacion: string): Promise<void> {
        const { error } = await supabase
        .from('asignacion_medico_consultorio')
        .delete()
        .eq('id_asignacion', idAsignacion);
        
        if (error) {
            throw new Error("Error al eliminar la asignación del médico al consultorio: " + error.message);
        }
    }
};
