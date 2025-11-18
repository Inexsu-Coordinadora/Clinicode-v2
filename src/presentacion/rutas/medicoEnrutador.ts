import { FastifyInstance } from "fastify";
import { MedicoControlador } from "../controladores/medicoControlador.js";
import { IMedicosRepositorio } from "../../core/dominio/repository/IMedicoRepositorio.js";
import { MedicoRepositorio } from "../../core/infraestructura/repositorios/medicoRepositorioSupabase.js";

import { CrearMedico } from "../../core/aplicacion/casoUsoMedico/crearMedico.js";
import { ListarMedicos } from "../../core/aplicacion/casoUsoMedico/listarMedico.js";
import { ObtenerMedicoPorId } from "../../core/aplicacion/casoUsoMedico/obtenerMedicoPorId.js";
import { ActualizarMedico } from "../../core/aplicacion/casoUsoMedico/actualizaMedico.js";
import { EliminarMedico } from "../../core/aplicacion/casoUsoMedico/eliminarMedico.js";

function medicoEnrutador(
    app: FastifyInstance,
    medicoControlador: MedicoControlador
) {
    app.get("/", medicoControlador.listarMedicos);
    app.get("/:id_medico", medicoControlador.obtenerMedicoPorId);
    app.post("/", medicoControlador.crearMedico);
    app.put("/:id_medico", medicoControlador.actualizarMedico);
    app.delete("/:id_medico", medicoControlador.eliminarMedico);
}

export async function medicosEnrutador(app: FastifyInstance) {
    const medicosRepositorio: IMedicosRepositorio = new MedicoRepositorio();

    const crearMedico = new CrearMedico(medicosRepositorio);
    const listarMedicos = new ListarMedicos(medicosRepositorio);
    const obtenerMedicoPorId = new ObtenerMedicoPorId(medicosRepositorio);
    const actualizarMedico = new ActualizarMedico(medicosRepositorio);
    const eliminarMedico = new EliminarMedico(medicosRepositorio);

    const casosDeUso = {
        crearMedico: (datos: any) => crearMedico.crearMedico(datos),
        listarMedicos: (limite?: number) => listarMedicos.obtenerMedicos(limite),
        obtenerMedicoPorId: (id: string) =>
            obtenerMedicoPorId.obtenerMedicoPorId(id),
        actualizarMedico: (id: string, datos: any) =>
            actualizarMedico.actualizarMedico(id, datos),
        eliminarMedico: (id: string) => eliminarMedico.eliminarMedico(id),
    };

    const medicoControlador = new MedicoControlador(casosDeUso);

    medicoEnrutador(app, medicoControlador);
}
