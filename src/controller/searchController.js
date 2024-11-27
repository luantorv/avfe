import Subject from './../model/subject.js';
import Carrer from './../model/carrer.js'

// Listar todas las materias
export const getSubjects = async (req, res) => {
    try {
      const subjects = await Subject.find();
      res.status(200).json(subjects);
    } catch (error) {
      res.status(500).json({ error: 'Error al obtener las materias.' });
    }
};

// Buscar carreras según el tipo de carrera
export const getCareersByType = async (req, res) => {
  try {
    const { type } = req.params // Obtener el tipo de carrera desde la consulta

    // Verificar que se haya proporcionado el tipo de carrera
    if (!type) {
      return res.status(400).json({ message: 'Se requiere el parámetro type.' });
    }

    // Verificar que el tipo sea válido según los valores permitidos
    const validTypes = ["Ingreso", "Pregrado", "Grado", "Posgrado", "Diplomatura", "Cursos"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: `El parámetro type_c debe ser uno de los siguientes: ${validTypes.join(', ')}.` });
    }

    // Buscar las carreras por tipo
    const careers = await Carrer.find({ type }).populate('subjects'); // Incluye las materias asociadas

    if (!careers || careers.length === 0) {
      return res.status(404).json({ message: 'No se encontraron carreras con el tipo especificado.' });
    }

    res.status(200).json(careers);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar las carreras por tipo.', details: error.message });
  }
};


// Buscar materias por carrera
export const getSubjectByCarrer = async (req, res) => {
    try {
        const { carrer } = req.params;

        if ( !carrer || carrer.trim() === '') {
            return res.status(400).json({ message: 'Se requiere el parámetro carrer.' });
        }
        
        const subjects = await Subject.find({ carrers: { $in: [carrer] } });

        if (subjects.length === 0) {
            return res.status(404).json({ message: 'No se encontraron materias para la carrera especificada.' });
        }

        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar las materias por carrera.' });
    }
};
