# Clinicode V2


Este proyecto es la API backend para el **Sistema Clínico**, desarrollado con **Node.js**, **TypeScript** y el framework **Fastify**. Utiliza **Supabase** como servicio de base de datos y autenticación.

## Configuración del Proyecto

Sigue estos pasos para clonar el repositorio y configurar el proyecto en tu entorno local.

### 1. Requisitos Previos

Asegúrate de tener instalado lo siguiente:

*   **Node.js** (versión recomendada: 18 o superior)
*   **npm** (se instala con Node.js)
*   **Git**

### 2. Clonación del Repositorio

Clona el repositorio a tu máquina local usando Git:

```bash
git clone https://github.com/Inexsu-Coordinadora/Clinicode.git
```

### 3. Instalación de Dependencias

Una vez dentro del directorio del proyecto, instala todas las dependencias necesarias:

```bash
npm install
```

### 4. Configuración de Variables de Entorno

El proyecto utiliza el paquete `dotenv` para gestionar las variables de entorno. Necesitas crear un archivo llamado `.env` en la raíz del proyecto.

**`.env`**

```
# Configuración de Supabase
# Debes obtener estos valores desde el panel de control de tu proyecto Supabase
SUPABASE_URL="[TU_URL_DE_PROYECTO_SUPABASE]"
SUPABASE_ANON_KEY="[TU_CLAVE_ANON_SUPABASE]"

# Otras variables de entorno necesarias para el proyecto (si las hay)
# ...
```

> **Importante:** El proyecto utiliza `supabase-js` para interactuar con la base de datos. Asegúrate de que tu proyecto Supabase esté configurado y que las credenciales sean correctas.

### 5. Configuración de la Base de Datos (Migraciones)

El proyecto requiere una estructura de base de datos específica. Las migraciones SQL definen las tablas y relaciones necesarias.

**Tecnología de Base de Datos:** La estructura SQL proporcionada (`migraciones.sql`) es compatible con **PostgreSQL** (el motor de base de datos de Supabase), incluyendo el uso del tipo `uuid` y `ENUM`.

#### 5.1. Aplicar Migraciones

Debes ejecutar el contenido del archivo `migraciones.sql` en tu base de datos de Supabase.

1.  Accede al panel de control de tu proyecto Supabase.
2.  Navega a la sección **SQL Editor** (o similar).
3.  Copia y pega todo el contenido del archivo `migraciones.sql` en el editor.
4.  Ejecuta el script para crear las tablas: `pacientes`, `especialidades`, `medicos`, `consultorios`, `disponibilidad_consultorio` y `citas_medicas`, junto con sus respectivas claves foráneas.

### 6. Ejecución del Proyecto

El proyecto ofrece dos modos de ejecución: desarrollo y producción.

#### Modo Desarrollo

Para ejecutar el proyecto en modo desarrollo con recarga automática (hot-reload) usando `ts-node`:

```bash
npm run dev
```

El servidor se iniciará y estará escuchando en el puerto configurado (por defecto, Fastify usa el puerto `3000` a menos que se configure lo contrario).

#### Modo Producción

Para compilar y ejecutar el proyecto para producción:

1.  **Compilar el código TypeScript a JavaScript:**
    ```bash
    npm run build
    ```
    Esto generará los archivos JavaScript en el directorio `dist/`.

2.  **Iniciar el servidor de producción:**
    ```bash
    npm start
    ```

## Documentación del Proyecto

En el siguiente enlace encontrarás la documentación del proyecto:

https://docs.google.com/document/d/1VYBwgj6q2qgskG_6QSNeL9d03RMZmIWy/edit?usp=drive_link&ouid=112543562299618439305&rtpof=true&sd=true

## Pruebas de endpoints primera entrega

En el siguiente link encontrarás las pruebas de los endpoints con el API Client Bruno:

https://drive.google.com/file/d/1dA59MGxFkHyc21oHpPnG0nf3cpPhxafv/view?usp=drive_link

## Pruebas de endpoints segunda entrega
https://drive.google.com/drive/folders/1kQLqIc8m3nCeDMMfY7qbj2k1IpSj3zW6?usp=drive_link

## informe técnico segunda entrega
https://docs.google.com/document/d/11EyK-tqI_NZUqH04cZcacT8id2ls5PCK/edit?usp=drive_link&ouid=112543562299618439305&rtpof=true&sd=true

## Endpoints de la API

Todos los endpoints están disponibles bajo el prefijo:

http://localhost:3000/api/

-----
**Pacientes (/api/pacientes)**

|**Método**|**Endpoint**|**Descripción**|
| :- | :- | :- |
|**GET**|/api/pacientes|Listar todos los pacientes|
|**GET**|/api/pacientes/:idPaciente|Obtener un paciente por su ID|
|**POST**|/api/pacientes|Crear un nuevo paciente|
|**PUT**|/api/pacientes/:idPaciente|Actualizar un paciente existente|
|**DELETE**|/api/pacientes/:idPaciente|Eliminar un paciente|

-----
**Citas Médicas (/api/citas-medicas)**

|**Método**|**Endpoint**|**Descripción**|
| :- | :- | :- |
|**POST**|/api/citas-medicas|Crear una cita médica|
|**GET**|/api/citas-medicas|Listar todas las citas médicas|
|**GET**|/api/citas-medicas/:idCita|Obtener cita médica por ID|
|**PUT**|/api/citas-medicas/:idCita|Actualizar cita médica|
|**DELETE**|/api/citas-medicas/:idCita|Eliminar cita médica|

**Consultar citas de un paciente:**

|**Método**|**Endpoint**|**Descripción**|
| :- | :- | :- |
|**GET**|/api/paciente/:numeroDocumento/citas|Listar citas médicas por número de documento del paciente|

-----
** Médicos (/api/medicos)**

|**Método**|**Endpoint**|**Descripción**|
| :- | :- | :- |
|**GET**|/api/medicos|Listar todos los médicos|
|**GET**|/api/medicos/:idMedico|Obtener médico por ID|
|**POST**|/api/medicos|Crear médico|
|**PUT**|/api/medicos/:idMedico|Actualizar médico|
|**DELETE**|/api/medicos/:idMedico|Eliminar médico|

-----
**Consultorios (/api/consultorios)**

|**Método**|**Endpoint**|**Descripción**|
| :- | :- | :- |
|**POST**|/api/consultorios|Crear consultorio|
|**GET**|/api/consultorios|Listar consultorios|
|**PUT**|/api/consultorios/:id\_consultorio|Actualizar consultorio|
|**DELETE**|/api/consultorios/:id\_consultorio|Eliminar consultorio|

-----
**Asignación Médico–Consultorio (/api/asignacion-medico-consultorio)**

|**Método**|**Endpoint**|**Descripción**|
| :- | :- | :- |
|**GET**|/api/asignacion-medico-consultorio|Listar todas las asignaciones|
|**GET**|/api/asignacion-medico-consultorio/:idAsignacion|Obtener asignación por ID|
|**POST**|/api/asignacion-medico-consultorio|Crear una asignación|
|**PUT**|/api/asignacion-medico-consultorio/:idAsignacion|Actualizar una asignación|
|**DELETE**|/api/asignacion-medico-consultorio/:idAsignacion|Eliminar una asignación|

-----
**Manejo de Respuestas y Errores**

El sistema utiliza un formato estandarizado de respuestas para garantizar consistencia en todos los controladores.

**Respuesta Exitosa (Código 200 por defecto)**

TypeScript

export const respuestaExitosa = <T>(datos: T | null, mensaje: string) => ({

`  `exito: true,

`  `datos,

`  `mensaje,

});

**❌ Respuesta de Error (Códigos 400, 404, 500, etc.)**

TypeScript

export const respuestaError = (mensaje: string, codigo?: number) => ({

`  `exito: false,

`  `mensaje,

`  `codigo: codigo ?? 500,

});