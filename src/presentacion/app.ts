import { consultorioEnrutador } from './rutas/consultorioEnrutador.js';
import cors from '@fastify/cors';
import Fastify from 'fastify';


const app = Fastify({ logger: true });

app.register(cors);
app.register(consultorioEnrutador, { prefix: '/consultorios' });

app.get('/', async () => {
    return { mensaje: 'Servidor Fastify funcionando' };
});

export default app;
