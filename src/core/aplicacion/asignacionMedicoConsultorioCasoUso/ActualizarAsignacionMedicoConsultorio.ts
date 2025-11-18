import { IAsignacionMedicoConsultorio } from "../../dominio/entidades/asignacionMedicoConsultorio/IAsignacionMedicoConsultorio.js";
import { IAsignacionMedicoConsultorioRepositorio } from "../../dominio/repository/IAsignacionMedicoConsultorioRepositorio.js";
import { IMedicosRepositorio } from "../../dominio/repository/IMedicoRepositorio.js";
import { IConsultorioRepositorio } from "../../dominio/repository/IConsultorioRepositorio.js";
export class ActualizarAsignacionMedicoConsultorio {
    constructor(private readonly asignacionesRepo: IAsignacionMedicoConsultorioRepositorio,
        private readonly medicosRepo: IMedicosRepositorio,
        private readonly consultorioRepo: IConsultorioRepositorio) {}
    
    async ejecutar(idAsignacion: string, datosAsignacion: IAsignacionMedicoConsultorio):
    Promise<IAsignacionMedicoConsultorio | null> {
        
        const asignacionExistente = await this.asignacionesRepo.obtenerAsignacionMedicoConsultorioPorId(idAsignacion);
        if (!asignacionExistente) throw new Error("La asignación especificada no existe");
        
        const medico = await this.medicosRepo.obtenerMedicoPorId(datosAsignacion.idMedico);
        if (!medico) throw new Error("El médico especificado no existe");
        
        const consultorio = await this.consultorioRepo.obtenerPorId(datosAsignacion.idConsultorio);
        if (!consultorio) throw new Error("El consultorio especificado no existe");
        
        const asignacionActualizada = await this.asignacionesRepo.actualizarAsignacionMedicoConsultorio(
            idAsignacion,
            datosAsignacion);
            
            return asignacionActualizada;
        }
    };
