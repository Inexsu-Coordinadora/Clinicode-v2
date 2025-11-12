import { IAsignacionMedicoConsultorio } from "../../dominio/entidades/asignacionMedicoConsultorio/IAsignacionMedicoConsultorio.js";
import { IAsignacionMedicoConsultorioRepositorio } from "../../dominio/repository/IAsignacionMedicoConsultorioRepositorio.js";
export class ActualizarAsignacionMedicoConsultorio {
    constructor(private readonly repo: IAsignacionMedicoConsultorioRepositorio) {}
    
    async ejecutar(idAsignacion: string, datosAsignacion: IAsignacionMedicoConsultorio):
    Promise<IAsignacionMedicoConsultorio | null> {
        
        const asignacionExistente = await this.repo.obtenerAsignacionMedicoConsultorioPorId(idAsignacion);
        if (!asignacionExistente) throw new Error("La asignación especificada no existe");
        const medico = await this.repo.obtenerMedicoPorId(datosAsignacion.idMedico);
        
        if (!medico) throw new Error("El médico especificado no existe");
        
        const consultorio = await this.repo.obtenerConsultorioPorId(datosAsignacion.idConsultorio);
        if (!consultorio) throw new Error("El consultorio especificado no existe");
        
        const asignacionActualizada = await this.repo.actualizarAsignacionMedicoConsultorio(
            idAsignacion,
            datosAsignacion);
            
            return asignacionActualizada;
        }
    };
