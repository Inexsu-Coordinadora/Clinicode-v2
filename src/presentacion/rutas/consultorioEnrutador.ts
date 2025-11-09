import {
    actualizarConsultorioControlador, 
    crearConsultorioControlador,
    eliminarConsultorioControlador,
    listarConsultoriosControlador
} from '../controladores/consultorioControlador.js';
import { FastifyInstance } from 'fastify';


export async function consultorioEnrutador(app: FastifyInstance) {
    app.post('/', crearConsultorioControlador);
    app.get('/', listarConsultoriosControlador);
    app.put("/:id_consultorio", actualizarConsultorioControlador);
    app.delete('/:id_consultorio', eliminarConsultorioControlador);
}
