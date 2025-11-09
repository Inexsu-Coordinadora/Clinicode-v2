import { FastifyRequest, FastifyReply } from "fastify";
import { IMedico } from "../../core/dominio/entidades/medicos/IMedico.js";
import { IMedicoCasosUso } from "./../../core/aplicacion/casoUsoMedico/IMedicoCasosUso.js";
import { MedicoDTO, CrearMedicoEsquema } from "../../core/infraestructura/esquemas/MedicoEsquema.js";
import { ZodError } from "zod";

export class MedicoControlador {
  constructor(private medicosCasosUso: IMedicoCasosUso) {}

  listarMedicos = async (
    request: FastifyRequest<{ Querystring: { limite?: number } }>,
    reply: FastifyReply
  ) => {
    try {
      const { limite } = request.query;
      const medicosEncontrados = await this.medicosCasosUso.listarMedicos(limite);

      return reply.code(200).send({
        mensaje: "Médicos encontrados correctamente",
        medicos: medicosEncontrados,
        medicosEncontrados: medicosEncontrados.length,
      });
    } catch (err) {
      return reply.code(500).send({
        mensaje: "Error al obtener los médicos",
        error: err instanceof Error ? err.message : err,
      });
    }
  };

  obtenerMedicoPorId = async (
    request: FastifyRequest<{ Params: { idMedico: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { idMedico } = request.params;
      const medicoEncontrado = await this.medicosCasosUso.obtenerMedicoPorId(idMedico);

      if (!medicoEncontrado) {
        return reply.code(404).send({
          mensaje: "Médico no encontrado",
        });
      }

      return reply.code(200).send({
        mensaje: "Médico encontrado correctamente",
        medico: medicoEncontrado,
      });
    } catch (err) {
      return reply.code(500).send({
        mensaje: "Error al obtener el médico",
        error: err instanceof Error ? err.message : err,
      });
    }
  };

  crearMedico = async (
    request: FastifyRequest<{ Body: MedicoDTO }>,
    reply: FastifyReply
  ) => {
    try {
      const nuevoMedico = CrearMedicoEsquema.parse(request.body);
      const idNuevoMedico = await this.medicosCasosUso.crearMedico(nuevoMedico);

      return reply.code(200).send({
        mensaje: "El médico se creó correctamente",
        idNuevoMedico: idNuevoMedico,
      });
    } catch (err) {
      if (err instanceof ZodError) {
        return reply.code(400).send({
          mensaje: "Error al crear un nuevo médico",
          error: err.issues[0]?.message || "Error desconocido",
        });
      }
      return reply.code(500).send({
        mensaje: "Error al crear un nuevo médico",
        error: err instanceof Error ? err.message : String(err),
      });
    }
  };

  actualizarMedico = async (
    request: FastifyRequest<{ Params: { idMedico: string }; Body: IMedico }>,
    reply: FastifyReply
  ) => {
    try {
      const { idMedico } = request.params;
      const datosMedico = request.body;
      const medicoActualizado = await this.medicosCasosUso.actualizarMedico(
        idMedico,
        datosMedico
      );

      if (!medicoActualizado) {
        return reply.code(404).send({
          mensaje: "Médico no encontrado",
        });
      }

      return reply.code(200).send({
        mensaje: "Médico actualizado correctamente",
        medicoActualizado: medicoActualizado,
      });
    } catch (err) {
      return reply.code(500).send({
        mensaje: "Error al actualizar el médico",
        error: err instanceof Error ? err.message : err,
      });
    }
  };

  eliminarMedico = async (
    request: FastifyRequest<{ Params: { idMedico: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const { idMedico } = request.params;
      await this.medicosCasosUso.eliminarMedico(idMedico);

      return reply.code(200).send({
        mensaje: "Médico eliminado correctamente",
        idMedico: idMedico,
      });
    } catch (err) {
      return reply.code(500).send({
        mensaje: "Error al eliminar el médico",
        error: err instanceof Error ? err.message : err,
      });
    }
  };
}
