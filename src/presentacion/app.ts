import Fastify from 'fastify';
import cors from '@fastify/cors';
import { pacienteEnrutador } from './rutas/pacienteEnrutador';
import { medicosEnrutador } from './rutas/medicoEnrutador';
import { consultorioEnrutador } from './rutas/consultorioEnrutador';
import { citasMedicasEnrutador } from './rutas/CitasMedicasEnrutador';
import { servicioConsultarCitasPacienteEnrutador } from './rutas/servicioConsultarCitasPacienteEnrutador';
import { asignacionMedicoConsultorioEnrutador } from './rutas/asignacionMedicoConsultorioEnrutador';


const app = Fastify({ logger: true });

app.register(cors);
app.register(pacienteEnrutador, { prefix: '/api' });
app.register(medicosEnrutador, { prefix: '/api/medicos' })
app.register(consultorioEnrutador, { prefix: '/consultorios' });
app.register(citasMedicasEnrutador, { prefix: "/api/citas-medicas" });
app.register(servicioConsultarCitasPacienteEnrutador, {prefix: '/api/citas'})
app.register(asignacionMedicoConsultorioEnrutador, { prefix: '/api'});

app.get('/', async () => {
    return { mensaje: 'Servidor Fastify funcionando' };
});

export default app;
