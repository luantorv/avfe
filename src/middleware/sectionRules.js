import { param } from 'express-validator';

const rules = {
    byId: [
        param('id')
            .exists().withMessage('El parámetro id es obligatorio.')
            .notEmpty().withMessage('El parámetro id no puede estar vacío.')
            .isMongoId().withMessage('El parámetro id debe ser un ID de MongoDB válido.')
    ],
    create: [
        body('title')
            .exists().withMessage('El campo title es obligatorio.')
            .notEmpty().withMessage('El campo title no puede estar vacío.')
            .isString().withMessage('El campo title debe ser una cadena de texto.'),
        body('type_sec')
            .exists().withMessage('El campo type_sec es obligatorio.')
            .notEmpty().withMessage('El campo type_sec no puede estar vacío.')
            .isString().withMessage('El campo type_sec debe ser una cadena de texto.'),
        body('author')
            .exists().withMessage('El campo author es obligatorio.')
            .notEmpty().withMessage('El campo author no puede estar vacío.')
            .isString().withMessage('El campo author debe ser una cadena de texto.'),
        body('body')
            .exists().withMessage('El campo body es obligatorio.')
            .notEmpty().withMessage('El campo body no puede estar vacío.')
            .isString().withMessage('El campo body debe ser una cadena de texto.'),
        body('subsections')
            .optional()
            .isArray().withMessage('El campo subsections debe ser un array.')
    ],
    update: [
        body('title')
            .optional()
            .isString().withMessage('El campo title debe ser una cadena de texto.'),
        body('type_sec')
            .optional()
            .isString().withMessage('El campo type_sec debe ser una cadena de texto.'),
        body('author')
            .optional()
            .isString().withMessage('El campo author debe ser una cadena de texto.'),
        body('body')
            .optional()
            .isString().withMessage('El campo body debe ser una cadena de texto.'),
        body('subsections')
            .optional()
            .isArray().withMessage('El campo subsections debe ser un array si se proporciona.')
    ],
    delete: [
        param('id')
            .isMongoId().withMessage('El ID proporcionado no es válido.')
    ],
    addSubsection: [
        param('id')
            .isMongoId().withMessage('El ID de la sección no es válido.'),
        body('subsectionId')
            .isMongoId().withMessage('El ID de la subsección no es válido.')
            .not().isEmpty().withMessage('El ID de la subsección es obligatorio.')
    ],
    deleteSubsection: [
        param('id')
            .isMongoId().withMessage('El ID de la sección no es válido.'),
        body('subsectionId')
            .isMongoId().withMessage('El ID de la subsección no es válido.')
            .not().isEmpty().withMessage('El ID de la subsección es obligatorio.')
    ]
}

export default { rules };