# AVFE: Aula Virtual - Facultad de Exactas

##### Este proyecto consiste en un sistema BackEnd para un posible aula virtual; en este caso, se usó de ejemplo algunas carreras y materias de la FCEQyN de la UNaM.

#### Introducción

Considerando la dificultad que implica el desarrollo de un aula virtual, este proyecto se vió simplificado para cumplir con los plazos de entrega, y en un posible futuro poder terminarlo.
Esta simplificación consistió principalmente en no abarcar todas las carreras de la FCEQyN, y de las que si se incluyeron, no abarcar todas sus materias.

#### Arquitectura

Para el desarrollo del proyecto se ha utlizado el FrameWork "Express" basado en Node.js, utilizando también "MongoDB" como base de datos, conectandose ambos mediante el paquete "mongoose".
De igual forma se han utlizado otros paquetes como express-validator para el desarrollo de los middlewares a utilizar, y jsonwebtoken para gestionar los tokens de los usuarios.

#### Guía de Instalación

###### Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes:

    Node.js (versión 16 o superior)
    MongoDB (versión 5 o superior)
    Git (para clonar el repositorio)
    Un editor de texto, como Visual Studio Code

###### Clonar el repositorio

1. Abre tu terminal y navega a la carpeta donde deseas clonar el proyecto.
2. Ejecuta el siguiente comando:
```bash
git clone https://github.com/tu-usuario/aula-virtual.git
```
3. Ingresa al directorio del proyecto:
```bash
cd avfe
```

###### Instalación de Dependencias

1. Asegurate de estar en la carpeta raíz del proyecto.
2. Ejecuta el siguiente comando para instalar las dependencias necesarias:
```bash
npm install
```

###### Configuración del Entorno

>[!NOTE]
> El proyecto está hecho para que este paso sea opcional, solo considerar que si no se realiza este paso el puerto por defecto será el 8080
