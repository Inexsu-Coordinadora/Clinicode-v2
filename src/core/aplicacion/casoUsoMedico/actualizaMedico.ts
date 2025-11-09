import { IMedico } from "../../dominio/entidades/medicos/IMedico.js";
import { IMedicosRepositorio } from "../../dominio/repository/IMedicoRepositorio.js";

export class ActualizarMedico {
  constructor(private medicosRepositorio: IMedicosRepositorio) {}

  async actualizarMedico(idMedico: string, datos: IMedico): Promise<IMedico | null> {
    const datosActualizados = {
      nombres: datos.nombres,
      apellidos: datos.apellidos,
      numero_licencia: datos.numero_licencia,
      id_especialidad: datos.id_especialidad,
      telefono: datos.telefono ?? null,
      correo: datos.correo ?? null,
    };

    const medicoActualizado = await this.medicosRepositorio.actualizarMedico(
      idMedico,
      datosActualizados
    );

    return medicoActualizado || null;
  }
}
