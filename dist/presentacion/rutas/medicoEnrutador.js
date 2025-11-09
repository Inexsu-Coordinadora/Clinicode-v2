import { MedicoControlador } from "../controladores/medicoControlador.js";
import { MedicoRepositorio } from "../../core/infraestructura/repositorios/medicoRepositorioSupabase.js";
import { CrearMedico } from "../../core/aplicacion/casoUsoMedico/crearMedico.js";
import { ListarMedicos } from "../../core/aplicacion/casoUsoMedico/listarMedico.js";
import { ObtenerMedicoPorId } from "../../core/aplicacion/casoUsoMedico/obtenerMedicoPorId.js";
import { ActualizarMedico } from "../../core/aplicacion/casoUsoMedico/actualizaMedico.js";
import { EliminarMedico } from "../../core/aplicacion/casoUsoMedico/eliminarMedico.js";
function medicoEnrutador(app, medicoControlador) {
    app.get("/", medicoControlador.listarMedicos);
    app.get("/:idMedico", medicoControlador.obtenerMedicoPorId);
    app.post("/", medicoControlador.crearMedico);
    app.put("/:idMedico", medicoControlador.actualizarMedico);
    app.delete("/:idMedico", medicoControlador.eliminarMedico);
}
export async function medicosEnrutador(app) {
    const medicosRepositorio = new MedicoRepositorio();
    const crearMedico = new CrearMedico(medicosRepositorio);
    const listarMedicos = new ListarMedicos(medicosRepositorio);
    const obtenerMedicoPorId = new ObtenerMedicoPorId(medicosRepositorio);
    const actualizarMedico = new ActualizarMedico(medicosRepositorio);
    const eliminarMedico = new EliminarMedico(medicosRepositorio);
    const casosDeUso = {
        crearMedico: (datos) => crearMedico.crearMedico(datos),
        listarMedicos: (limite) => listarMedicos.obtenerMedicos(limite),
        obtenerMedicoPorId: (id) => obtenerMedicoPorId.obtenerMedicoPorId(id),
        actualizarMedico: (id, datos) => actualizarMedico.actualizarMedico(id, datos),
        eliminarMedico: (id) => eliminarMedico.eliminarMedico(id),
    };
    const medicoControlador = new MedicoControlador(casosDeUso);
    medicoEnrutador(app, medicoControlador);
}
//# sourceMappingURL=medicoEnrutador.js.map