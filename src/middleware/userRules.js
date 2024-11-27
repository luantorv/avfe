import { body } from 'express-validator';

const rules = {
    create: [
        body('users')
            .isArray().withMessage('El campo "users" debe ser un array.')
            .notEmpty().withMessage('Debe proporcionar al menos un usuario en el array.'),
        body('users.*.name')
            .notEmpty().withMessage('El campo "name" es obligatorio.')
            .isString().withMessage('El campo "name" debe ser un string.'),
        body('users.*.lastname')
            .notEmpty().withMessage('El campo "lastname" es obligatorio.')
            .isString().withMessage('El campo "lastname" debe ser un string.'),
        body('users.*.email')
            .notEmpty().withMessage('El campo "email" es obligatorio.')
            .isEmail().withMessage('El campo "email" debe ser una dirección de correo válida.'),
        body('users.*.password')
            .notEmpty().withMessage('El campo "password" es obligatorio.')
            .isString().withMessage('El campo "password" debe ser un string.'),
        body('users.*.guest')
            .isBoolean().withMessage('El campo "guest" debe ser un valor booleano.')
            .not().isEmpty().withMessage('El campo "guest" es obligatorio.'),
        body('users.*.carrers')
            .notEmpty().withMessage('El campo "carrers" es obligatorio.')
            .isArray().withMessage('El campo "carrers" debe ser un array.')
            .custom(carrers => {
                // Verifica que cada carrera en el array sea un string no vacío
                if (carrers.some(career => typeof career !== 'string' || career.trim() === '')) {
                    throw new Error('Cada carrera debe ser una cadena no vacía.');
                }
                return true;
            }),
    ],
    profile: [
        param('email')
            .notEmpty().withMessage('El campo "email" es obligatorio.')
            .isEmail().withMessage('El campo "email" debe ser una dirección de correo válida.')
    ],
    byId: [
        query('_id')
            .notEmpty().withMessage('El parámetro "_id" es obligatorio.')
            .isMongoId().withMessage('El parámetro "_id" debe ser un ID de Mongo válido.')
    ],
    byEmail: [
        query('email')
            .notEmpty().withMessage('El parámetro "email" es obligatorio.')
            .isEmail().withMessage('El parámetro "email" debe ser una dirección de correo electrónico válida.')
    ],
    byValue: [
        query('name')
            .optional()
            .isString().withMessage('El parámetro "name" debe ser una cadena de texto.'),
        query('lastname')
            .optional()
            .isString().withMessage('El parámetro "lastname" debe ser una cadena de texto.'),
        query('email')
            .optional()
            .isEmail().withMessage('El parámetro "email" debe ser una dirección de correo electrónico válida.'),
        query('guest')
            .optional()
            .isBoolean().withMessage('El parámetro "guest" debe ser un valor booleano.'),
    ],
    update: [
        param('id')
            .isMongoId().withMessage('El parámetro "id" debe ser un ID de MongoDB válido.'),
        body('name')
            .optional()
            .isString().withMessage('El campo "name" debe ser una cadena de texto.'),
        body('lastname')
            .optional()
            .isString().withMessage('El campo "lastname" debe ser una cadena de texto.'),
        body('email')
            .optional()
            .isEmail().withMessage('El campo "email" debe ser un correo electrónico válido.'),
        body('password')
            .optional()
            .isString().withMessage('El campo "password" debe ser una cadena de texto.'),
        body('guest')
            .optional()
            .isBoolean().withMessage('El campo "guest" debe ser un valor booleano.'),
        body('carrers')
            .optional()
            .isArray().withMessage('El campo "carrers" debe ser un array.')
            .bail()
            .custom(carrers => carrers.every(carrer => typeof carrer === 'string'))
            .withMessage('Cada carrera en "carrers" debe ser una cadena de texto.'),
    ],
    delete: [
        body()
            .isArray().withMessage('Se debe proporcionar un array de usuarios.')
            .bail()
            .notEmpty().withMessage('El array no debe estar vacío.')
            .bail()
            .custom(users => {
                // Verificar que cada usuario tenga un _id válido
                return users.every(user => user._id && user._id.match(/^[0-9a-fA-F]{24}$/));
            })
            .withMessage('Cada usuario debe contener un _id válido de MongoDB.')
    ],
}

export default { rules }