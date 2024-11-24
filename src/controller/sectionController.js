import Section from './../model/section.js';
import mongoose from 'mongoose';

// Obtener una sección por ID
export async function getSectionById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "El ID proporcionado no es válido." });
    }

    const section = await Section.findById(id).populate('subsections');

    if (!section) {
      return res.status(404).json({ message: 'Sección no encontrada' });
    }

    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Crear una nueva sección
export async function createSection(req, res) {
  try {
    const { section_id, title, type_sec, author, body, subsections } = req.body;

    // Validar campos requeridos manualmente (opcional, ya que el esquema lo valida también)
    if (!title || !type_sec || !author || !body) {
      return res.status(400).json({ error: "Todos los campos requeridos deben estar completos." });
    }

    // Crear una nueva sección
    const section = new Section({
      section_id: section_id || undefined, // Dejar que se genere automáticamente si no se proporciona
      title,
      type_sec,
      author,
      body,
      subsections,
    });

    const savedSection = await section.save();
    res.status(201).json(savedSection);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Actualizar una sección por ID (solo los campos proporcionados)
export async function updateSection(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body; // Los campos a actualizar
  
      // Asegurarse de que el objeto no esté vacío
      if (Object.keys(updates).length === 0) {
        return res.status(400).json({ message: 'No se proporcionaron campos para actualizar' });
      }
  
      // Actualizar solo los campos proporcionados
      const updatedSection = await Section.findByIdAndUpdate(
        id,
        { $set: updates }, // Solo actualiza los campos recibidos
        { new: true, runValidators: true } // Retorna el documento actualizado y aplica validaciones
      ).populate('subsections'); // Incluye subsecciones en la respuesta
  
      if (!updatedSection) {
        return res.status(404).json({ message: 'Sección no encontrada' });
      }
  
      res.status(200).json(updatedSection);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
}

// Eliminar una sección por ID
export async function deleteSection(req, res) {
  try {
    const { id } = req.params;

    const deletedSection = await Section.findByIdAndDelete(id);

    if (!deletedSection) {
      return res.status(404).json({ message: 'Sección no encontrada' });
    }

    res.status(200).json({ message: 'Sección eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Agregar una subsección a una sección
export async function addSubsection(req, res) {
  try {
    const { id } = req.params;
    const { subsectionId } = req.body;

    const section = await Section.findById(id);
    if (!section) {
      return res.status(404).json({ message: 'Sección no encontrada' });
    }

    if (!section.subsections.includes(subsectionId)) {
      section.subsections.push(subsectionId);
      await section.save();
    }

    res.status(200).json({ message: 'Subsección agregada', section });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Eliminar una subsección de una sección
export async function deleteSubsection(req, res) {
  try {
    const { id } = req.params;
    const { subsectionId } = req.body;

    const section = await Section.findById(id);
    if (!section) {
      return res.status(404).json({ message: 'Sección no encontrada' });
    }

    section.subsections = section.subsections.filter(subsec => subsec.toString() !== subsectionId);
    await section.save();

    res.status(200).json({ message: 'Subsección eliminada', section });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
