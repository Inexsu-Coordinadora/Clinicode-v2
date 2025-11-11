export class ErrorAplicacion extends Error {
  codigo: number;
  detalles?: any;

  constructor(codigo: number, mensaje: string, detalles?: any) {
    super(mensaje);
    this.codigo = codigo;
    this.detalles = detalles;
  }
}

export const respuestaError = (error: unknown) => {
  if (error instanceof ErrorAplicacion) {
    return {
      exito: false,
      codigo: error.codigo,
      mensaje: error.message,
      detalles: error.detalles || null,
    };
  }

  return {
    exito: false,
    codigo: 500,
    mensaje: "Error interno del servidor",
    detalles: error,
  };
};
