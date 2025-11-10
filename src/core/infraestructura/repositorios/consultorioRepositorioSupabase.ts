import { IConsultorioRepositorio } from "../../dominio/repository/IConsultorioRepositorio.js";
import { Consultorio } from "../../dominio/entidades/consultorios/IConsultorio.js";
import { supabase } from "../cliente-db/clienteSupaBase.js";



export class ConsultorioRepositorioSupabase implements IConsultorioRepositorio {
    async crear(consultorio: Consultorio): Promise<void> {
        const { error } = await supabase.from('consultorios').insert([consultorio]);
        if (error) throw new Error(error.message);
    }

    async listar(): Promise<Consultorio[]> {
        const { data, error } = await supabase.from('consultorios').select('*');
        if (error) throw new Error(error.message);
        return data as Consultorio[];
    }

    async actualizar(id_consultorio: string, datos: any) {
        const { data, error } = await supabase
            .from("consultorios")
            .update(datos)
            .eq("id_consultorio", id_consultorio)
            .select();

        if (error) {
            throw new Error(error.message);
        }

        return data[0];
    }

    async eliminar(id_consultorio: string): Promise<boolean> {
        const { error } = await supabase
            .from('consultorios')
            .delete()
            .eq('id_consultorio', id_consultorio); 

        if (error) {
            console.error(error);
            throw new Error("Error al eliminar el consultorio.");
        }

        return true;
    }

}
