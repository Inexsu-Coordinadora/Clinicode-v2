import { FastifyRequest, FastifyReply } from "fastify";
import { IMedico } from "../../core/dominio/entidades/medicos/IMedico.js";
import { IMedicoCasosUso } from "./../../core/aplicacion/casoUsoMedico/IMedicoCasosUso.js";
import { MedicoDTO } from "../../core/infraestructura/esquemas/MedicoEsquema.js";
export declare class MedicoControlador {
    private medicosCasosUso;
    constructor(medicosCasosUso: IMedicoCasosUso);
    listarMedicos: (request: FastifyRequest<{
        Querystring: {
            limite?: number;
        };
    }>, reply: FastifyReply) => Promise<any>;
    obtenerMedicoPorId: (request: FastifyRequest<{
        Params: {
            idMedico: string;
        };
    }>, reply: FastifyReply) => Promise<any>;
    crearMedico: (request: FastifyRequest<{
        Body: MedicoDTO;
    }>, reply: FastifyReply) => Promise<any>;
    actualizarMedico: (request: FastifyRequest<{
        Params: {
            idMedico: string;
        };
        Body: IMedico;
    }>, reply: FastifyReply) => Promise<any>;
    eliminarMedico: (request: FastifyRequest<{
        Params: {
            idMedico: string;
        };
    }>, reply: FastifyReply) => Promise<any>;
}
//# sourceMappingURL=medicoControlador.d.ts.map