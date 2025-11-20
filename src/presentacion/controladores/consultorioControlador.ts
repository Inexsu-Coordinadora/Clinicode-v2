import { ConsultorioRepositorioSupabase } from "../../core/infraestructura/repositorios/consultorioRepositorioSupabase";
import { ActualizarConsultorio } from "../../core/aplicacion/casoUsoConsultorio/actualizarConsultorio";
import { EliminarConsultorio } from "../../core/aplicacion/casoUsoConsultorio/eliminarConsultorio";
import { ListarConsultorios } from "../../core/aplicacion/casoUsoConsultorio/listarConsultorio";
import { CrearConsultorio } from "../../core/aplicacion/casoUsoConsultorio/crearConsultorio";
import { StatusCode } from "../../common/statusCode";
import { FastifyReply, FastifyRequest } from "fastify";


const repo = new ConsultorioRepositorioSupabase();
const crearConsultorioCaso = new CrearConsultorio(repo);
const listarConsultoriosCaso = new ListarConsultorios(repo);
const actualizarConsultorioCaso = new ActualizarConsultorio(repo);
const eliminarConsultorioCaso = new EliminarConsultorio(repo);


export async function crearConsultorioControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const consultorio = req.body as any;
        await crearConsultorioCaso.ejecutar(consultorio);
        reply.status(StatusCode.CREADO).send({ mensaje: 'Consultorio creado correctamente' });
    } catch (error: any) {
        reply.status(StatusCode.SOLICITUD_INCORRECTA).send({ error: error.message });
    }
}

export async function listarConsultoriosControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const consultorios = await listarConsultoriosCaso.ejecutar();
        reply.send(consultorios);
    } catch (error: any) {
        reply.status(StatusCode.ERROR_SERVIDOR).send({ error: error.message });
    }
}

export async function actualizarConsultorioControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { id_consultorio } = req.params as { id_consultorio: string };
        const datos = req.body as any;

        const consultorioActualizado = await actualizarConsultorioCaso.ejecutar(id_consultorio, datos);

        reply.status(StatusCode.EXITO).send({
            mensaje: "Consultorio actualizado correctamente",
            data: consultorioActualizado,
        });
    } catch (error: any) {
        reply.status(StatusCode.SOLICITUD_INCORRECTA).send({ error: error.message });
    }
}


export async function eliminarConsultorioControlador(req: FastifyRequest, reply: FastifyReply) {
    try {
        const { id_consultorio } = req.params as { id_consultorio: string };

        await eliminarConsultorioCaso.ejecutar(id_consultorio);
        reply.status(StatusCode.EXITO).send({ mensaje: "Consultorio eliminado correctamente" });
    } catch (error: any) {
        reply.status(StatusCode.SOLICITUD_INCORRECTA).send({ error: error.message });
    }
}
