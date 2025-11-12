import { FastifyRequest, FastifyReply } from "fastify";
import { CrearCitaMedicaCasoUso } from "../../core/aplicacion/CasosUsoCitasMedicas/CrearCitaMedicaCasoUso.js";
import { ObtenerCitasMedicasCasoUso } from "../../core/aplicacion/CasosUsoCitasMedicas/ObtenerCitasMedicasCasoUso.js";
import { ObtenerCitaMedicaPorIdCasoUso } from "../../core/aplicacion/CasosUsoCitasMedicas/ObtenerCitaMedicaPorIdCasoUso.js";
import { ActualizarCitaMedicaCasoUso } from "../../core/aplicacion/CasosUsoCitasMedicas/ActualizarCitaMedicaCasoUso.js";
import { CitasMedicasRepositorioSupabase } from "../../core/infraestructura/repositorios/CitaMedicaRepositorioSupabase.js";
import { EliminarCitaMedicaCasoUso } from "../../core/aplicacion/CasosUsoCitasMedicas/EliminarCitaMedicaCasoUso.js";
import { StatusCode } from "../../common/statusCode.js";
import {
    respuestaExitosa,
    respuestaCreacion,
    respuestaError,
} from "../../common/respuestaHttp.js";
import { errorServidor, noEncontrado, solicitudInvalida } from "../../common/erroresComunes.js";


const repo = new CitasMedicasRepositorioSupabase();


const crearCitaCaso = new CrearCitaMedicaCasoUso(repo);
const listarCitasCaso = new ObtenerCitasMedicasCasoUso(repo);
const obtenerCitaPorIdCaso = new ObtenerCitaMedicaPorIdCasoUso(repo);
const actualizarCitaCaso = new ActualizarCitaMedicaCasoUso(repo);
const eliminarCitaCaso = new EliminarCitaMedicaCasoUso(repo);


export async function crearCitaMedicaControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const datos = req.body as any;

        if (!datos?.idPaciente || !datos?.idMedico || !datos?.fechaCita || !datos?.motivoCita) {
            return reply
                .code(StatusCode.NO_ENCONTRADO)
                .send(noEncontrado("Datos incompletos. Se requieren idPaciente, idMedico, fechaCita y motivoCita."));
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
        }

        const cita = await obtenerCitaPorIdCaso.ejecutar(idCita);
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
        }
        const datos = req.body as any;
        if (!datos || Object.keys(datos).length === 0) {
            return reply
                .code(StatusCode.SOLICITUD_INCORRECTA)
                .send(solicitudInvalida("No se recibieron datos para actualizar."));
        }
        const citaActualizada = await actualizarCitaCaso.ejecutar(idCita, datos);
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
        const { idCita } = req.params as { idCita: string };
        if (!idCita) {
            return reply
                .code(StatusCode.SOLICITUD_INCORRECTA)
                .send(solicitudInvalida("Debe proporcionar un idCita válido."));
        }
        const eliminada = await eliminarCitaCaso.ejecutar(idCita);
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
