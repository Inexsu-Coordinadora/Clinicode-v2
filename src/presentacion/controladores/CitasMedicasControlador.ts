import { CancelarOReprogramarCitaCasoUso } from "../../core/aplicacion/CasosUsoCitasMedicas/CancelarOReprogramarCitaCasoUso.js";
import { ObtenerCitaMedicaPorIdCasoUso } from "../../core/aplicacion/CasosUsoCitasMedicas/ObtenerCitaMedicaPorIdCasoUso.js";
import { ConsultorioRepositorioSupabase } from "../../core/infraestructura/repositorios/consultorioRepositorioSupabase.js";
import { CitasMedicasRepositorioSupabase } from "../../core/infraestructura/repositorios/CitaMedicaRepositorioSupabase.js";
import { ActualizarCitaMedicaCasoUso } from "../../core/aplicacion/CasosUsoCitasMedicas/ActualizarCitaMedicaCasoUso.js";
import { ObtenerCitasMedicasCasoUso } from "../../core/aplicacion/CasosUsoCitasMedicas/ObtenerCitasMedicasCasoUso.js";
import { EliminarCitaMedicaCasoUso } from "../../core/aplicacion/CasosUsoCitasMedicas/EliminarCitaMedicaCasoUso.js";
import { StatusCode } from "../../common/statusCode.js";
import {
    respuestaExitosa,
    respuestaCreacion,
    respuestaError,
} from "../../common/respuestaHttp.js";
import { errorServidor, noEncontrado, solicitudInvalida } from "../../common/erroresComunes.js";
import { CrearCitaMedicaCasoUso } from "../../core/aplicacion/CasosUsoCitasMedicas/CrearCitaMedicaCasoUso.js";
import { DatosReprogramacion } from "../../core/dominio/entidades/CitasMedicas/ICitasMedicas.js";
import { FastifyRequest, FastifyReply } from "fastify";



const repo = new CitasMedicasRepositorioSupabase();
const repoConsultorios = new ConsultorioRepositorioSupabase();


const cancelarOReprogramarCitaCaso = new CancelarOReprogramarCitaCasoUso(repo,repoConsultorios);
const obtenerCitaPorIdCaso = new ObtenerCitaMedicaPorIdCasoUso(repo);
const actualizarCitaCaso = new ActualizarCitaMedicaCasoUso(repo);
const listarCitasCaso = new ObtenerCitasMedicasCasoUso(repo);
const eliminarCitaCaso = new EliminarCitaMedicaCasoUso(repo);
const crearCitaCaso = new CrearCitaMedicaCasoUso(repo);


export async function crearCitaMedicaControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const datos = req.body as any;

        if (!datos?.idPaciente || !datos?.idMedico || !datos?.fechaCita || !datos?.motivoCita) {
            return reply
                .code(StatusCode.NO_ENCONTRADO)
                .send(noEncontrado("Datos incompletos. Se requieren idPaciente, idMedico, fechaCita y motivoCita."));
        if (!datos?.id_paciente || !datos?.id_medico || !datos?.fecha_cita || !datos?.motivoCita) {
            return reply.code(400).send({
                mensaje: "Datos incompletos. Se requieren id_paciente, id_medico, fecha_cita y motivoCita.",
            });
        }

        const cita = await crearCitaCaso.ejecutar(datos);

        return reply
            .code(StatusCode.CREADO)
            .send(respuestaCreacion(cita, "Cita médica creada correctamente."));
    } catch (error: any) {
        return reply
            .code(StatusCode.ERROR_SERVIDOR)
            .send(errorServidor(`Error al crear la cita médica: ${error.message}`));
    }
}

export async function listarCitasMedicasControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const citas = await listarCitasCaso.ejecutar();
        if (!citas || citas.length === 0) {
            return reply
                .code(StatusCode.SIN_CONTENIDO)
                .send(respuestaExitosa([], "No hay citas médicas registradas actualmente."));
        }
        return reply
            .code(StatusCode.EXITO)
            .send(respuestaExitosa(citas, "Citas médicas obtenidas correctamentee."));
    } catch (error: any) {
        reply
            .code(StatusCode.ERROR_SERVIDOR)
            .send(respuestaError(`Error al obtener citas: ${error.message}`));
    }
}

export async function obtenerCitaMedicaPorIdControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { idCita } = req.params as { idCita: string };
        if (!idCita) {
            return reply
                .code(StatusCode.SOLICITUD_INCORRECTA)
                .send(solicitudInvalida("Debe proporcionar un idCita válido."));
        const { id_cita } = req.params as { id_cita: string };
        if (!id_cita) {
            return reply.code(400).send({ mensaje: "Debe proporcionar un id_cita válido." });
        }

        const cita = await obtenerCitaPorIdCaso.ejecutar(id_cita);
        if (!cita) {
            return reply
                .code(StatusCode.NO_ENCONTRADO)
                .send(noEncontrado("Cita médica no encontrada."));
        }

        return reply
            .code(StatusCode.EXITO)
            .send(respuestaExitosa(cita, "Cita médica obtenida correctamente."));
    } catch (error: any) {
        return reply
            .code(StatusCode.ERROR_SERVIDOR)
            .send(errorServidor(`Error al obtener cita medica: ${error.message}`));
    }
}

export async function actualizarCitaMedicaControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { idCita } = req.params as { idCita: string };
        if (!idCita) {
            return reply
                .code(StatusCode.SOLICITUD_INCORRECTA)
                .send(solicitudInvalida("Debe proporcionar un idCita válido."));
        const { id_cita } = req.params as { id_cita: string };
        if (!id_cita) {
            return reply.code(400).send({ mensaje: "Debe proporcionar un id_cita válido." });
        }
        const datos = req.body as any;
        if (!datos || Object.keys(datos).length === 0) {
            return reply
                .code(StatusCode.SOLICITUD_INCORRECTA)
                .send(solicitudInvalida("No se recibieron datos para actualizar."));
        }
        const citaActualizada = await actualizarCitaCaso.ejecutar(id_cita, datos);
        if (!citaActualizada) {
            return reply
                .code(StatusCode.NO_ENCONTRADO)
                .send(noEncontrado("No se encontró la cita médica para actualizar."));
        }

        return reply
            .code(StatusCode.EXITO)
            .send(respuestaExitosa(citaActualizada, "Cita médica actualizada correctamente."));
    } catch (error: any) {
        return reply
            .code(StatusCode.ERROR_SERVIDOR)
            .send(errorServidor(`Error al actualizar cita médica: ${error.message}`));
    }
}

export async function eliminarCitaMedicaControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { id_cita } = req.params as { id_cita: string };
        if (!id_cita) {
            return reply.code(400).send({ mensaje: "Debe proporcionar un id_cita válido." });
        }
        const eliminada = await eliminarCitaCaso.ejecutar(id_cita);
        if (!eliminada) {
            return reply
                .code(StatusCode.NO_ENCONTRADO)
                .send(noEncontrado("No se encontró la cita médica para eliminar."));
        }

        return reply
            .code(StatusCode.EXITO)
            .send(respuestaExitosa({ idCita }, "Cita médica eliminada correctamente."));
    } catch (error: any) {
        return reply
            .code(StatusCode.ERROR_SERVIDOR)
            .send(errorServidor(`Error al eliminar la cita médica: ${error.message}`));
    }
}

export async function cancelarOReprogramarCitaControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { id_cita } = req.params as { id_cita: string };
        const { accion, fecha_cita, id_consultorio } = req.body as {
            accion: "cancelar" | "reprogramar";
            fecha_cita?: string;
            id_consultorio?: string;
        };

        if (!id_cita) {
            return reply.code(400).send({ mensaje: "Debe proporcionar un id_cita válido." });
        }

        if (!accion || (accion !== "cancelar" && accion !== "reprogramar")) {
            return reply.code(400).send({
                mensaje: "Debe especificar una acción válida: 'cancelar' o 'reprogramar'.",
            });
        }

        const datosReprogramacion: DatosReprogramacion = {};

        if (fecha_cita) datosReprogramacion.fecha_cita = fecha_cita;
        if (id_consultorio) datosReprogramacion.id_consultorio = id_consultorio;

        const resultado = await cancelarOReprogramarCitaCaso.ejecutar(
            id_cita,
            accion,
            datosReprogramacion
        );

        return reply.code(200).send({
            mensaje:
                accion === "cancelar"
                    ? "Cita médica cancelada correctamente."
                    : "Cita médica reprogramada correctamente.",
            data: resultado,
        });
    } catch (error: any) {
        return reply.code(400).send({
            mensaje: "Error al procesar la acción sobre la cita médica.",
            error: error.message,
        });
    }
}

