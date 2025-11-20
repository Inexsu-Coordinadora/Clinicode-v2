import Fastify from "fastify";
import { medicosEnrutador } from "../../../src/presentacion/rutas/medicoEnrutador";
import { supabase } from "../../../src/core/infraestructura/cliente-db/clienteSupabase";

describe("TEST INTEGRACIÓN - Crear Médico", () => {
  let app: any;
  const timestamp = Date.now();
  const datos = {
    nombres: "Diego",
    apellidos: "Higuita",
    numero_licencia: `${timestamp}`, 
    id_especialidad: "0c1a79e3-2b07-4f52-a06e-c861ee4c4e97",
    telefono: "3001234567",
    correo: `diegoHiguita.@test.com`,
  };

  beforeAll(async () => {
    app = Fastify();
    await app.register(medicosEnrutador, { prefix: "/medicos" });
    await app.ready();
  });

  afterAll(async () => {
    //await supabase.from("medicos").delete().eq("numero_licencia", datos.numero_licencia);
    await app.close();
  });

  test("Debe crear un médico correctamente y guardarlo en la BD", async () => {
    const respuesta = await app.inject({
      method: "POST",
      url: "/medicos", 
      payload: datos,
    });

    const body = JSON.parse(respuesta.body);

    console.log("Body respuesta:", body);

    expect(respuesta.statusCode).toBe(201);

    const idMedicoCreado = body.datos;
    expect(typeof idMedicoCreado).toBe("string");
    expect(idMedicoCreado.length).toBeGreaterThan(0);

    const { data: medicoBD, error } = await supabase
      .from("medicos")
      .select("*")
      .eq("id_medico", idMedicoCreado)
      .single();

    expect(error).toBeNull();
    expect(medicoBD).not.toBeNull();
    expect(medicoBD.nombres).toBe(datos.nombres);
    expect(medicoBD.apellidos).toBe(datos.apellidos);
    expect(medicoBD.numero_licencia).toBe(datos.numero_licencia);
    expect(medicoBD.correo).toBe(datos.correo);
  });
});
