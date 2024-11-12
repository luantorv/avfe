import Subject from '../model/subject.js';

// Obtener todos los usuarios
export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un usuario por ID
export const getSubjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const subject = await Subject.findById(id);

        if (!subject) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};