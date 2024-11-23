import Career from './../model/carrer.js';
import Subject from './../model/subject.js';

export const createCareers = async (req, res) => {
    try {
        const careers = req.body; // Recibimos un array de carreras en el body

        // Validación básica
        if (!careers || !Array.isArray(careers) || careers.length === 0) {
            return res.status(400).json({ message: 'Se requiere un array de carreras para procesar.' });
        }

        const results = {
            created: [], // Carreras creadas exitosamente
            existing: [], // Carreras que ya existían
            invalid: []   // Carreras con datos inválidos
        };

        for (const careerData of careers) {
            try {
                // Verificar si la carrera ya existe por su `career_id`
                const existingCareer = await Career.findOne({ career_id: careerData.career_id });
                
                if (existingCareer) {
                    results.existing.push({
                        career_id: careerData.career_id,
                        reason: 'Carrera ya existente.'
                    });
                    continue;
                }

                // Crear una nueva carrera
                const newCareer = new Career(careerData);
                await newCareer.save();
                results.created.push(newCareer);

            } catch (error) {
                // Manejar errores individuales, como validaciones fallidas
                results.invalid.push({
                    career: careerData,
                    error: error.message
                });
            }
        }

        // Responder con el resumen de la operación
        res.status(200).json({
            message: 'Operación completada.',
            results
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

/*
Esta función espera una consulta que contenga en el body un array de objetos,
siendo estos los que se van a crear.
Ejemplo del body de la consulta:
[
    {
        "carrer_id":"IS",
        "name": "Ingeniería de Software",
        "type_c": "Grado",
        "subjects": []
    },
    {
        "carrer_id","DGP",
        "name": "Diplomado en Gestión de Proyectos",
        "type_c": "Diplomatura",
        "subjects": []
    }
]

Las respuestas tienen dos apartados: 
- message: si se crea al menos una carrera va a decir "Operación completada" o va
a mostrar el mensaje del error que haya sucedido
- results: aquí se clasifican las materias enviadas en tres secciones
    - created: carreras creadas exitosamente
    - existing: carreras que ya existían
    - invalid: carreras con datos inválidos (en cada carrera se mostrará el mensaje
    de error que ha ocurrido durante la creación de la carrera)

Quedando las respuestas con la siguiente estructura:
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
Ejemplo de la una respuesta mixta:
{
    "message": "Operación completada.",
    "results": {
        "created": [
            {
                "career_id": "IS",
                "name": "Ingeniería de Sistemas",
                "type_c": "Grado",
                "subjects": [],
                "createdAt": "2024-11-21T14:55:32.123Z",
                "updatedAt": "2024-11-21T14:55:32.123Z"
            },
            {
                "career_id": "DDS",
                "name": "Diplomado en Data Science",
                "type_c": "Diplomatura",
                "subjects": [],
                "createdAt": "2024-11-21T14:55:32.123Z",
                "updatedAt": "2024-11-21T14:55:32.123Z"
            }
        ],
        "existing": [],
        "invalid": [
            {
                "career": {
                    "career_id": "C003",
                    "name": "",
                    "type_c": "Posgrado",
                    "subjects": []
                },
                "error": "Career validation failed: name: Path `name` is required."
            }
        ]
    }
}
*/

export const updateCareers = async (req, res) => {
    try {
        const careersToUpdate = req.body; // Recibe un array de carreras en el body

        // Validación básica
        if (!careersToUpdate || !Array.isArray(careersToUpdate) || careersToUpdate.length === 0) {
            return res.status(400).json({ message: 'Se requiere un array de carreras para actualizar.' });
        }

        const results = {
            updated: [], // Carreras que se actualizaron exitosamente
            notFound: [], // Carreras cuyo `carrer_id` no se encontró
            invalid: []   // Carreras que fallaron por errores en el proceso
        };

        for (const careerData of careersToUpdate) {
            const { career_id, ...fieldsToUpdate } = careerData;

            // Verificar si el `carrer_id` fue proporcionado
            if (!career_id) {
                results.invalid.push({
                    career: careerData,
                    error: 'Se requiere el campo `career_id` para identificar la carrera.'
                });
                continue;
            }

            try {
                // Intentar actualizar la carrera
                const updatedCareer = await Career.findOneAndUpdate(
                    { career_id }, // Identificar la carrera por su `career_id`
                    { $set: fieldsToUpdate }, // Actualizar solo los campos proporcionados
                    { new: true, runValidators: true } // Devolver el documento actualizado y validar
                );

                if (!updatedCareer) {
                    // Si no se encuentra la carrera, agregar a `notFound`
                    results.notFound.push({
                        career_id,
                        reason: 'Carrera no encontrada.'
                    });
                    continue;
                }

                // Agregar la carrera actualizada a los resultados
                results.updated.push(updatedCareer);
            } catch (error) {
                // Manejar errores individuales
                results.invalid.push({
                    career: careerData,
                    error: error.message
                });
            }
        }

        // Responder con el resumen de la operación
        res.status(200).json({
            message: 'Operación completada.',
            results
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
/*
Esta funcion espera en el body de la consulta un array de objetos, los cuales
si o si tienen que contener su carrer_id (para poder identificarlos), y el resto
de los campos serán los campos a actualizar de esa carrera.

Ejemplo del body de la consulta:
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

Las resupuestas tienen dos campos:
- message: devolverá "Operación completada" en caso de que al menos una carrera se
actualice, en caso contrario devolverá el mensaje del error
- results: está dividido en tres campos:
    - updated: contiene todas las carreras que se actualizaron exitosamente
    - notFound: contiene todas las carreras cuyo `carrer_id` no se encontró
    - invalid: contiene todas las carreras que fallaron por errores en el proceso

Ejemplo de respuesta mixta:
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
*/

export const deleteCareers = async (req, res) => {
    try {
        const { career_ids } = req.body; // Array de career_id en el body

        // Validación básica
        if (!career_ids || !Array.isArray(career_ids) || career_ids.length === 0) {
            return res.status(400).json({ message: 'Se requiere un array de `career_id` para eliminar.' });
        }

        const results = {
            deleted: [], // Carreras eliminadas exitosamente
            notFound: [], // Carreras cuyo `career_id` no se encontró
            errors: [] // Errores ocurridos durante la eliminación
        };

        for (const career_id of career_ids) {
            try {
                // Intentar eliminar la carrera por `career_id`
                const deletedCareer = await Career.findOneAndDelete({ career_id });

                if (!deletedCareer) {
                    // Si no se encuentra la carrera, agregar a `notFound`
                    results.notFound.push({
                        career_id,
                        reason: 'Carrera no encontrada.'
                    });
                    continue;
                }

                // Agregar la carrera eliminada a los resultados
                results.deleted.push(deletedCareer);
            } catch (error) {
                // Si ocurre un error, agregarlo a la lista de errores
                results.errors.push({
                    career_id,
                    reason: error.message
                });
            }
        }

        // Responder con el resumen de la operación
        res.status(200).json({
            message: 'Operación completada.',
            results
        });
    } catch (error) {
        // Si ocurre un error global en la función, responder con 500
        res.status(500).json({ error: error.message });
    }
};
/*
Esta funcion espera en el body de la consulta un array de carrer_id's, los cuales
serán los que se busca eliminar.

Ejemplo del body de la consulta:
{
    "career_ids": ["carrera01", "carrera02", "carrera_inexistente", "carrera_error"]
}

Las respuestas cuentan con dos partes:

- message: devolverá "Operación completada" en caso de que al menos una carrera se
 elimina, en caso contrario devolverá el mensaje del error
- results: está dividido en tres campos:
    - deleted: contiene todas las carreras que se eliminaron exitosamente
    - notFound: contiene todas las carreras cuyo `career_id` no se encontró
    - errors: contiene todas las carreras que fallaron por errores en el proceso,
    si una carrera no se encuentra o falla en el proceso, se agregará un objeto
    con el `career_id` y el motivo del error.

Ejemplo de una respuesta mixta:
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
*/

export const createSubjects = async (req, res) => {
    try {
        const subjects = req.body; // Array de materias a crear

        // Validación básica
        if (!Array.isArray(subjects) || subjects.length === 0) {
            return res.status(400).json({ message: 'Debe proporcionar un array de materias para crear.' });
        }

        const results = {
            created: [], // Materias creadas exitosamente
            failed: [] // Materias que no se pudieron crear (duplicadas o con formato inválido)
        };

        for (const subjectData of subjects) {
            try {
                // Validar existencia de la materia basada en su nombre
                const existingSubject = await Subject.findOne({ name: subjectData.name });

                if (existingSubject) {
                    // Si ya existe, añadirla a `failed`
                    results.failed.push({
                        subject: subjectData.name,
                        reason: 'La materia ya existe.'
                    });
                    continue;
                }

                // Crear la nueva materia
                const newSubject = new Subject(subjectData);
                const savedSubject = await newSubject.save();

                // Añadir a la lista de materias creadas
                results.created.push(savedSubject);
            } catch (error) {
                // Si hay un error, añadirlo a `failed`
                results.failed.push({
                    subject: subjectData.name || 'Sin nombre',
                    reason: error.message
                });
            }
        }

        // Responder con el resumen de la operación
        res.status(200).json({
            message: 'Proceso de creación completado.',
            results
        });
    } catch (error) {
        // Si ocurre un error global en la función, responder con 500
        res.status(500).json({ error: error.message });
    }
};
/*
Esta funcion espera en el body de la consulta un array de objetos, los
cuales serán los que se creen.

Ejemplo del body de la consulta:
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

La respuesta tiene dos partes:
- message: devuelve "Proceso de creación completado" en caso de que al menos una
materia fue creada, sino devolverá el error.message
- results: contiene dos arrays de objetos:
    - created: contiene todas las materias que fueron creadas exitosamente.
    - failed: contiene todas las materias que fallaron por errores en el proceso,
    si una materia no se encuentra o falla en el proceso, se agregará un objeto
    con el nombre de la materia y el motivo del error.

Ejemplo de una respuesta mixta:
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
*/

export const updateSubjects = async (req, res) => {
    try {
        const subjectsToUpdate = req.body; // Array de materias a actualizar

        // Validación básica
        if (!Array.isArray(subjectsToUpdate) || subjectsToUpdate.length === 0) {
            return res.status(400).json({ message: 'Debe proporcionar un array de materias para actualizar.' });
        }

        const results = {
            updated: [], // Materias actualizadas exitosamente
            failed: [] // Materias que no se pudieron actualizar (no encontradas o error)
        };

        for (const subjectData of subjectsToUpdate) {
            const { _id, ...fieldsToUpdate } = subjectData; // Extraer el ID y los campos a actualizar

            // Validación: asegurar que el ID esté presente
            if (!_id) {
                results.failed.push({
                    subject: subjectData.name || 'Sin nombre',
                    reason: 'Falta el campo _id para identificar la materia.'
                });
                continue;
            }

            try {
                // Intentar actualizar la materia
                const updatedSubject = await Subject.findByIdAndUpdate(
                    _id,
                    { $set: fieldsToUpdate }, // Solo actualizar los campos proporcionados
                    { new: true, runValidators: true } // Devuelve el documento actualizado y aplica validaciones
                );

                if (!updatedSubject) {
                    // Si no se encuentra la materia, añadirla a `failed`
                    results.failed.push({
                        subject: _id,
                        reason: 'Materia no encontrada.'
                    });
                    continue;
                }

                // Si la actualización fue exitosa, añadirla a `updated`
                results.updated.push(updatedSubject);
            } catch (error) {
                // Si ocurre un error, añadirlo a `failed`
                results.failed.push({
                    subject: _id,
                    reason: error.message
                });
            }
        }

        // Responder con el resumen de la operación
        res.status(200).json({
            message: 'Proceso de actualización completado.',
            results
        });
    } catch (error) {
        // Responder con el error global de la función
        res.status(500).json({ error: error.message });
    }
};
/*
La función espera en el body de la consulta un array de objetos, los cuales tienen
que contener obligatoriamente el _id (para poder identificarlas) y luego los campos
a actualizar.

Ejemplo del body de la consulta:
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

La respuesta tiene dos partes:
- message: devuelve "Proceso de actualización completado" en caso de que al menos una
materia fue actualizada, sino devolverá el error.message
- results: contiene dos arrays de objetos:
    - updated: contiene todas las materias que fueron actualizadas exitosamente.
    - failed: contiene todas las materias que fallaron por errores en el proceso,
    si una materia no se encuentra o falla en el proceso, se agregará un objeto

Ejemplo de una respuesta mixta:
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
*/

export const deleteSubjects = async (req, res) => {
    try {
        const { subject_ids } = req.body; // Array de IDs de materias a eliminar

        // Validación básica
        if (!Array.isArray(subject_ids) || subject_ids.length === 0) {
            return res.status(400).json({ message: 'Debe proporcionar un array de subject_ids para eliminar.' });
        }

        const results = {
            deleted: [], // Materias eliminadas exitosamente
            notFound: [] // Materias que no se encontraron
        };

        for (const subject_id of subject_ids) {
            try {
                // Intentar eliminar la materia
                const deletedSubject = await Subject.findByIdAndDelete(subject_id);

                if (!deletedSubject) {
                    // Si no se encuentra la materia, añadirla a `notFound`
                    results.notFound.push({
                        subject_id,
                        reason: 'Materia no encontrada.'
                    });
                    continue;
                }

                // Si la eliminación fue exitosa, añadirla a `deleted`
                results.deleted.push(deletedSubject);
            } catch (error) {
                // Si ocurre un error al eliminar, añadirlo a `notFound`
                results.notFound.push({
                    subject_id,
                    reason: error.message
                });
            }
        }

        // Responder con el resumen de la operación
        res.status(200).json({
            message: 'Proceso de eliminación completado.',
            results
        });
    } catch (error) {
        // Responder con el error global de la función
        res.status(500).json({ error: error.message });
    }
};
/*
Esta funcion espera un objeto con los subject_id, las cuales serán las que se eliminen

Ejemplo del body de la consulta:
{
    "subject_ids": [
        "64b7dcf2f2a4d9c2e0e7c940",
        "64b7dcf2f2a4d9c2e0e7c941"
    ]
}

La respuesta tiene dos partes:
    - message: devuelve "Proceso de eliminación completado" en caso de que al menos una
    materia fue eliminada, sino devolverá el error.message
    - results: contiene dos arrays de objetos:
        - deleted: contiene todas las materias que fueron eliminadas exitosamente.
        - notFound: contiene todas las materias que no se encontraron
    
Ejemplo de una respuesta mixta:
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
*/