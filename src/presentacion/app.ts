import Fastify from 'fastify';
import cors from '@fastify/cors';
import { pacienteEnrutador } from './rutas/pacienteEnrutador.js';
import { medicosEnrutador } from './rutas/medicoEnrutador.js';
import { consultorioEnrutador } from './rutas/consultorioEnrutador.js';


const app = Fastify({ logger: true });

app.register(cors);
app.register(pacienteEnrutador, { prefix: '/api' });
app.register(medicosEnrutador, { prefix: '/api/medicos' })
app.register(consultorioEnrutador, { prefix: '/consultorios' });

app.get('/', async () => {
    return { mensaje: 'Servidor Fastify funcionando' };
});

export default app;
