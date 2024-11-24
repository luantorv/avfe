import Subject from './../model/subject.js'
import Section from './../model/section.js'
import User from './../model/user.js'

export const showSubject = async (req, res) => {
  try {
    const { id } = req.params; // Obtenemos el ObjectId desde los parámetros de la ruta

    // Validación básica del parámetro
    if (!id) {
      return res.status(400).json({ message: 'Se requiere el ID de la materia.' });
    }

    // Buscar la materia por su ObjectId
    const subject = await Subject.findById(id);

    if (!subject) {
      return res.status(404).json({ message: 'Materia no encontrada.' });
    }

    // Buscar las secciones relacionadas basándonos en los IDs guardados en `sectiones`
    const sections = await Section.find({ _id: { $in: subject.sectiones } });

    // Combinar los datos de la materia con los detalles de las secciones
    const result = {
      ...subject.toObject(), // Convertimos el documento de MongoDB a un objeto JS
      sectiones: sections,  // Sustituimos los IDs de las secciones por los objetos completos
    };

    res.status(200).json(result); // Devolvemos la materia con las secciones incluidas
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addStudents = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el ID de la materia desde los parámetros de la ruta
        const { students } = req.body; // Obtener el array de estudiantes desde el body

        // Validaciones básicas
        if (!id) {
            return res.status(400).json({ message: 'Se requiere el ID de la materia.' });
        }

        if (!students || !Array.isArray(students) || students.length === 0) {
            return res.status(400).json({ message: 'Se requiere un array de estudiantes con el campo email.' });
        }

        // Extraer los emails del body
        const emails = students.map(student => student.email).filter(Boolean);

        if (emails.length === 0) {
            return res.status(400).json({ message: 'El array de estudiantes debe contener objetos con el campo email.' });
        }

        // Buscar los usuarios correspondientes por email
        const users = await User.find({ email: { $in: emails } });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios con los emails proporcionados.' });
        }

        // Extraer los ObjectId de los usuarios encontrados
        const userIds = users.map(user => user._id);

        // Actualizar el campo `students` de la materia, evitando duplicados
        const updatedSubject = await Subject.findByIdAndUpdate(
            id,
            { $addToSet: { students: { $each: userIds } } }, // $addToSet asegura que no haya duplicados
            { new: true } // Devuelve el documento actualizado
        );

        if (!updatedSubject) {
            return res.status(404).json({ message: 'Materia no encontrada.' });
        }

        const notFoundEmails = emails.filter(email => !users.some(user => user.email === email));

        res.status(200).json({
            message: 'Estudiantes agregados exitosamente.',
            subject: updatedSubject,
            notFoundEmails, // Emails que no se encontraron en la base de datos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
/* 
- el id que viene como parámetro en la ruta, que es el id de la subject
- se espera que en el body lluegue algo con la siguiente estructura
{
    "students": [
        { "email": "student1@example.com" },
        { "email": "student2@example.com" }
    ]
}
esos email's que aparecen serán los que se van a buscar y agregar.
Si ningun usuario es encontrado en la base de datos, la materia no se 
actuliza
Si algunos si y otros no, solo se van a agregar los que si se encontraron
y se notificará cuales no fueron encontrados
Si un usuario es encontrado, pero ya era un alumno no se actualiza, para 
así evitar duplicaciones
*/

export const addProfessors = async (req, res) => {
    try {
        const { id } = req.params; // ID de la materia desde los parámetros de la ruta
        const { professors } = req.body; // Array de profesores desde el body

        // Validaciones básicas
        if (!id) {
            return res.status(400).json({ message: 'Se requiere el ID de la materia.' });
        }

        if (!professors || !Array.isArray(professors) || professors.length === 0) {
            return res.status(400).json({ message: 'Se requiere un array de profesores con el campo email.' });
        }

        // Extraer los emails de los profesores
        const emails = professors.map(professor => professor.email).filter(Boolean);

        if (emails.length === 0) {
            return res.status(400).json({ message: 'El array de profesores debe contener objetos con el campo email.' });
        }

        // Buscar los usuarios correspondientes por email
        const users = await User.find({ email: { $in: emails } });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No se encontraron profesores con los emails proporcionados.' });
        }

        // Extraer los ObjectId de los usuarios encontrados
        const userIds = users.map(user => user._id);

        // Actualizar el campo `professors` de la materia, evitando duplicados
        const updatedSubject = await Subject.findByIdAndUpdate(
            id,
            { $addToSet: { professors: { $each: userIds } } }, // $addToSet asegura que no haya duplicados
            { new: true } // Devuelve el documento actualizado
        ).populate('professors'); // Usamos populate para incluir detalles de los profesores

        if (!updatedSubject) {
            return res.status(404).json({ message: 'Materia no encontrada.' });
        }

        const notFoundEmails = emails.filter(email => !users.some(user => user.email === email));

        // Responder con la materia actualizada (con populate)
        res.status(200).json({
            message: 'Profesores agregados exitosamente.',
            subject: updatedSubject,
            notFoundEmails, // Emails que no se encontraron en la base de datos
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
/*
Espera que en el body llegue algo con la siguiente estructura:
{
    "professors": [
        { "email": "professor1@example.com" },
        { "email": "professor2@example.com" }
    ]
}
*/
export const addSections = async (req, res) => {
    try {
        const { id } = req.params; // ID de la materia desde los parámetros de la ruta
        const { sections } = req.body; // Array de secciones desde el body

        // Validaciones básicas
        if (!id) {
            return res.status(400).json({ message: 'Se requiere el ID de la materia.' });
        }

        if (!sections || !Array.isArray(sections) || sections.length === 0) {
            return res.status(400).json({ message: 'Se requiere un array de secciones con los IDs de las secciones a agregar.' });
        }

        // Buscar las secciones por sus IDs
        const validSections = await Section.find({ _id: { $in: sections } });

        if (validSections.length === 0) {
            return res.status(404).json({ message: 'No se encontraron secciones con los IDs proporcionados.' });
        }

        // IDs de las secciones válidas
        const validSectionIds = validSections.map(section => section._id);

        // IDs de las secciones no encontradas
        const notFoundSections = sections.filter(sectionId => 
            !validSectionIds.some(validId => validId.equals(sectionId))
        );

        // Actualizar el campo `sectiones` de la materia, evitando duplicados
        const updatedSubject = await Subject.findByIdAndUpdate(
            id,
            { $addToSet: { sectiones: { $each: validSectionIds } } }, // $addToSet asegura que no haya duplicados
            { new: true } // Devuelve el documento actualizado
        ).populate('sectiones'); // Usamos populate para incluir detalles de las secciones

        if (!updatedSubject) {
            return res.status(404).json({ message: 'Materia no encontrada.' });
        }

        // Responder con la materia actualizada y las secciones no encontradas
        res.status(200).json({
            message: 'Secciones agregadas exitosamente.',
            subject: updatedSubject,
            notAddedSections: notFoundSections.length > 0 
                ? { count: notFoundSections.length, ids: notFoundSections } 
                : null,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
/*
Espera que llegue algo con la siguiente estructura:
{
    "sections": [
        "64b6e97f1f9c8800012a5bef",
        "64b6e97f1f9c8800012a5bf0",
        "64b6e97f1f9c8800012a5bf1"
    ]
}
*/

export const deleteStudents = async (req, res) => {
    try {
        const { id } = req.params; // ID de la materia desde los parámetros de la ruta
        const { students } = req.body; // Array de estudiantes desde el body

        // Validaciones básicas
        if (!id) {
            return res.status(400).json({ message: 'Se requiere el ID de la materia.' });
        }

        if (!students || !Array.isArray(students) || students.length === 0) {
            return res.status(400).json({ message: 'Se requiere un array de estudiantes con el campo email.' });
        }

        // Extraer los emails de los estudiantes
        const emails = students.map(student => student.email).filter(Boolean);

        if (emails.length === 0) {
            return res.status(400).json({ message: 'El array de estudiantes debe contener objetos con el campo email.' });
        }

        // Buscar los usuarios correspondientes por email
        const users = await User.find({ email: { $in: emails } });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No se encontraron estudiantes con los emails proporcionados.' });
        }

        // Extraer los ObjectId de los usuarios encontrados
        const userIds = users.map(user => user._id);

        // Actualizar el campo `students` de la materia eliminando los usuarios encontrados
        const updatedSubject = await Subject.findByIdAndUpdate(
            id,
            { $pull: { students: { $in: userIds } } }, // $pull elimina los IDs correspondientes
            { new: true } // Devuelve el documento actualizado
        ).populate('students'); // Usamos populate para incluir detalles de los estudiantes restantes

        if (!updatedSubject) {
            return res.status(404).json({ message: 'Materia no encontrada.' });
        }

        // Responder con la materia actualizada
        res.status(200).json({
            message: 'Estudiantes eliminados exitosamente.',
            subject: updatedSubject,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProfessors = async (req, res) => {
    try {
        const { id } = req.params; // ID de la materia desde los parámetros de la ruta
        const { professors } = req.body; // Array de profesores desde el body

        // Validaciones básicas
        if (!id) {
            return res.status(400).json({ message: 'Se requiere el ID de la materia.' });
        }

        if (!professors || !Array.isArray(professors) || professors.length === 0) {
            return res.status(400).json({ message: 'Se requiere un array de profesores con el campo email.' });
        }

        // Extraer los emails de los profesores
        const emails = professors.map(professor => professor.email).filter(Boolean);

        if (emails.length === 0) {
            return res.status(400).json({ message: 'El array de profesores debe contener objetos con el campo email.' });
        }

        // Buscar los usuarios correspondientes por email
        const users = await User.find({ email: { $in: emails } });

        if (users.length === 0) {
            return res.status(404).json({ message: 'No se encontraron profesores con los emails proporcionados.' });
        }

        // Extraer los ObjectId de los usuarios encontrados
        const userIds = users.map(user => user._id);

        // Actualizar el campo `professors` de la materia eliminando los usuarios encontrados
        const updatedSubject = await Subject.findByIdAndUpdate(
            id,
            { $pull: { professors: { $in: userIds } } }, // $pull elimina los IDs correspondientes
            { new: true } // Devuelve el documento actualizado
        ).populate('professors'); // Usamos populate para incluir detalles de los profesores restantes

        if (!updatedSubject) {
            return res.status(404).json({ message: 'Materia no encontrada.' });
        }

        // Responder con la materia actualizada
        res.status(200).json({
            message: 'Profesores eliminados exitosamente.',
            subject: updatedSubject,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteSections = async (req, res) => {
    try {
        const { id } = req.params; // ID del subject desde los parámetros de la ruta
        const { sections } = req.body; // Array con los IDs de las secciones a eliminar

        // Validaciones básicas
        if (!id) {
            return res.status(400).json({ message: 'Se requiere el ID del subject.' });
        }

        if (!sections || !Array.isArray(sections) || sections.length === 0) {
            return res.status(400).json({ message: 'Se requiere un array con los IDs de las secciones a eliminar.' });
        }

        // Buscar las secciones existentes en la base de datos
        const existingSections = await Section.find({ _id: { $in: sections } });

        // Identificar los IDs no válidos o inexistentes en la base de datos
        const invalidSections = sections.filter(
            sectionId => !existingSections.some(section => section._id.toString() === sectionId)
        );

        // Obtener el subject y verificar las relaciones actuales
        const subject = await Subject.findById(id);

        if (!subject) {
            return res.status(404).json({ message: 'Subject no encontrado.' });
        }

        // Identificar las secciones que no están asociadas al subject
        const unrelatedSections = existingSections.filter(
            section => !subject.sectiones.includes(section._id.toString())
        );

        // Filtrar las secciones válidas y asociadas
        const validSections = existingSections.filter(
            section => subject.sectiones.includes(section._id.toString())
        );

        if (validSections.length === 0 && unrelatedSections.length === 0) {
            return res.status(400).json({
                message: 'No se encontraron secciones válidas para eliminar.',
                invalidSections,
                unrelatedSections,
            });
        }

        // **Eliminar subsecciones recursivamente**
        const deleteSubsections = async (sectionId) => {
            const section = await Section.findById(sectionId);
            if (section && section.subsections.length > 0) {
                for (const subId of section.subsections) {
                    await deleteSubsections(subId); // Llamada recursiva para eliminar subsecciones
                }
            }
            await Section.findByIdAndDelete(sectionId); // Eliminar la sección actual
        };

        // Eliminar todas las secciones válidas y sus subsecciones
        for (const section of validSections) {
            await deleteSubsections(section._id);
        }

        // Eliminar las referencias de las secciones válidas en el subject
        const updatedSubject = await Subject.findByIdAndUpdate(
            id,
            { $pull: { sectiones: { $in: validSections.map(section => section._id) } } },
            { new: true }
        ).populate('sectiones'); // Popula las secciones restantes

        // Responder con información detallada
        res.status(200).json({
            message: 'Operación completada.',
            removedSections: validSections,
            invalidSections,
            unrelatedSections,
            updatedSubject,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
/*
Las consultas se manejan igual que addSections, pero las respuestas las maneja de
forma diferente.
En las respuestas se incluyen las siguientes 3 partes para así contemplar todos
los posibles escenarios:

- removedSections: Secciones eliminadas correctamente
- invalidSections: ID's no válidos o inexistentes
- unrelatedSection: Secciones no relacionadas por la Subject especificada

TENER MUCHO CUIDADO CON ESTA FUNCIÓN
ya que al borrar una sección, tembién borra todas sus subsectiones, que aunque
mantiene la intregridad de la base de datos, la vuelve muy peligrosa.
*/