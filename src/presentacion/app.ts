import Fastify from 'fastify';
import cors from '@fastify/cors';
import { citasMedicasEnrutador } from './rutas/CitasMedicasEnrutador.js';


const app = Fastify({ logger: true });

app.register(cors);
app.register(citasMedicasEnrutador, { prefix: "/api/citas-medicas" });

app.get('/', async () => {
    return { mensaje: 'Servidor Fastify funcionando' };
});

export default app;