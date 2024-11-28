import { body, param, check } from 'express-validator';

export const rules = {
    show: [
        check('id')
            .isMongoId().withMessage('El ID de la materia no es válido.')
            .not().isEmpty().withMessage('El ID de la materia es obligatorio.')
    ],
    addStudents: [
        param('id')
            .isMongoId().withMessage('El ID de la materia no es válido.')
            .not().isEmpty().withMessage('El ID de la materia es obligatorio.'),
        body('students')
            .isArray().withMessage('El campo "students" debe ser un array.')
            .notEmpty().withMessage('El array de estudiantes no puede estar vacío.')
            .custom((students) => {
                // Validar que cada estudiante tenga un email
                if (students.some(student => !student.email)) {
                    throw new Error('Cada estudiante debe tener un campo "email" válido.');
                }
                return true;
            }),
    ],
    addProfessors: [
        param('id')
            .isMongoId().withMessage('El ID de la materia no es válido.')
            .not().isEmpty().withMessage('El ID de la materia es obligatorio.'),
        body('professors')
            .isArray().withMessage('El campo "professors" debe ser un array.')
            .notEmpty().withMessage('El array de profesores no puede estar vacío.')
            .custom((professors) => {
                // Validar que cada profesor tenga un email
                if (professors.some(professor => !professor.email)) {
                    throw new Error('Cada profesor debe tener un campo "email" válido.');
                }
                return true;
            }),
    ],
    addSections: [
        param('id')
            .isMongoId().withMessage('El ID de la materia no es válido.')
            .not().isEmpty().withMessage('El ID de la materia es obligatorio.'),
        body('sections')
            .isArray().withMessage('El campo "sections" debe ser un array.')
            .notEmpty().withMessage('El array de secciones no puede estar vacío.')
            .custom((sections) => {
                // Validar que los IDs de las secciones sean ObjectId válidos
                if (sections.some(sectionId => !mongoose.Types.ObjectId.isValid(sectionId))) {
                    throw new Error('Todos los IDs de las secciones deben ser válidos ObjectId de MongoDB.');
                }
                return true;
            }),
    ],
    deleteStudents: [
        param('id')
            .isMongoId().withMessage('El ID de la materia no es válido.')
            .not().isEmpty().withMessage('El ID de la materia es obligatorio.'),
        body('students')
            .isArray().withMessage('El campo "students" debe ser un array.')
            .notEmpty().withMessage('El array de estudiantes no puede estar vacío.')
            .custom((students) => {
                // Validar que cada objeto tenga el campo email
                if (students.some(student => !student.email)) {
                    throw new Error('Cada estudiante debe tener un campo "email".');
                }
                return true;
            }),
    ],
    deleteProfessors: [
        param('id')
            .isMongoId().withMessage('El ID de la materia no es válido.')
            .not().isEmpty().withMessage('El ID de la materia es obligatorio.'),
        body('professors')
            .isArray().withMessage('El campo "professors" debe ser un array.')
            .notEmpty().withMessage('El array de profesores no puede estar vacío.')
            .custom((professors) => {
                // Validar que cada objeto tenga el campo email
                if (professors.some(professor => !professor.email)) {
                    throw new Error('Cada profesor debe tener un campo "email".');
                }
                return true;
            }),
    ],
    deleteSections: [
        param('id')
            .isMongoId().withMessage('El ID del subject no es válido.')
            .not().isEmpty().withMessage('El ID del subject es obligatorio.'),
        body('sections')
            .isArray().withMessage('El campo "sections" debe ser un array.')
            .notEmpty().withMessage('El array de secciones no puede estar vacío.')
            .custom((sections) => {
                // Verificar que todos los IDs en el array sean válidos
                if (sections.some(sectionId => !sectionId.match(/^[0-9a-fA-F]{24}$/))) {
                    throw new Error('Todos los IDs de las secciones deben ser válidos.');
                }
                return true;
            }),
    ]
}