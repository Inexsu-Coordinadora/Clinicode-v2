import { ConsultorioRepositorioSupabase } from "../../infraestructura/repositorios/consultorioRepositorioSupabase.js";

export class ActualizarConsultorio {
    constructor(private repo: ConsultorioRepositorioSupabase) { }

    async ejecutar(id_consultorio: string, datos: any) {
        if (!id_consultorio) {
            throw new Error("El ID del consultorio es obligatorio.");
        }

        const resultado = await this.repo.actualizar(id_consultorio, datos);
        return resultado;
    }
}
