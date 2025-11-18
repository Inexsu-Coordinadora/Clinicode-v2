import { CitasMedicas } from "../../dominio/entidades/CitasMedicas/CitasMedicas.js";
import { ICitasMedicas } from "../../dominio/entidades/CitasMedicas/ICitasMedicas.js";
import { ICitasMedicasRepositorio } from "../../dominio/repository/ICitasMedicasRepositorio.js";
export class CrearCitaMedicaCasoUso {
    constructor(private repositorio: ICitasMedicasRepositorio) { }

    async ejecutar(datos: ICitasMedicas): Promise<ICitasMedicas> {
        const nuevaCita = new CitasMedicas({
            ...datos,
            estado: "Programada",
            creadaEn: new Date().toISOString(),
            actualizadaEn: null,
        });

        const citaCreada = await this.repositorio.crearCitaMedica(nuevaCita);
        return citaCreada;
    }
}