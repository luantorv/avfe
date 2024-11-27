import { body } from 'express-validator';

const rules = {
    createCareers: [
        body()
            .isArray().withMessage('El body debe ser un array de carreras.'),
        body('*.carrer_id')
            .exists().withMessage('El campo carrer_id es obligatorio.')
            .isString().withMessage('El campo carrer_id debe ser un string.')
            .notEmpty().withMessage('El campo carrer_id no puede estar vacío.'),
        body('*.name')
            .exists().withMessage('El campo name es obligatorio.')
            .isString().withMessage('El campo name debe ser un string.')
            .notEmpty().withMessage('El campo name no puede estar vacío.'),
        body('*.type_c')
            .exists().withMessage('El campo type_c es obligatorio.')
            .isString().withMessage('El campo type_c debe ser un string.')
            .notEmpty().withMessage('El campo type_c no puede estar vacío.'),
        body('*.subjects')
            .exists().withMessage('El campo subjects es obligatorio.')
            .isArray().withMessage('El campo subjects debe ser un array.'),
    ],
    updateCareers: [
        body()
            .isArray().withMessage('El body debe ser un array de carreras.'),
        body('*.carrer_id')
            .exists().withMessage('El campo carrer_id es obligatorio.')
            .isString().withMessage('El campo carrer_id debe ser un string.')
            .notEmpty().withMessage('El campo carrer_id no puede estar vacío.'),
        body('*.name')
            .optional()
            .isString().withMessage('El campo name debe ser un string.'),
        body('*.type_c')
            .optional()
            .isString().withMessage('El campo type_c debe ser un string.'),
        body('*.subjects')
            .optional()
            .isArray().withMessage('El campo subjects debe ser un array.'),
    ],
    deleteCareers: [
        body('carrer_ids')
            .exists().withMessage('El campo carrer_ids es obligatorio.')
            .isArray({ min: 1 }).withMessage('El campo carrer_ids debe ser un array no vacío.'),
        body('carrer_ids.*')
            .isString().withMessage('Cada carrer_id debe ser un string.')
            .notEmpty().withMessage('Cada carrer_id no puede estar vacío.')
    ],
    createSubjects: [
        body()
            .isArray({ min: 1 }).withMessage('El body debe ser un array con al menos una materia.'),
        body('*.name')
            .exists().withMessage('El campo name es obligatorio.')
            .isString().withMessage('El campo name debe ser un string.')
            .notEmpty().withMessage('El campo name no puede estar vacío.'),
        body('*.carrers')
            .optional()
            .isArray().withMessage('El campo carrers debe ser un array.'),
        body('*.professors')
            .optional()
            .isArray().withMessage('El campo professors debe ser un array.'),
        body('*.students')
            .optional()
            .isArray().withMessage('El campo students debe ser un array.'),
        body('*.sections')
            .optional()
            .isArray().withMessage('El campo sections debe ser un array.'),
    ],
    updateSubjects: [
        body()
            .isArray({ min: 1 }).withMessage('El body debe ser un array con al menos una materia para actualizar.'),
        body('*.id')
            .exists().withMessage('El campo _id es obligatorio.')
            .isMongoId().withMessage('El campo _id debe ser un ID de Mongo válido.'),
        body('*.name')
            .optional()
            .isString().withMessage('El campo name debe ser un string.')
            .notEmpty().withMessage('El campo name no puede estar vacío.'),
        body('*.carrers')
            .optional()
            .isArray().withMessage('El campo carrers debe ser un array.'),
        body('*.professors')
            .optional()
            .isArray().withMessage('El campo professors debe ser un array.'),
        body('*.students')
            .optional()
            .isArray().withMessage('El campo students debe ser un array.'),
        body('*.sections')
            .optional()
            .isArray().withMessage('El campo sections debe ser un array.'),
    ],
    deleteSubjects: [
        body('subject_ids')
            .exists().withMessage('El campo subject_ids es obligatorio.')
            .isArray({ min: 1 }).withMessage('El campo subject_ids debe ser un array con al menos un ID.'),
        body('subject_ids.*')
            .isMongoId().withMessage('Cada elemento de subject_ids debe ser un ID de Mongo válido.'),
    ]
};

export default { rules };