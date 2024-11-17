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
- `searchController.js`: Gestión de las peticiones de la sección de búsqueda de materias.
- `userController.js`: Gestión de las peticiones relacionadas a la correspondiente ruta.

`middleware`
Contiene los middlewares para la validación de datos.
- `userRules.js`: Las reglas de validación para la creación de usuarios
- `validate.js`: Recibe el array de errores de las validaciones, si está vacio permite que la petición pase al controlador correspondiente, sino, devuelve el array de errores.

`model`
Define los esquemas y modelos de datos de MongoDB utilizando Mongoose.
- `subject.js`: Modelo para las materias
- `user.js`: Modelo para los usuarios

`other`

`router`
Define las rutas de la API y asigna los controladores correspondientes.
- `adminRoutes.js`: Rutas disponibles para la gestión del sistema en general (`/subject`,`/carrer`)
- `searchRoutes.js`: Rutas para la búsqueda de materias (`/list`,`/byid`,`/bycarrer`)
- `userRoutes.js`: Rutas disponibles para la gestión de usuarios (`/byemail`,`/byid`,`/list`,`/create`,`/update`,`/drop`)

`test`

`app.js`
Archivo que se encarga de dirigir las peticiones al router correspondiente.

##### Archivos Raíz

- `package.json`: Dependencias y scripts del proyecto.
- `README.MD`: Presentación y Manual del Proyecto
- `server.js`: Archivo que monta el servidor e inicializa el `app.js`

#### Flujo General

1. Las solicitudes llegan al servidor y son dirigidas a las rutas definidas en `routes/`.
2. `routes/` dispara los middlewares de validación correspondientes a la ruta y tipo de petición.
3. Si pasan las validaciones las rutas llaman a los controladores correspondientes en `controllers/`.
4. Los controladores interactúan con los modelos en `models/` para manejar la lógica de datos.

## Endpoints y API

## Modelos de Datos

## Funcionalidades Clave

## Problemas Conocidos y Soluciones

## Plan de Desarrollo Futuro

## Créditos