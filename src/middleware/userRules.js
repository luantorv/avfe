import { body } from 'express-validator';

export const userRules = [
    body('name')
        .exists()
        .withMessage('El campo nombre es obligatorio')
        .isString()
        .withMessage('El nombre debe ser un string')
        .notEmpty()
        .withMessage('El nombre es obligatorio'),
    body('lastname')
        .isString()
        .withMessage('El nombre debe ser un string')
        .notEmpty()
        .withMessage('El apellido es obligatorio'),
    body('email')
        .isEmail()
        .withMessage('Debe ser un correo válido')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria'),
    body('guest')
        .exists()
        .notEmpty()
        .withMessage('El campo guest es obligatorio')
        .isBoolean()
        .withMessage('Guest debe ser un valor booleano'),
    body('carrers')
        .optional()
        .isArray()
        .withMessage('El campo carrers debe ser un array')
];
