import { param } from 'express-validator';

const rules = {
    byType: [
        param('type')
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

export default { rules };