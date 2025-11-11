import { FastifyRequest, FastifyReply } from "fastify";
import { CrearAsignacionMedicoConsultorio } from "../../core/aplicacion/asignacionMedicoConsultorioCasoUso/CrearAsignacionMedicoConsultorio.js";
import { ListarAsignacionMedicoConsultorio } from "../../core/aplicacion/asignacionMedicoConsultorioCasoUso/ListarAsignacionMedicoConsultorio.js";
import { ObtenerAsignacionMedicoConsultorioID } from "../../core/aplicacion/asignacionMedicoConsultorioCasoUso/ObtenerAsignacionMedicoConsultorioID.js";
import { ActualizarAsignacionMedicoConsultorio } from "../../core/aplicacion/asignacionMedicoConsultorioCasoUso/ActualizarAsignacionMedicoConsultorio.js";
import { EliminarAsignacionMedicoConsultorio } from "../../core/aplicacion/asignacionMedicoConsultorioCasoUso/EliminarAsignacionMedicoConsultorio.js";
import { AsignacionMedicoConsultorioDTO,CrearAsignacionMedicoConsultorioEsquema } from "../../core/infraestructura/esquemas/AsignacionMedicoConsultorioEsquema.js";
import { AsignacionMedicoConsultorioRepositorioSupaBase } from "../../core/infraestructura/repositorios/AsignacionMedicoConsultorioRepositorioSupaBase.js";
import { ZodError } from "zod";

const repo = new AsignacionMedicoConsultorioRepositorioSupaBase();

const crearAsignacionMedicoConsultorioCaso = new CrearAsignacionMedicoConsultorio(repo);
const listarAsignacionMedicoConsultorioCaso = new ListarAsignacionMedicoConsultorio(repo);
const ObtenerAsignacionMedicoConsultorioIDCaso = new ObtenerAsignacionMedicoConsultorioID(repo);
const actualizarAsignacionMedicoConsultorioCaso = new ActualizarAsignacionMedicoConsultorio(repo);
const eliminarAsignacionMedicoConsultorioCaso = new EliminarAsignacionMedicoConsultorio(repo);

export async function crearAsignacionMedicoConsultorioControlador (
    req: FastifyRequest<{Body:AsignacionMedicoConsultorioDTO}>,
    reply: FastifyReply) {
        try{
            const datosAsignacion = CrearAsignacionMedicoConsultorioEsquema.parse(req.body);
            const idNuevaAsignacion = await crearAsignacionMedicoConsultorioCaso.ejecutar(datosAsignacion);

            return reply.code(200).send({
                mensaje: "Asignación del médico al consultorio creada correctamente",
                idAsignacion: idNuevaAsignacion
            });
        } catch (err) {
            if (err instanceof ZodError) {
                return reply.code(400).send({
                    mensaje: "Datos inválidos",
                    error: err.issues[0]?.message || "Error desconocido",
                });
            }
            return reply.code(500).send({
                mensaje: "Error al crear la asignación del médico al consultorio",
                error: err instanceof Error ? err.message : String(err)
            });
        }
    };

export async function listarAsignacionMedicoConsultorioControlador (
    req: FastifyRequest<{Querystring: {limite?: number}}>,
    reply: FastifyReply) {
        try{
            const {limite} = req.query;
            const asignacionEncontrada = await listarAsignacionMedicoConsultorioCaso.ejecutar(limite);

            return reply.code(200).send({
                mensaje: "Asignaciones del médico al consultorio encontradas correctamente",
                Asignación: asignacionEncontrada,
                TotalAsignaciones: asignacionEncontrada.length
            });
        } catch(err){
            return reply.code(500).send({
                mensaje: "Error al obtener las asignaciones del médico al consultorio",
                error: err instanceof Error ? err.message : err
            });
        }
    };

export async function obtenerAsignacionMedicoConsultorioControlador (
    req: FastifyRequest<{ Params: { idAsignacion:string } }>, 
    reply: FastifyReply) {
        try {
            const { idAsignacion} = req.params;
            const asignacionEncontrada = await ObtenerAsignacionMedicoConsultorioIDCaso.ejecutar(idAsignacion);
            
            if (!asignacionEncontrada) {
                return reply.code(404).send({
                    mensaje: "Asignación del médico al consultorio no encontrada"
                });
            }
            
            return reply.code(200).send({
                mensaje: "Asignación del médico al consultorio encontrada correctamente",
                Asignacion: asignacionEncontrada
            });
        } catch(err) {
            return reply.code(500).send({
                mensaje: "Error al obtener la asignación del médico al consultorio",
                error: err instanceof Error ? err.message: err
            });
        }
    };

export async function actualizarAsignacionMedicoConsultorioControlador(
    req: FastifyRequest<{ Params: { idAsignacion: string }; Body: AsignacionMedicoConsultorioDTO }>, 
    reply: FastifyReply){
        try{
            const { idAsignacion} = req.params;
            const nuevaAsignacion = CrearAsignacionMedicoConsultorioEsquema.parse(req.body);
            const asignacionActualizada = await actualizarAsignacionMedicoConsultorioCaso.ejecutar(
        idAsignacion,
        nuevaAsignacion);

        if (!asignacionActualizada) {
            reply.code(404).send({
            mensaje: "Asignación del médico al consultorio no encontrada"
        });
        }
        
        return reply.code(200).send({
            mensaje: "Asignación del médico al consultorio actualizada correctamente",
            AsignacionActualizada: asignacionActualizada
        });
    } catch(err) {
        return reply.code(500).send({
        mensaje: "Error al actualizar la asignación del médico al consultorio",
        error: err instanceof Error ? err.message : err
    });
    }
};

export async function eliminarAsignacionMedicoConsultorioControlador (
    req: FastifyRequest<{Params: {idAsignacion: string}}>,
    reply: FastifyReply) {
        try {
            const {idAsignacion} = req.params;
            await eliminarAsignacionMedicoConsultorioCaso.ejecutar(idAsignacion);
            
            return reply.code(200).send({
                mensaje: "Asignación del médico al consultorio eliminada correctamente",
                idAsignacion: idAsignacion
            });
        } catch (err){
            return reply.code(500).send({
                mensaje: "Error al eliminar la asignación del médico al consultorio",
                error: err instanceof Error ? err.message : err
            });
        }
    };