import { ConsultorioRepositorioSupabase } from "../../core/infraestructura/repositorios/consultorioRepositorioSupabase.js";
import { ActualizarConsultorio } from "../../core/aplicacion/casoUsoConsultorio/actualizarConsultorio.js";
import { ListarConsultorios } from "../../core/aplicacion/casoUsoConsultorio/listarConsultorio.js";
import { CrearConsultorio } from "../../core/aplicacion/casoUsoConsultorio/crearConsultorio.js";
import { FastifyReply, FastifyRequest } from "fastify";
import { EliminarConsultorio } from "../../core/aplicacion/casoUsoConsultorio/eliminarConsultorio.js";


const repo = new ConsultorioRepositorioSupabase();
const crearConsultorioCaso = new CrearConsultorio(repo);
const listarConsultoriosCaso = new ListarConsultorios(repo);
const actualizarConsultorioCaso = new ActualizarConsultorio(repo);
const eliminarConsultorioCaso = new EliminarConsultorio(repo);


export async function crearConsultorioControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const consultorio = req.body as any;
        await crearConsultorioCaso.ejecutar(consultorio);
        reply.status(201).send({ mensaje: 'Consultorio creado correctamente' });
    } catch (error: any) {
        reply.status(400).send({ error: error.message });
    }
}

export async function listarConsultoriosControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const consultorios = await listarConsultoriosCaso.ejecutar();
        reply.send(consultorios);
    } catch (error: any) {
        reply.status(500).send({ error: error.message });
    }
}

export async function actualizarConsultorioControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { id_consultorio } = req.params as { id_consultorio: string };
        const datos = req.body as any;

        const consultorioActualizado = await actualizarConsultorioCaso.ejecutar(id_consultorio, datos);

        reply.status(200).send({
            mensaje: "Consultorio actualizado correctamente",
            data: consultorioActualizado,
        });
    } catch (error: any) {
        reply.status(400).send({ error: error.message });
    }
}


export async function eliminarConsultorioControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { id_consultorio } = req.params as { id_consultorio: string };

        await eliminarConsultorioCaso.ejecutar(id_consultorio);
        reply.status(200).send({ mensaje: "Consultorio eliminado correctamente" });
    } catch (error: any) {
        reply.status(400).send({ error: error.message });
    }
}
