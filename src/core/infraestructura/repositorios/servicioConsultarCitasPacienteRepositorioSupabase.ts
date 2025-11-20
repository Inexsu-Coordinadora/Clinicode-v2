<<<<<<< HEAD
import { supabase } from "../cliente-db/clienteSupabase.js";
import { IServicioConsultarCitasPacientesRepositorio } from "../../dominio/repository/IServicioConsultarCitasPacientesRepositorio.js";
import { IConsultarCitasPaciente } from "../../dominio/entidades/servicioConsultarCitasPaciente/IConsultarCitasPaciente.js";
import { StatusCode } from "../../../common/statusCode.js";
=======
import { createClient } from "@supabase/supabase-js";
import { IServicioConsultarCitasPacientesRepositorio } from "../../dominio/repository/IServicioConsultarCitasPacientesRepositorio";
import { IConsultarCitasPaciente } from "../../dominio/entidades/servicioConsultarCitasPaciente/IConsultarCitasPaciente";
import { StatusCode } from "../../../common/statusCode";
>>>>>>> 6bead998ab38543fc56ee8f168263f7ba2758d26

export class ServicioConsultarCitasPacienteRepositorioSupabase
  implements IServicioConsultarCitasPacientesRepositorio
{
  async obtenerCitasPorPaciente(
    numeroDocumento: string
  ): Promise<{ mensaje: string; citas: IConsultarCitasPaciente[] }> {

    const { data: paciente, error: errorPaciente } = await supabase
      .from("pacientes")
      .select("id_paciente")
      .eq("numero_documento", numeroDocumento)
      .single();

    if (errorPaciente || !paciente) {
      throw {
        codigo: StatusCode.NO_ENCONTRADO,
        mensaje: "Paciente no encontrado",
      };
    }

    const { data: citas, error: errorCitas } = await supabase
      .from("citas_medicas")
      .select(
        `
        id_cita,
        fecha_cita,
        estado,
        medicos (
          nombres,
          apellidos,
          especialidades (nombre)
        ),
        consultorios (
          nombre,
          ubicacion
        )
      `
      )
      .eq("id_paciente", paciente.id_paciente)
      .order("fecha_cita", { ascending: true });

    if (errorCitas) {
      throw {
        codigo: StatusCode.ERROR_SERVIDOR,
        mensaje: "Error al obtener las citas",
      };
    }

    if (!citas || citas.length === 0) {
      return {
        mensaje: "El paciente no tiene citas registradas",
        citas: [],
      };
    }

    const citasDTO: IConsultarCitasPaciente[] = citas.map((cita: any) => ({
      id_cita: cita.id_cita,
      fecha_cita: cita.fecha_cita,
      estado: cita.estado,
      medico: {
        nombres: cita.medicos?.nombres,
        apellidos: cita.medicos?.apellidos,
        especialidad: cita.medicos?.especialidades?.nombre ?? null,
      },
      consultorio: {
        nombre: cita.consultorios?.nombre,
        ubicacion: cita.consultorios?.ubicacion,
      },
    }));

    return {
      mensaje: "Citas obtenidas correctamente",
      citas: citasDTO,
    };
  }
}

