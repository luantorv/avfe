import { param } from 'express-validator';

export const rules = {
    byType: [
        param('type_c')
            .exists().withMessage('El parámetro type es obligatorio.')
            .isString().withMessage('El parámetro type debe ser una cadena de texto.')
            .isIn(["Ingreso", "Pregrado", "Grado", "Posgrado", "Diplomatura", "Cursos"])
            .withMessage('El parámetro type debe ser uno de los siguientes: Ingreso, Pregrado, Grado, Posgrado, Diplomatura, Cursos.'),
    ],
    byCarrer: [
        param('carrer')
            .exists().withMessage('El parámetro carrer es obligatorio.')
            .notEmpty().withMessage('El parámetro carrer no puede estar vacío.')
            .isString().withMessage('El parámetro carrer debe ser una cadena de texto.')
    ]
};