import { IAsignacionMedicoConsultorio } from "../../dominio/entidades/asignacionMedicoConsultorio/IAsignacionMedicoConsultorio.js";
import { IAsignacionMedicoConsultorioRepositorio } from "../../dominio/repository/IAsignacionMedicoConsultorioRepositorio.js";
export class CrearAsignacionMedicoConsultorio {
    constructor(private readonly repo: IAsignacionMedicoConsultorioRepositorio) {}
    
    async ejecutar(datosAsignacion: IAsignacionMedicoConsultorio): Promise<IAsignacionMedicoConsultorio> {
    
    const medico = await this.repo.obtenerMedicoPorId(datosAsignacion.idMedico);
    if (!medico) throw new Error("El médico especificado no existe");

    const consultorio = await this.repo.obtenerConsultorioPorId(datosAsignacion.idConsultorio);
    if (!consultorio) throw new Error("El consultorio especificado no existe");

    const duplicada = await this.repo.buscarAsignacionDuplicada(datosAsignacion);
    if (duplicada) throw new Error("Ya existe una asignación idéntica para este médico, consultorio y horario");

    const asignacionesConsultorio = await this.repo.buscarAsignacionesPorConsultorio(datosAsignacion.idConsultorio);
    const conflictoConsultorio = asignacionesConsultorio.some((a) => {
    const mismosDias = a.diasDisponibles.some((d) => datosAsignacion.diasDisponibles.includes(d));
    
    const traslapeHoras = a.horaInicio < datosAsignacion.horaFin && a.horaFin > datosAsignacion.horaInicio;
    return mismosDias && traslapeHoras;});

    if (conflictoConsultorio) throw new Error("El consultorio ya tiene una asignación en los mismos días u horario");

    const asignacionesMedico = await this.repo.buscarAsignacionesPorMedico(datosAsignacion.idMedico);
    const conflictoMedico = asignacionesMedico.some((a) => {
    const mismosDias = a.diasDisponibles.some((d) => datosAsignacion.diasDisponibles.includes(d));
    
    const traslapeHoras = a.horaInicio < datosAsignacion.horaFin && a.horaFin > datosAsignacion.horaInicio;
    return mismosDias && traslapeHoras;});

    if (conflictoMedico) throw new Error("El médico ya tiene otra asignación en los mismos días u horario");

    const asignacionCreada = await this.repo.crearAsignacionMedicoConsultorio(datosAsignacion);
    return asignacionCreada;
}
};
