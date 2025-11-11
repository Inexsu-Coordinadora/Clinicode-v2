import { CancelarOReprogramarCitaCasoUso } from "../../core/aplicacion/CasosUsoCitasMedicas/CancelarOReprogramarCitaCasoUso.js";
import { ObtenerCitaMedicaPorIdCasoUso } from "../../core/aplicacion/CasosUsoCitasMedicas/ObtenerCitaMedicaPorIdCasoUso.js";
import { CitasMedicasRepositorioSupabase } from "../../core/infraestructura/repositorios/CitaMedicaRepositorioSupabase.js";
import { ActualizarCitaMedicaCasoUso } from "../../core/aplicacion/CasosUsoCitasMedicas/ActualizarCitaMedicaCasoUso.js";
import { ObtenerCitasMedicasCasoUso } from "../../core/aplicacion/CasosUsoCitasMedicas/ObtenerCitasMedicasCasoUso.js";
import { EliminarCitaMedicaCasoUso } from "../../core/aplicacion/CasosUsoCitasMedicas/EliminarCitaMedicaCasoUso.js";
import { CrearCitaMedicaCasoUso } from "../../core/aplicacion/CasosUsoCitasMedicas/CrearCitaMedicaCasoUso.js";
import { DatosReprogramacion } from "../../core/dominio/entidades/CitasMedicas/ICitasMedicas.js";
import { FastifyRequest, FastifyReply } from "fastify";



const repo = new CitasMedicasRepositorioSupabase();


const cancelarOReprogramarCitaCaso = new CancelarOReprogramarCitaCasoUso(repo);
const obtenerCitaPorIdCaso = new ObtenerCitaMedicaPorIdCasoUso(repo);
const actualizarCitaCaso = new ActualizarCitaMedicaCasoUso(repo);
const listarCitasCaso = new ObtenerCitasMedicasCasoUso(repo);
const eliminarCitaCaso = new EliminarCitaMedicaCasoUso(repo);
const crearCitaCaso = new CrearCitaMedicaCasoUso(repo);


export async function crearCitaMedicaControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const datos = req.body as any;

        if (!datos?.idPaciente || !datos?.idMedico || !datos?.fechaCita || !datos?.motivoCita) {
            return reply.code(400).send({
                mensaje: "Datos incompletos. Se requieren idPaciente, idMedico, fechaCita y motivoCita.",
            });
        }
        const cita = await crearCitaCaso.ejecutar(datos);
        return reply.code(201).send({
            mensaje: "Cita médica creada correctamente.",
            data: cita,
        });
    } catch (error: any) {
        return reply.code(500).send({
            mensaje: "Error interno del servidor al crear la cita médica.",
            error: error.message,
        });
    }
}

export async function listarCitasMedicasControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const citas = await listarCitasCaso.ejecutar();
        if (!citas || citas.length === 0) {
            return reply.code(204).send({
                mensaje: "No hay citas médicas registradas actualmente.",
                data: [],
            });
        }
        return reply.code(200).send({
            mensaje: "Citas médicas obtenidas correctamente.",
            data: citas,
        });
    } catch (error: any) {
        reply.status(500).send({ error: error.message });
    }
}

export async function obtenerCitaMedicaPorIdControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { idCita } = req.params as { idCita: string };
        if (!idCita) {
            return reply.code(400).send({ mensaje: "Debe proporcionar un idCita válido." });
        }

        const cita = await obtenerCitaPorIdCaso.ejecutar(idCita);
        if (!cita) {
            return reply.code(404).send({
                mensaje: "Cita médica no encontrada.",
                data: null,
            });
        }

        return reply.code(200).send({
            mensaje: "Cita médica obtenida correctamente.",
            data: cita,
        });
    } catch (error: any) {
        return reply.code(500).send({
            mensaje: "Error interno del servidor al obtener la cita médica.",
            error: error.message,
        });
    }
}

export async function actualizarCitaMedicaControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { idCita } = req.params as { idCita: string };
        if (!idCita) {
            return reply.code(400).send({ mensaje: "Debe proporcionar un idCita válido." });
        }
        const datos = req.body as any;
        if (!datos || Object.keys(datos).length === 0) {
            return reply.code(400).send({ mensaje: "No se recibieron datos para actualizar." });
        }
        const citaActualizada = await actualizarCitaCaso.ejecutar(idCita, datos);
        if (!citaActualizada) {
            return reply.code(404).send({
                mensaje: "No se encontró la cita médica para actualizar.",
                data: null,
            });
        }

        return reply.code(200).send({
            mensaje: "Cita médica actualizada correctamente.",
            data: citaActualizada,
        });
    } catch (error: any) {
        return reply.code(500).send({
            mensaje: "Error interno del servidor al actualizar la cita médica.",
            error: error.message,
        });
    }
}

export async function eliminarCitaMedicaControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { idCita } = req.params as { idCita: string };
        if (!idCita) {
            return reply.code(400).send({ mensaje: "Debe proporcionar un idCita válido." });
        }
        const eliminada = await eliminarCitaCaso.ejecutar(idCita);
        if (!eliminada) {
            return reply.code(404).send({
                mensaje: "No se encontró la cita médica para eliminar.",
                data: null,
            });
        }

        return reply.code(200).send({
            mensaje: "Cita médica eliminada correctamente.",
            data: { idCita },
        });
    } catch (error: any) {
        return reply.code(500).send({
            mensaje: "Error interno del servidor al eliminar la cita médica.",
            error: error.message,
        });
    }
}

export async function cancelarOReprogramarCitaControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { idCita } = req.params as { idCita: string };
        const { accion, fechaCita, idConsultorio } = req.body as {
            accion: "cancelar" | "reprogramar";
            fechaCita?: string;
            idConsultorio?: string;
        };

        if (!idCita) {
            return reply.code(400).send({ mensaje: "Debe proporcionar un idCita válido." });
        }

        if (!accion || (accion !== "cancelar" && accion !== "reprogramar")) {
            return reply.code(400).send({
                mensaje: "Debe especificar una acción válida: 'cancelar' o 'reprogramar'.",
            });
        }

        const datosReprogramacion: DatosReprogramacion = {};

        if (fechaCita) datosReprogramacion.fechaCita = fechaCita;
        if (idConsultorio) datosReprogramacion.idConsultorio = idConsultorio;

        const resultado = await cancelarOReprogramarCitaCaso.ejecutar(
            idCita,
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

