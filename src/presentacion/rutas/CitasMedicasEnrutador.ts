import { FastifyInstance } from "fastify";
import {
    actualizarCitaMedicaControlador, cancelarOReprogramarCitaControlador,
    crearCitaMedicaControlador, eliminarCitaMedicaControlador, listarCitasMedicasControlador,
    obtenerCitaMedicaPorIdControlador
} from "../controladores/CitasMedicasControlador";

export async function citasMedicasEnrutador(app: FastifyInstance) {

    app.post("/", crearCitaMedicaControlador);
    app.get("/", listarCitasMedicasControlador);
    app.get("/:id_cita", obtenerCitaMedicaPorIdControlador);
    app.put("/:id_cita", actualizarCitaMedicaControlador);
    app.delete("/:id_cita", eliminarCitaMedicaControlador);
    app.put("/:id_cita/accion", cancelarOReprogramarCitaControlador);
}
