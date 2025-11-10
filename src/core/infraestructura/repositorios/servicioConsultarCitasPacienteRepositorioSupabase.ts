import { createClient } from "@supabase/supabase-js";
import { IServicioConsultarCitasPacientesRepositorio } from "../../dominio/repository/IServicioConsultarCitasPacientesRepositorio.js";
import { IConsultarCitasPaciente } from "../../dominio/entidades/servicioConsultarCitasPaciente/IConsultarCitasPaciente.js";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export class servicioConsultarCitasPacienteRepositorioSupabase implements IServicioConsultarCitasPacientesRepositorio {
  async obtenerCitasPorPaciente(numeroDocumento: string): Promise<IConsultarCitasPaciente[]> {
    const { data: paciente, error: errorPaciente } = await supabase
      .from("pacientes")
      .select("id_paciente")
      .eq("numero_documento", numeroDocumento)
      .single();

    if (errorPaciente || !paciente) {
      throw { codigo: 404, mensaje: "Paciente no encontrado" };
    }

    const { data: citas, error: errorCitas } = await supabase
      .from("citas_medicas")
      .select(
        `
        id_cita,
        fecha_cita,
        estado,
        medicos (nombres, apellidos, especialidades (nombre)),
        consultorios (nombre, ubicacion)
      `,
        { count: "exact" } 
      )
      .eq("id_paciente", paciente.id_paciente)
      .order("fecha_cita", { ascending: true })
      .limit(50);

    if (errorCitas) {
      throw { codigo: 500, mensaje: "Error al obtener citas" };
    }

    const citasUnicas = (citas || []).filter(
      (cita, index, self) =>
        index === self.findIndex((c) => c.id_cita === cita.id_cita)
    );

    return citasUnicas.map((cita: any) => ({
      id_cita: cita.id_cita,
      fecha_cita: cita.fecha_cita,
      estado: cita.estado,
      medico: {
        nombres: cita.medicos?.nombres,
        apellidos: cita.medicos?.apellidos,
        especialidad: cita.medicos?.especialidades?.nombre,
      },
      consultorio: {
        nombre: cita.consultorios?.nombre,
        ubicacion: cita.consultorios?.ubicacion,
      },
    }));
  }
}
