import Fastify from 'fastify';
import cors from '@fastify/cors';
import { medicosEnrutador } from './rutas/medicoEnrutador.js';


const app = Fastify({ logger: true });

app.register(cors);
app.register(medicosEnrutador, { prefix: '/api/medicos'})

app.get('/', async () => {
    return { mensaje: 'Servidor Fastify funcionando' };
});

export default app;
