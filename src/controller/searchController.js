import Subject from './../model/subject.js';

// Listar todas las materias
export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las materias.' });
    }
};

// Buscar materia por ID
export const getSubjectById = async (req, res) => {
    try {
        //const { id } = req.params;
        const _id = req.query._id

        if ( !_id ) {
            return res.status(400).json({ message: 'Se requiere el parámetro _id.' });
        }

        const subject = await Subject.findById(_id);

        if (!subject) {
            return res.status(404).json({ message: 'Materia no encontrada.' });
        }

        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar la materia por ID.' });
    }
};

// Buscar materias por carrera
export const getSubjectByCarrer = async (req, res) => {
    try {
        //const { carrer } = req.params;
        const carrer = req.query.carrer

        if ( !carrer ) {
            return res.status(400).json({ message: 'Se requiere el parámetro carrer.' });
        }

        const subjects = await Subject.find({ carrers: carrer });

        if (subjects.length === 0) {
            return res.status(404).json({ message: 'No se encontraron materias para la carrera especificada.' });
        }

        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar las materias por carrera.' });
    }
};
