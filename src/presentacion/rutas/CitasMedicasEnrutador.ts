import { FastifyInstance } from "fastify";
import {
    actualizarCitaMedicaControlador, cancelarOReprogramarCitaControlador,
    crearCitaMedicaControlador, eliminarCitaMedicaControlador, listarCitasMedicasControlador,
    obtenerCitaMedicaPorIdControlador
} from "../controladores/CitasMedicasControlador.js";

export async function citasMedicasEnrutador(app: FastifyInstance) {

    app.post("/", crearCitaMedicaControlador);
    app.get("/", listarCitasMedicasControlador);
    app.get("/:idCita", obtenerCitaMedicaPorIdControlador);
    app.put("/:idCita", actualizarCitaMedicaControlador);
    app.delete("/:idCita", eliminarCitaMedicaControlador);
    app.put("/:idCita/accion", cancelarOReprogramarCitaControlador);
}
