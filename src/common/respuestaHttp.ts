export interface IRespuestaHttp<T = unknown> {
    mensaje: string;
    datos: T | null;
    detalles: string | null;
}


// Respuesta exitosa (200)
export const respuestaExitosa = <T>(
    datos: T | null,
    mensaje = "Operación exitosa",
): IRespuestaHttp<T> => ({
    mensaje,
    datos,
    detalles: null,
});

// Respuesta de creación (201)
export const respuestaCreacion = <T>(
    datos: T | null,
    mensaje = "Recurso creado correctamente"
): IRespuestaHttp<T> => ({
    mensaje,
    datos,
    detalles: null,
});

// Respuesta para errores controlados o no controlados
export const respuestaError = (mensaje: string, detalles: any = null): IRespuestaHttp<null> => ({
    mensaje,
    datos: null,
    detalles: typeof detalles === "string" ? detalles : JSON.stringify(detalles),
});

// Errores comunes
export const respuestasComunes = {
    noEncontrado: (detalle = "No ha sido posible encontrar el recurso solicitado"): IRespuestaHttp<null> => ({
        mensaje: "Recurso no encontrado.",
        datos: null,
        detalles: detalle,
    }),

    solicitudInvalida: (detalle = "Datos inválidos o incompletos"): IRespuestaHttp<null> => ({
        mensaje: "Solicitud inválida.",
        datos: null,
        detalles: detalle,
    }),

    conflicto: (detalle = "Conflicto con datos existentes"): IRespuestaHttp<null> => ({
        mensaje: "Conflicto de datos.",
        datos: null,
        detalles: detalle,
    }),

    errorServidor: (detalle = "Error interno del servidor"): IRespuestaHttp<null> => ({
        mensaje: "Error interno del servidor.",
        datos: null,
        detalles: detalle,
    }),
};
