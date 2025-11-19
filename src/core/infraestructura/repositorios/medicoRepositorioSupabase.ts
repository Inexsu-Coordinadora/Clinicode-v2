import { IMedicosRepositorio } from "../../dominio/repository/IMedicoRepositorio.js";
import { IMedico } from "../../dominio/entidades/medicos/IMedico.js";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import 'dotenv/config';

const SUPABASE_URL = process.env.SUPABASE_URL!;
const SUPABASE_KEY = process.env.SUPABASE_KEY!;

export class MedicoRepositorio implements IMedicosRepositorio {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  async crearMedico(datosMedico: IMedico): Promise<string> {
    const medicoDB = {
      id_medico: datosMedico.id_medico,
      nombres: datosMedico.nombres,
      apellidos: datosMedico.apellidos,
      numero_licencia: datosMedico.numero_licencia,
      id_especialidad: datosMedico.id_especialidad,
      telefono: datosMedico.telefono ?? null,
      correo: datosMedico.correo ?? null,
    };

    const { data, error } = await this.supabase
      .from("medicos")
      .insert([medicoDB])
      .select();

    if (error) throw new Error(error.message);
    return data![0].id_medico.toString();
  }

  async listarMedicos(limite?: number): Promise<IMedico[]> {
    let query = this.supabase.from("medicos").select("*");
    if (limite) query = query.limit(limite);
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data!;
  }

  async obtenerMedicoPorId(id_medico: string): Promise<IMedico | null> {
    const { data, error } = await this.supabase
      .from("medicos")
      .select("*")
      .eq("id_medico", id_medico)
      .single();

    if (error) {
      if (error.code === "PGRST116") return null; 
      throw new Error(error.message);
    }

    return data!;
  }

  async actualizarMedico(id_medico: string, datosMedico: IMedico): Promise<IMedico> {
    const medicoDB = {
      nombres: datosMedico.nombres,
      apellidos: datosMedico.apellidos,
      numero_licencia: datosMedico.numero_licencia,
      id_especialidad: datosMedico.id_especialidad,
      telefono: datosMedico.telefono ?? null,
      correo: datosMedico.correo ?? null,
    };

    const { data, error } = await this.supabase
      .from("medicos")
      .update(medicoDB)
      .eq("id_medico", id_medico)
      .select();

    if (error) throw new Error(error.message);
    return data![0];
  }

  async eliminarMedico(id_medico: string): Promise<void> {
    const { data: citas, error: errorCitas } = await this.supabase
      .from("citas_medicas")
      .select("id_cita")
      .eq("id_medico", id_medico);

    if (errorCitas) throw new Error(errorCitas.message);

    if (citas && citas.length > 0) {
      throw new Error("No se puede eliminar el médico porque tiene citas asociadas.");
    }

    const { error } = await this.supabase
      .from("medicos")
      .delete()
      .eq("id_medico", id_medico);

    if (error) throw new Error(error.message);
  }
}
