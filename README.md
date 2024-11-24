# AVFE: Aula Virtual - Facultad de Exactas

#### Este proyecto consiste en un sistema BackEnd para un posible aula virtual; en este caso, se usó de ejemplo algunas carreras y materias de la FCEQyN de la UNaM.

## Introducción

Considerando la dificultad que implica el desarrollo de un aula virtual, este proyecto se vió simplificado para cumplir con los plazos de entrega, y en un posible futuro poder terminarlo.
Esta simplificación consistió principalmente en no abarcar todas las carreras de la FCEQyN, y de las que si se incluyeron, no abarcar todas sus materias.

## Arquitectura

Para el desarrollo del proyecto se ha utlizado el FrameWork "Express" basado en Node.js, utilizando también "MongoDB" como base de datos, conectandose ambos mediante el paquete "mongoose".
De igual forma se han utlizado otros paquetes como express-validator para el desarrollo de los middlewares a utilizar, y jsonwebtoken para gestionar los tokens de los usuarios.

## Guía de Instalación

#### Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes:

- Node.js (versión 16 o superior)
- MongoDB (versión 5 o superior)
- Git (para clonar el repositorio)
- Un editor de texto, como Visual Studio Code

#### Clonar el repositorio

1. Abre tu terminal y navega a la carpeta donde deseas clonar el proyecto.
2. Ejecuta el siguiente comando:
```bash
git clone https://github.com/tu-usuario/aula-virtual.git
```
3. Ingresa al directorio del proyecto:
```bash
cd avfe
```

#### Instalación de Dependencias

1. Asegurate de estar en la carpeta raíz del proyecto.
2. Ejecuta el siguiente comando para instalar las dependencias necesarias:
```bash
npm install
```

#### Configuración del Entorno

>[!NOTE]
> El proyecto está hecho para que este paso sea opcional, solo considerar que si no se realiza este paso el puerto por defecto será el 8080

1. Crea un archivo `.env` en la reíz del proyecto
2. Copia y pega la siguiente plantilla de configuración y ajusta los valores según tu entorno. Ejemplo:
```makefile
PORT=3000  
DB_URI=mongodb://localhost:27017/  
JWT_SECRET=tu_secreto_aqui  
```

#### Iniciar el Servidor

Para ejecutar el proyecto puede utilizar alguno de los siguientes comandos:
```bash
npm start
```
```bash
npm nodemon server.js
```

#### Verificar la Instalación

1. Abre tu navegador y navega a `http://localhost:8080` (o el puerto que hayas configurado).
2. Deberías ver la página de inicio del aula virtual.

## Estructura de la Aplicación

El proyecto está organizado para seguir las mejores prácticas de desarrollo de APIs RESTful, utilizando un enfoque modular y escalable. A continuación, se describe la estructura de carpetas y archivos:
```
avfe/
    src/
        config/
            db.js
        controller/
            searchController.js
            userController.js
        middleware/
            userRules.js
            validate.js
        model/
            subject.js
            user.js
        other/
        router/
            adminRoutes.js
            searchRoutes.js
            userRoutes.js
        test/
        app.js
    .gitignore
    package-lock.json
    package.json
    README.md
    server.js
```

#### Descipción de Carpetas y Archivos

`config` 
Configuraciones del proyecto, como la conexión a la base de datos.
- `db.js`: Configura y exporta la conexión a MongoDB.

`controller`
Contiene los controladores que manejan la lógica para las diferentes entidades del sistema.
- `adminController.js`: Gestión de las peticiones que ingresan a la ruta `/admin`. Que incluyen funciones para el manejo global de carreras y materias.
- `searchController.js`: Gestión de las peticiones de la sección de búsqueda de materias.
- `sectionController.js`: Gestión de las peticiones exclusivas de las secciones que puede tener una materia.
- `subjectController.js`: Gestión de peticiones relacionadas al uso de los usuarios `student` y `professor` con las materias
- `userController.js`: Gestión de las peticiones relacionadas a la correspondiente ruta.

`middleware`
Contiene los middlewares para la validación de datos.
- `userRules.js`: Las reglas de validación para la creación de usuarios
- `validate.js`: Recibe el array de errores de las validaciones, si está vacio permite que la petición pase al controlador correspondiente, sino, devuelve el array de errores.

`model`
Define los esquemas y modelos de datos de MongoDB utilizando Mongoose.
- `carrer.js`: Modelo para las carreras
- `subject.js`: Modelo para las secciones
- `subject.js`: Modelo para las materias
- `user.js`: Modelo para los usuarios

`other`
Carpeta destinada a agregar archivos adjuntos al proyecto. De momento no se han guardado archivos.

`router`
Define las rutas de la API y asigna los controladores correspondientes.
- `adminRoutes.js`: Rutas disponibles para la gestión del sistema en general por parte de un administrador (`/subject`,`/carrer`)
- `searchRoutes.js`: Rutas para la búsqueda de materias (`/list`,`/byid`,`/bycarrer`)
- `sectionRoutes.js`: Rutas disponibles para la visualización y gestión de secciones dentro de una materia (`/:id`,`/create`,`/update/:id`,`/drop/:id`,`/add_subsection/:id`,`/delete_subsection/:id`)
- `subjectRoutes.js`: Rutas disponibles para la visualización y gestión de materias por parte de los estudiantes y profesores (`/:id`,`/students/:id`,`/professor/:id`,`/section/:id`)
- `userRoutes.js`: Rutas disponibles para la gestión de usuarios (`/byemail`,`/byid`,`/list`,`/create`,`/update`,`/drop`)

`test`
Carpeta destinada a guardar todos los test del proyecto. De momento no han creado test.

`app.js`
Archivo que se encarga de dirigir las peticiones al router correspondiente.

##### Archivos Raíz

- `package.json`: Dependencias y scripts del proyecto.
- `README.MD`: Presentación y Manual del Proyecto
- `server.js`: Archivo que monta el servidor e inicializa el `app.js`

#### Flujo General

1. Las solicitudes llegan a `server.js` y son dirigidas a las rutas definidas en `app.js` y los ruteadores de `router/`.
2. `router/` dispara los middlewares de validación correspondientes a la ruta y tipo de petición.
3. Si pasan las validaciones las rutas llaman a los controladores correspondientes en `controller/`.
4. Los controladores interactúan con los modelos en `model/` para manejar la lógica de datos.

## Endpoints y API

#### POST /admin/carrer
Crea las carreras que se pasan en el body como un array de objetos de la siguiente manera:
```JSON
[
    {
        "carrer_id":"",
        "name": "",
        "type_c": "",
        "subjects": []
    },
    {
        "carrer_id","",
        "name": "",
        "type_c": "",
        "subjects": []
    }
]
```
Las respuestas notifican si las materias enviadas fueron creadas correctamente, si ya existian o son inválidas (por que de alguna manera no cumplian con el esquema). En el último caso, también notificará el porque.

- Parámetros de ruta: ninguna
- Repuesta Mixta:
    - Codigo de Estado: `200 OK`
    - Cuerpo (JSON)
```JSON
{
    "message":
    "results":{
        "created":[...],
        "existing":[...],
        "invalid":[
            {
                "career": {...},        // se motrará lo que se había enviado
                "error": error.message
            }
        ]
    }
}
```

#### PUT /admin/carrer
Actuliza las carreras que se envían en el body en forma de array de objetos.

Para identificarlas, obligatoriamente se tienen que enviar las id's de las carreras. Los demás campos no son obligatorios, pero los que se envien van a ser actualizados con los valores proporcionados (en caso cumplan con las validaciones)

Las respuestas son objetos que tienen un mensaje (de error o de éxito), y un campo de resultados en el que se notificarán las carreras actualizadas y como quedaron, las carreras que no fueron encontradas y las que fueron proporcionadas por el usuario, pero que resultaron inválidas.

Ejemplo:

- Consulta:
    - Parámetros de ruta: ninguna
    - Body (JSON)
```JSON
[
    {
        "career_id": "carrera01",
        "name": "Ingeniería Civil",
        "type_c": "Grado"
    },
    {
        "career_id": "carrera02",
        "subjects": ["648a0d62b1c2e8d12f23a4d8"]
    },
    {
        "career_id": "carrera_inexistente",
        "name": "Carrera Fantasma"
    }
]
```
- Repuesta Mixta:
    - Codigo de Estado: `200 OK`
    - Cuerpo (JSON)
```JSON
{
    "message": "Operación completada.",
    "results": {
        "updated": [
            {
                "_id": "648a0d62b1c2e8d12f23a4d7",
                "career_id": "carrera01",
                "name": "Ingeniería Civil",
                "type_c": "Grado",
                "subjects": [],
                "createdAt": "2024-11-01T15:55:32.123Z",
                "updatedAt": "2024-11-21T16:20:45.456Z"
            },
            {
                "_id": "648a0d62b1c2e8d12f23a4d9",
                "career_id": "carrera02",
                "name": "Diseño Gráfico",
                "type_c": "Pregrado",
                "subjects": ["648a0d62b1c2e8d12f23a4d8"],
                "createdAt": "2024-11-02T10:00:00.000Z",
                "updatedAt": "2024-11-21T16:20:45.456Z"
            }
        ],
        "notFound": [
            {
                "career_id": "carrera_inexistente",
                "reason": "Carrera no encontrada."
            }
        ],
        "invalid": []
    }
}
```

#### DELETE /admin/carrer
Elimina las carreras que son proporcionadas en el body en forma de array de id's.

Las respuestas detallan que materias de las proporcionadas fueron eliminadas, cuales no fueron encontradas y cuales han tenido algún tipo de error imprevisto (mostrando el mensaje del error)

Ejemplo:

- Consulta:
    - Parámetros de ruta: ninguna
    - Body (JSON)
```JSON
{
    "career_ids": ["carrera01", "carrera02", "carrera_inexistente", "carrera_error"]
}
```
- Respuesta Mixta:
    - Codigo de Estado: `200 OK`
    - Cuerpo (JSON)
```JSON
{
    "message": "Operación completada.",
    "results": {
        "deleted": [
            {
                "_id": "648a0d62b1c2e8d12f23a4d7",
                "career_id": "carrera01",
                "name": "Ingeniería Civil",
                "type_c": "Grado",
                "subjects": [],
                "createdAt": "2024-11-01T15:55:32.123Z",
                "updatedAt": "2024-11-21T16:20:45.456Z"
            },
            {
                "_id": "648a0d62b1c2e8d12f23a4d8",
                "career_id": "carrera02",
                "name": "Diseño Gráfico",
                "type_c": "Pregrado",
                "subjects": [],
                "createdAt": "2024-11-02T10:00:00.000Z",
                "updatedAt": "2024-11-21T16:20:45.456Z"
            }
        ],
        "notFound": [
            {
                "career_id": "carrera_inexistente",
                "reason": "Carrera no encontrada."
            }
        ],
        "errors": [
            {
                "career_id": "carrera_error",
                "reason": "Error de base de datos al intentar eliminar esta carrera."
            }
        ]
    }
}
```

#### POST /admin/subject
Crea las materias que son proporcionadas por el usuario en el body de la consulta.
En los casos en que las materias ya existan o que las materias no pasen las validaciones de esquema serán agregadas a la parte `failed` de la respuesta y se mostrará la razón por la que falló.

Ejemplo:
- Consulta:
    - Parámetros de ruta: ninguna
    - Body (JSON)
```JSON
[
    {
        "name": "Matemáticas Avanzadas",
        "carrers": ["64b7dcf2f2a4d9c2e0e7c93a"],
        "professors": ["64b7dcf2f2a4d9c2e0e7c93b"],
        "students": ["64b7dcf2f2a4d9c2e0e7c93c", "64b7dcf2f2a4d9c2e0e7c93d"],
        "sectiones": ["64b7dcf2f2a4d9c2e0e7c93e"]
    },
    {
        "name": "Física Teórica",
        "carrers": [],
        "professors": [],
        "students": [],
        "sectiones": []
    }
]
```
- Respuesta Mixta:
    - Codigo de Estado: `200 OK`
    - Cuerpo (JSON)
```JSON
{
    "message": "Proceso de creación completado.",
    "results": {
        "created": [
            {
                "_id": "64b7dcf2f2a4d9c2e0e7c940",
                "name": "Matemáticas Avanzadas",
                "carrers": ["64b7dcf2f2a4d9c2e0e7c93a"],
                "professors": ["64b7dcf2f2a4d9c2e0e7c93b"],
                "students": ["64b7dcf2f2a4d9c2e0e7c93c", "64b7dcf2f2a4d9c2e0e7c93d"],
                "sectiones": ["64b7dcf2f2a4d9c2e0e7c93e"],
                "createdAt": "2024-11-21T18:00:00.000Z",
                "updatedAt": "2024-11-21T18:00:00.000Z"
            }
        ],
        "failed": [
            {
                "subject": "Física Teórica",
                "reason": "La materia ya existe."
            }
        ]
    }
}
```

#### PUT /admin/subject
Actualiza las materias que son proporcionadas por el usuario en el body de la consulta.
El id de las materias son obligatorias, ya que se localizarán las materias mediante este dato. En caso contrario saldrá un error.
Los demás campos no son obligatorios y solo se deben enviar los datos que quieren ser modificados.
En caso de que no se encuentren las materias o alguno de los datos no cumplan algun requisito de esquema, se verá reflejado en la parte `failed` de la respuesta, acompañado de la razón del fallo.

Ejemplo:
- Consulta:
    - Parámetros de ruta: ninguna
    - Body (JSON)
```JSON
[
    {
        "_id": "64b7dcf2f2a4d9c2e0e7c940",
        "name": "Matemáticas Aplicadas",
        "professors": ["64b7dcf2f2a4d9c2e0e7c93b"]
    },
    {
        "_id": "64b7dcf2f2a4d9c2e0e7c941",
        "students": ["64b7dcf2f2a4d9c2e0e7c93d"]
    }
]
```
- Respuesta Mixta:
    - Codigo de Estado: `200 OK`
    - Cuerpo (JSON)
```JSON
{
    "message": "Proceso de actualización completado.",
    "results": {
        "updated": [
            {
                "_id": "64b7dcf2f2a4d9c2e0e7c940",
                "name": "Matemáticas Aplicadas",
                "carrers": [],
                "professors": ["64b7dcf2f2a4d9c2e0e7c93b"],
                "students": [],
                "sectiones": [],
                "createdAt": "2024-11-21T18:00:00.000Z",
                "updatedAt": "2024-11-21T18:30:00.000Z"
            }
        ],
        "failed": [
            {
                "subject": "64b7dcf2f2a4d9c2e0e7c941",
                "reason": "Materia no encontrada."
            }
        ]
    }
}
```

#### DELETE /admin/subject
Elimina las materias proporcionadas en el body de la consulta en forma de objeto.
La respuesta notificará cuales fueron las materias eliminadas exitosamente, cuales tuvieron fallos y el porque.

Ejemplo:
- Consulta:
    - Parámetros de ruta: ninguna
    - Body (JSON)
```JSON
{
    "subject_ids": [
        "64b7dcf2f2a4d9c2e0e7c940",
        "64b7dcf2f2a4d9c2e0e7c941"
    ]
}
```
- Respuesta Mixta:
    - Codigo de Estado: `200 OK`
    - Cuerpo (JSON)
```JSON
{
    "message": "Proceso de eliminación completado.",
    "results": {
        "deleted": [
            {
                "_id": "64b7dcf2f2a4d9c2e0e7c940",
                "name": "Matemáticas Aplicadas",
                "carrers": [],
                "professors": [],
                "students": [],
                "sectiones": [],
                "createdAt": "2024-11-21T18:00:00.000Z",
                "updatedAt": "2024-11-21T18:30:00.000Z"
            }
        ],
        "notFound": [
            {
                "subject_id": "64b7dcf2f2a4d9c2e0e7c941",
                "reason": "Materia no encontrada."
            }
        ]
    }
}
```

#### GET /search/list
Lista todas las materias existentes.

#### GET /search/bytype/:type
Busca y muestra todas las carreras filtrando por el tipo de carrera (`type`) que el usuario especifique en la ruta como parámetro.

Los `type` válidos son:
- `Ingreso`
- `Pregrado`
- `Grado`
- `Posgrado`
- `Diplomatura`
- `Cursos`

Ejemplo:
- Consulta:
    - Parámetros de ruta: Ingreso

- Respuesta:
    - Codigo de Estado: `200 OK`
    - Cuerpo (JSON)
```JSON
[
    {
    "name": "MATEMÁTICA",
    "carrers": ["Ingreso"],
    "professors": [],
    "students": [],
    "sections": []
    },
    {
    "name": "INFORMÁTICA BÁSICA",
    "carrers": ["Ingreso"],
    "professors": [],
    "students": [],
    "sections": []
    },
    {
    "name": "ESTRATEGIAS DE APRENDIZAJE",
    "carrers": ["Ingreso"],
    "professors": [],
    "students": [],
    "sections": []
    },
    {
    "name": "BIOLOGÍA",
    "carrers": ["Ingreso"],
    "professors": [],
    "students": [],
    "sections": []
    }
]
```

#### GET /search/bycarrer/:carrer
Busca y muestra todas las materias a partir de la carrera que el usuario proporcione como parámetro de la ruta.

Ejemplo:
- Consulta:
    - Parámetros de ruta: `IQ`

- Respuesta:
    - Codigo de Estado: `200 OK`
    - Cuerpo (JSON)
```JSON
[
    {
    "name": "ELEMENTOS DE MATEMÁTICA",
    "carrers": ["IQ", "LA"],
    "professors": [],
    "students": [],
    "sections": []
    },
    {
    "name": "ANÁLISIS I",
    "carrers":["IA","IQ","LA"],
    "professors": [],
    "students": [],
    "sections": []
    },
    {
    "name": "ÁLGEBRA LINEAL",
    "carrers":["IA","IQ","LA"],
    "professors": [],
    "students": [],
    "sections": []
    }
]
```


##### Errores Comunes

`400 Bad Request`: La solicitud no fue procesada debido a un error del cliente (por ejemplo, datos faltantes o mal formateados).
`401 Unauthorized`: El token de autenticación es inválido o ha expirado.
`404 Not Found`: El recurso solicitado no fue encontrado en el servidor.
`500 Internal Server Error`: Error inesperado del servidor.

## Modelos de Datos

## Funcionalidades Clave

## Problemas Conocidos y Soluciones

## Plan de Desarrollo Futuro

## Créditos