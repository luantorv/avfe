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

## Endpoints

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

#### GET /section/:id
Devuelve la sección que el usuario pase como parámetro en la ruta.

Ejemplo:
- Consulta:
    - Parámetros de ruta: `6742a937ab2e7b18804590d2`

- Respuesta:
    - Codigo de Estado: `200 OK`
    - Cuerpo (JSON)
```JSON
{
    "_id": "6742a937ab2e7b18804590d2",
    "section_id": "6742a937ab2e7b18804590d3",
    "title": "Avisos",
    "type_sec": "news",
    "author": "674299ee9b67d2288db27c65",
    "body": "Aquí se van a enviar los avisos referentes a la materia.",
    "status": false,
    "subsections": [],
    "date": "2024-11-24T04:19:03.062Z",
    "__v": 2
}
```

#### POST /section/create
Crea la sección que el usuario le pase en el body de la consulta.

Ejemplo:
- Consulta:
    - Parámetros de ruta: ninguno
    - Body (JSON)
```JSON
{
    "title":"Feriado 2/12",
    "type_sec":"news",
    "author":"674299ee9b67d2288db27c65",
    "body":"Les recuerdo que el día lunes 2/12 es el feriado puente del día sábado 30/11.",
    "status": true,
    "subsections":[]
}
```

- Respuesta:
    - Codigo de Estado: `201 Created`
    - Cuerpo (JSON)
```JSON
{
    "section_id": "67438194451578e46c449d29",
    "title": "Feriado 2/12",
    "type_sec": "news",
    "author": "674299ee9b67d2288db27c65",
    "body": "Les recuerdo que el día lunes 2/12 es el feriado puente del día sábado 30/11.",
    "status": false,
    "subsections": [],
    "_id": "67438194451578e46c449d28",
    "date": "2024-11-24T19:42:12.664Z",
    "__v": 0
}
```

#### PUT /section/update/:id
Actualiza la sección con el id que se pasó como parámetro con los campos y valores que se envien en el body en forma de objeto.

>[!IMPORTANT]
>Solo se tienen que enviar los campos a actualizar

Ejemplo:
- Consulta:
    - Parámetros de ruta: `67438194451578e46c449d28`
    - Body (JSON)
```JSON
{
    "body":"Les recuerdo que el día lunes 2/12 es el feriado puente del día sábado 30/11, Día Conmemoratorio a Andresito Guacurarí, Día de la Bandera de Misiones y Día de la Yerba Mate"
}
```

- Respuesta:
    - Codigo de Estado: `200 OK`
    - Cuerpo (JSON)
```JSON
{
    "_id": "67438194451578e46c449d28",
    "section_id": "67438194451578e46c449d29",
    "title": "Feriado 2/12",
    "type_sec": "news",
    "author": "674299ee9b67d2288db27c65",
    "body": "Les recuerdo que el día lunes 2/12 es el feriado puente del día sábado 30/11, Día Conmemoratorio a Andresito Guacurarí, Día de la Bandera de Misiones y Día de la Yerba Mate",
    "status": false,
    "subsections": [],
    "date": "2024-11-24T19:42:12.664Z",
    "__v": 0
}
```

#### DELETE /section/drop/:id
Borra la sección con el id que el usuario pase como parámetro en la ruta.

Ejemplo:
- Consulta:
    - Parámetros de ruta: `67438194451578e46c449d28`

- Respuesta:
    - Codigo de Estado: `200 OK`
    - Cuerpo (JSON)
```JSON
{
    "message": "Sección eliminada correctamente"
}
```

#### POST /section/add_subsection/:id
Agrega las subsecciones que el usuario indique en el body de la consulta a la sección que se es enviada como parámetro.

>[!IMPORTANT]
>Esta ruta no crea las subsecciones, solo las añade al campo `subsections` que tiene la sección que las va a contener.
>Por lo que primero tiene que ir a `/section/create` para crear la/s secciones que pasarán a ser subsecciones, copiar los `_id` de cada una y ahí venir a esta ruta para agregarlas.

Ejemplo:
- Consulta:
    - Parámetros de ruta: `6742a937ab2e7b18804590d2`
    - Body (JSON)
```JSON
{
    "subsectionId":"6743848c451578e46c449d2e"
}
```

- Respuesta:
    - Codigo de Estado: `200 OK`
    - Cuerpo (JSON)
```JSON
{
    "message": "Subsección agregada",
    "section": {
        "_id": "6742a937ab2e7b18804590d2",
        "section_id": "6742a937ab2e7b18804590d3",
        "title": "Avisos",
        "type_sec": "news",
        "author": "674299ee9b67d2288db27c65",
        "body": "Aquí se van a enviar los avisos referentes a la materia.",
        "status": false,
        "subsections": [
            "6743848c451578e46c449d2e"
        ],
        "date": "2024-11-24T04:19:03.062Z",
        "__v": 3
    }
}
```

#### DELETE /section/drop_subsection/:id
Borra las subsecciones que el usuario indique en el body de la consulta a la sección que se es enviada como parámetro.

Ejemplo:
- Consulta:
    - Parámetros de ruta: `6742a937ab2e7b18804590d2`
    - Body (JSON)
```JSON
{
    "subsectionId":"6743848c451578e46c449d2e"
}
```

- Respuesta:
    - Codigo de Estado: `200 OK`
    - Cuerpo (JSON)
```JSON
{
    "message": "Subsección eliminada",
    "section": {
        "_id": "6742a937ab2e7b18804590d2",
        "section_id": "6742a937ab2e7b18804590d3",
        "title": "Avisos",
        "type_sec": "news",
        "author": "674299ee9b67d2288db27c65",
        "body": "Aquí se van a enviar los avisos referentes a la materia.",
        "status": false,
        "subsections": [],
        "date": "2024-11-24T04:19:03.062Z",
        "__v": 4
    }
}
```

#### GET /subject/:id
Devuelve la materia correspondiente al id que el usuario envió como parámetro en la ruta.

Ejemplo:
- Consulta:
    - Parámetro de la ruta: `67426fcfc5890a3654aaa99c`

- Respuesta:
    - Código de Estado: `200 OK`
    - Body (JSON)
```JSON
{
    "_id": "67426fcfc5890a3654aaa99c",
    "name": "ANÁLISIS I",
    "carrers": [
        "IQ",
        "IA",
        "LA"
    ],
    "professors": [],
    "students": [],
    "sectiones": [
        {
            "_id": "6742acf7add2f9d05847899e",
            "section_id": "6742acf7add2f9d05847899f",
            "title": "Bienvenidos",
            "type_sec": "news",
            "author": "674299ee9b67d2288db27c65",
            "body": "Bienvenidos a esta materia.",
            "status": false,
            "subsections": [],
            "date": "2024-11-24T04:35:03.739Z",
            "__v": 0
        }
    ],
    "__v": 0
}
```

#### POST /subject/student/:id
Añade a los estudiantes especificados en el body a la materia correspondiente al id de la ruta.

Ejemplo:
- Consulta:
    - Parámetro de la ruta: `67426fcfc5890a3654aaa99c`
    - Body (JSON)
```JSON
{
    "students": [
        { "email": "macie.okon56@hotmail.com" }
    ]
}
```
- Respuesta:
    - Código de Estado: `200 OK`
    - Body (JSON)
```JSON
{
    "message": "Estudiantes agregados exitosamente.",
    "subject": {
        "_id": "67426fcfc5890a3654aaa99c",
        "name": "ANÁLISIS I",
        "carrers": [
            "IQ",
            "IA",
            "LA"
        ],
        "professors": [],
        "students": [
            "673fe1c6068559e42f5db214"
        ],
        "sectiones": [
            "6742acf7add2f9d05847899e"
        ],
        "__v": 0
    },
    "notFoundEmails": []
}
```
>[!NOTE]
>No se hace un `.populate('students')` ya que aunque puede servir para verificar si se añadieron los alumnos correctos, por la cantidad de alumnos que puede llegar a tener una materia se  vió contraproducente a nivel de recursos.

#### POST /subject/professor/:id
Añade a los profesores especificados en el body a la materia correspondiente al id de la ruta.

Ejemplo:
- Consulta:
    - Parámetro de la ruta: `67426fcfc5890a3654aaa99c`
    - Body (JSON)
```JSON
{
    "professors": [
        { "email": "pepito@gmail.com" }
    ]
}
```
- Respuesta:
    - Código de Estado: `200 OK`
    - Body (JSON)
```JSON
{
    "message": "Profesores agregados exitosamente.",
    "subject": {
        "_id": "67426fcfc5890a3654aaa99c",
        "name": "ANÁLISIS I",
        "carrers": [
            "IQ",
            "IA",
            "LA"
        ],
        "professors": [
            {
                "_id": "674299ee9b67d2288db27c65",
                "name": "Lucas",
                "lastname": "Podkowa",
                "email": "pepito@gmail.com",
                "password": "contraseña",
                "guest": false,
                "carrers": [
                    "LSI"
                ],
                "date_entry": "2024-11-24T03:13:50.288Z",
                "__v": 0
            }
        ],
        "students": [
            "673fe1c6068559e42f5db214"
        ],
        "sectiones": [
            "6742acf7add2f9d05847899e"
        ],
        "__v": 0
    },
    "notFoundEmails": []
}
```
>[!NOTE]
>Se hace un `.populate('professors')` porque normalmente una meteria no tiene tantos profesores, por lo que no acarrearían un malgasto de recursos; además, los profesores tienen más permisos que un alumno, por lo que corroborar que un profesor sea añadido de forma correcta resulta más necesario que a un alumno.

#### POST /subject/section/:id
Añade las secciones especificadas en el body a la materia correpondiente al id de la ruta.

Ejemplo:
- Consulta:
    - Parámetro de la ruta: `67426fcfc5890a3654aaa99c`
    - Body (JSON)
```JSON
{
    "sections":[
        "67438fdc801d4498eb51c5dd"
    ]
}
```
- Respuesta:
    - Código de Estado: `200 OK`
    - Body (JSON)
```JSON
{
    "message": "Secciones agregadas exitosamente.",
    "subject": {
        "_id": "67426fcfc5890a3654aaa99c",
        "name": "ANÁLISIS I",
        "carrers": [
            "IQ",
            "IA",
            "LA"
        ],
        "professors": [
            "674299ee9b67d2288db27c65"
        ],
        "students": [
            "673fe1c6068559e42f5db214"
        ],
        "sectiones": [
            {
                "_id": "6742acf7add2f9d05847899e",
                "section_id": "6742acf7add2f9d05847899f",
                "title": "Bienvenidos",
                "type_sec": "news",
                "author": "674299ee9b67d2288db27c65",
                "body": "Bienvenidos a esta materia.",
                "status": false,
                "subsections": [],
                "date": "2024-11-24T04:35:03.739Z",
                "__v": 0
            },
            {
                "_id": "67438fdc801d4498eb51c5dd",
                "section_id": "67438fdc801d4498eb51c5de",
                "title": "Recuperatorio",
                "type_sec": "news",
                "author": "674299ee9b67d2288db27c65",
                "body": "El recupetario integrador va a ser el viernes 6/12 a las 7:00hs en el aula 16 del edificio central.",
                "status": false,
                "subsections": [],
                "date": "2024-11-24T20:43:08.048Z",
                "__v": 0
            }
        ],
        "__v": 0
    },
    "notAddedSections": null
}
```

#### DELETE /subject/student/:id
Elimina a los estudiantes especificados en el body de la materia correspondiente al id de la ruta.

Ejemplo:
- Consulta:
    - Parámetro de la ruta: `67426fcfc5890a3654aaa99c`
    - Body (JSON)
```JSON
{
    "students": [
        { "email": "macie.okon56@hotmail.com" }
    ]
}
```
- Respuesta:
    - Código de Estado: `200 OK`
    - Body (JSON)
```JSON
{
    "message": "Estudiantes eliminados exitosamente.",
    "subject": {
        "_id": "67426fcfc5890a3654aaa99c",
        "name": "ANÁLISIS I",
        "carrers": [
            "IQ",
            "IA",
            "LA"
        ],
        "professors": [
            "674299ee9b67d2288db27c65"
        ],
        "students": [],
        "sectiones": [
            "6742acf7add2f9d05847899e",
            "67438fdc801d4498eb51c5dd"
        ],
        "__v": 0
    }
}
```

#### DELETE /subject/professor/:id
Elimina a los profesores especificados en el body de la materia correspondiente al id de la ruta.

Ejemplo:
- Consulta:
    - Parámetro de la ruta: `67426fcfc5890a3654aaa99c`
    - Body (JSON)
```JSON
{
    "professors": [
        { "email": "pepito@gmail.com" }
    ]
}
```
- Respuesta:
    - Código de Estado: `200 OK`
    - Body (JSON)
```JSON
{
    "message": "Profesores eliminados exitosamente.",
    "subject": {
        "_id": "67426fcfc5890a3654aaa99c",
        "name": "ANÁLISIS I",
        "carrers": [
            "IQ",
            "IA",
            "LA"
        ],
        "professors": [],
        "students": [],
        "sectiones": [
            "6742acf7add2f9d05847899e",
            "67438fdc801d4498eb51c5dd"
        ],
        "__v": 0
    }
}
```

#### DELETE /subject/section/:id
Elimina las secciones especificadas en el body de la materia correspondiente al id de la ruta.

Ejemplo:
- Consulta:
    - Parámetro de la ruta: `67426fcfc5890a3654aaa99c`
    - Body (JSON)
```JSON
{
    "sections": [
        "67438fdc801d4498eb51c5dd"
    ]
}
```
- Respuesta:
    - Código de Estado: `200 OK`
    - Body (JSON)
```JSON
{
    "message": "Operación completada.",
    "removedSections": [
        {
            "_id": "67438fdc801d4498eb51c5dd",
            "section_id": "67438fdc801d4498eb51c5de",
            "title": "Recuperatorio",
            "type_sec": "news",
            "author": "674299ee9b67d2288db27c65",
            "body": "El recupetario integrador va a ser el viernes 6/12 a las 7:00hs en el aula 16 del edificio central.",
            "status": false,
            "subsections": [],
            "date": "2024-11-24T20:43:08.048Z",
            "__v": 0
        }
    ],
    "invalidSections": [],
    "unrelatedSections": [],
    "updatedSubject": {
        "_id": "67426fcfc5890a3654aaa99c",
        "name": "ANÁLISIS I",
        "carrers": [
            "IQ",
            "IA",
            "LA"
        ],
        "professors": [],
        "students": [],
        "sectiones": [
            {
                "_id": "6742acf7add2f9d05847899e",
                "section_id": "6742acf7add2f9d05847899f",
                "title": "Bienvenidos",
                "type_sec": "news",
                "author": "674299ee9b67d2288db27c65",
                "body": "Bienvenidos a esta materia.",
                "status": false,
                "subsections": [],
                "date": "2024-11-24T04:35:03.739Z",
                "__v": 0
            }
        ],
        "__v": 0
    }
}
```

#### GET /users/profyle/:email
Muestra información básica del usuario del cuál se ha proporcionado el email.

Ejemplo:
- Consulta:
    - Parámetro de la ruta: `macie.okon56@hotmail.com`
    - Body (JSON)
- Respuesta:
    - Código de Estado:
    - Body (JSON)
```JSON
{
    "name": "Dr.",
    "lastname": "Russel",
    "email": "macie.okon56@hotmail.com",
    "carrers": []
}
```

#### GET /users/list
Lista todos los usuarios del sistema.

Ejemplo:
- Consulta:
    - Parámetro de la ruta: ninguno
    - Body (JSON): ninguno
- Respuesta:
    - Código de Estado: `200 OK`
    - Body (JSON)
```JSON
[
    {
        "_id": "673fe1c6068559e42f5db214",
        "name": "Dr.",
        "lastname": "Russel",
        "email": "macie.okon56@hotmail.com",
        "password": "vasCD5l2pdaBZ0b",
        "guest": true,
        "carrers": [],
        "date_entry": "2024-11-22T01:43:34.443Z",
        "__v": 0
    },
    {
        "_id": "674299069c70e31577d06e67",
        "name": "Luis Antonio",
        "lastname": "Reis Viera",
        "email": "luantorv@gmail.com",
        "password": "contraseña",
        "guest": false,
        "carrers": [
            "IQ"
        ],
        "date_entry": "2024-11-24T03:09:58.089Z",
        "__v": 0
    },
    {
        "_id": "674299ee9b67d2288db27c65",
        "name": "Lucas",
        "lastname": "Podkowa",
        "email": "pepito@gmail.com",
        "password": "contraseña",
        "guest": false,
        "carrers": [
            "LSI"
        ],
        "date_entry": "2024-11-24T03:13:50.288Z",
        "__v": 0
    }
]
```

#### GET /users/byemail
Busca al usuario con el email que fue enviado en la query.

Ejemplo:
- Consulta:
    - Parámetro de la ruta: ninguno
    - Query: `?email=macie.okon56@hotmail.com`
- Respuesta:
    - Código de Estado: `200 OK`
    - Body (JSON)
```JSON
{
    "_id": "673fe1c6068559e42f5db214",
    "name": "Dr.",
    "lastname": "Russel",
    "email": "macie.okon56@hotmail.com",
    "password": "vasCD5l2pdaBZ0b",
    "guest": true,
    "carrers": [],
    "date_entry": "2024-11-22T01:43:34.443Z",
    "__v": 0
}
```

#### GET /users/byid
Busca y devuelve al usuario del id que fue proporcionado en la query.

Ejemplo:
- Consulta:
    - Parámetro de la ruta:
    - Query: `?_id=673fe1c6068559e42f5db214`
- Respuesta:
    - Código de Estado: `200 OK`
    - Body (JSON)
```JSON
{
    "_id": "673fe1c6068559e42f5db214",
    "name": "Dr.",
    "lastname": "Russel",
    "email": "macie.okon56@hotmail.com",
    "password": "vasCD5l2pdaBZ0b",
    "guest": true,
    "carrers": [],
    "date_entry": "2024-11-22T01:43:34.443Z",
    "__v": 0
}
```

#### GET /users/byvalue
Busca a los usuarios que cumplan con la consulta hecha.

Ejemplo:
- Consulta:
    - Parámetro de la ruta: ninguno
    - Query: `?guest=true`
    
>[!TIP]
>En la query se pueden concatenar consultas con `&` para conseguir respuestas más específicas.
>Por ejemplo: `?name="Luis"&guest=false"`

- Respuesta:
    - Código de Estado:
    - Body (JSON)
```JSON
[
    {
        "_id": "673fe1c6068559e42f5db214",
        "name": "Dr.",
        "lastname": "Russel",
        "email": "macie.okon56@hotmail.com",
        "password": "vasCD5l2pdaBZ0b",
        "guest": true,
        "carrers": [],
        "date_entry": "2024-11-22T01:43:34.443Z",
        "__v": 0
    }
]
```

#### POST /users/create
Crea a los usuarios que fueron enviados en el body de la consulta en forma de array.

Ejemplo:
- Consulta:
    - Parámetro de la ruta: ninguno
    - Body (JSON)
```JSON
[
    {
        "name": "Demian",
        "lastname": "Viedma",
        "email": "{{$randomEmail}}",
        "password": "contraseña",
        "guest": false,
        "carrers": ["IQ"]
    },
    {
        "name": "Natahel",
        "lastname": "Golke",
        "email": "{{$randomEmail}}",
        "password": "contraseña",
        "guest": false,
        "carrers": ["IA"]
    },
    {
        "name": "Maxi",
        "lastname": "Sotelo",
        "email": "{{$randomEmail}}",
        "password": "contraseña",
        "guest": false,
        "carrers": ["IQ"]
    }
]
```
- Respuesta:
    - Código de Estado: `201 Created`
    - Body (JSON)
```JSON
{
    "message": "Proceso de creación de usuarios completado.",
    "results": {
        "created": [
            {
                "name": "Demian",
                "lastname": "Viedma",
                "email": "Jeffrey24@yahoo.com",
                "password": "contraseña",
                "guest": false,
                "carrers": [
                    "IQ"
                ],
                "_id": "6743b01601f9744d489c0a69",
                "date_entry": "2024-11-24T23:00:38.859Z",
                "__v": 0
            },
            {
                "name": "Natahel",
                "lastname": "Golke",
                "email": "Abbigail.Russel86@gmail.com",
                "password": "contraseña",
                "guest": false,
                "carrers": [
                    "IA"
                ],
                "_id": "6743b01601f9744d489c0a6b",
                "date_entry": "2024-11-24T23:00:38.953Z",
                "__v": 0
            },
            {
                "name": "Maxi",
                "lastname": "Sotelo",
                "email": "Rowland.Steuber@gmail.com",
                "password": "contraseña",
                "guest": false,
                "carrers": [
                    "IQ"
                ],
                "_id": "6743b01601f9744d489c0a6d",
                "date_entry": "2024-11-24T23:00:38.965Z",
                "__v": 0
            }
        ],
        "errors": []
    }
}
```

#### PUT /users/update/:id
Actualiza al usuario del id proporcionado con los campos y valores que son enviados en el body de la consulta.

Ejemplo:
- Consulta:
    - Parámetro de la ruta: `673fe1c6068559e42f5db214`
    - Body (JSON)
```JSON
{
    "name": "Menganito"
}
```
- Respuesta:
    - Código de Estado: `200 OK`
    - Body (JSON)
```JSON
{
    "message": "Usuario actualizado",
    "user": {
        "_id": "673fe1c6068559e42f5db214",
        "name": "Menganito",
        "lastname": "Russel",
        "email": "macie.okon56@hotmail.com",
        "password": "vasCD5l2pdaBZ0b",
        "guest": true,
        "carrers": [],
        "date_entry": "2024-11-22T01:43:34.443Z",
        "__v": 0
    }
}
```

#### DELETE /users/drop
Borra los usuarios que son indicados en el body de la consulta en forma de array de id's.

Ejemplo:
- Consulta:
    - Body(JSON)
```JSON
[
    { "_id":"6743b01601f9744d489c0a6d"}
]
```
- Respuesta:
    - Código de Estado: ``
    - Body (JSON)
```JSON
{
    "message": "Usuarios eliminados correctamente",
    "users": [
        {
            "_id": "6743b01601f9744d489c0a6d",
            "name": "Maxi",
            "lastname": "Sotelo",
            "email": "Rowland.Steuber@gmail.com"
        }
    ]
}
```

##### Errores Comunes

`400 Bad Request`: La solicitud no fue procesada debido a un error del cliente (por ejemplo, datos faltantes o mal formateados).
`401 Unauthorized`: El token de autenticación es inválido o ha expirado.
`404 Not Found`: El recurso solicitado no fue encontrado en el servidor.
`500 Internal Server Error`: Error inesperado del servidor.

## Modelos de Datos
Para el desarrollo de los modelos se hizo uso de la libreria Mongoose, para así crear los schemas necesarios. Estos pueden ser encontrados en `./avfe/src/model/`

Se han creado cuatro modelos que se detallarán a continuación:

#### carrer.js
Este es el modelo correspondiente a las carreras existentes en el sistema.
```JavaScript
import { Schema, model } from 'mongoose';

const CareerSchema = new Schema({
  carrer_id: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true 
    },
  name: { 
    type: String, 
    required: true, 
    trim: true 
    },
  type_c: { 
    type: String, 
    required: true, 
    enum: ["Ingreso", "Pregrado", "Grado", "Posgrado", "Diplomatura", "Cursos"], 
    trim: true 
    },
  subjects: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Subject', // Referencia al modelo de materias
    },
  ],
}, {
  timestamps: true, // Agrega campos `createdAt` y `updatedAt`
},{ collection: 'carrer' })

export default model('Career', CareerSchema, 'carrer');
```
#### subject.js
Modelo correspondiente a las materias de las carreras dentro del sistema.

```JavaScript
import { Schema, model } from 'mongoose';

const SubjectSchema = new Schema({
    name: {
        type: String, 
        required: true
        },
    carrers: [{ 
        type: String, 
        ref: 'Carrer'
        }],
    professors: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
        }],
    students: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
        }],
    sectiones: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Section'
        }],
}, { collection: 'subject' });

export default model('Subject', SubjectSchema, 'subject');
```

#### section.js
Modelo correspondiente a las secciones y subsecciones que pueden tener las materias.
```JavaScript
import { Schema, Types, model } from 'mongoose';

const sectionSchema = new Schema({
  section_id: { 
    type: Schema.Types.ObjectId, 
    default: () => new Types.ObjectId() 
    },
  title: { 
    type: String, 
    required: true, 
    trim: true 
    },
  type_sec: { 
    type: String, 
    required: true, 
    enum: ["news","pending","info"], 
    trim: true 
    },
  author: { 
    type: String, 
    required: true, 
    trim: true 
    },
  body: { 
    type: String, 
    required: true 
    },
  status: { 
    type: Boolean, 
    default: false 
    },
  date: { 
    type: Date, 
    default: Date.now 
    },
  subsections: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Section' // hace referencia a que los id's que se guardarán aquí deben ser de otra section
    }
  ]
},{ collection: 'section' });

export default model('Section', sectionSchema, 'section');
```

#### user.js
Modelo que define el Schema para los datos de cada usuario.

```JavaScript
import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    name: { 
        type: String, 
        required: true 
        },
    lastname: {
        type: String, 
        required: true
        },
    email: { 
        type: String, 
        required: true, 
        unique: true 
        },
    password: { 
        type: String, 
        required: true 
        },
    date_entry: { 
        type: Date, 
        default: Date.now 
        },
    guest: {
        type: Boolean, 
        required: true
        },
    carrers: {
        type: [String]
        }, // verifica que sea un array con strings
}, { collection: 'user' });

export default model('User', UserSchema, 'user');

```

### Relaciones Entre Modelos
Mediante campos con id's de otros modelos o campos de arrays con id's de otros modelos, éstos se relacionan para poder realizar las diferentes funciones. 

###### Carrer ↔ Subject
Cada carrera tiene un conjunto de materias que se describen en el campo `subjects` en forma de array.
Al igual, cada materia tiene un conjunto de carreras denotadas en el campo `carrers`.

###### User ↔ Carrer
Cada usuario tiene un array destinado a guardar las id's de las carreras a las que está inscripto.

###### Subject ↔ Section
Cada materia puede tener secciones para guardar y mostrar su información. Éstas estan guardadas en el campo `sections`.

###### Subject ↔ User
En las materias se guardan dos campos destinados a usuarios `students` y `professors`, para indicar los usuarios con estos roles.

###### Section ↔ Section
Las secciones tienen un campo `subsections`, en el cuál se puede referenciar a otras secciones para poder estructurar la información.

###### Section ↔ User
Al igual cada sección tiene un campo `author` para indicar quién creó la sección o subsección.

## Créditos

Todas las carreras y materias que se han usado de ejemplo son de la Facultad de Ciencias Exactas, Químicas y Naturales de la Universidad Nacional de Misiones. 
> Para más información: `https://www.fceqyn.unam.edu.ar/`

Este proyecto fue llevado a cabo en el contexto del curso 'Desarrollo BackEnd con JavaScript' de Silicon Misiones.
> Para más información: `https://siliconmisiones.gob.ar/`