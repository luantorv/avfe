import { Router } from 'express';
const router = Router();
import { getSectionById, createSection, updateSection, deleteSection, addSubsection, deleteSubsection } from './../controller/sectionController.js'; // Ajusta la ruta según tu estructura

router.get('/:id', getSectionById); // Obtener una sección por ID
router.post('/create', createSection); // Crear una nueva sección
router.put('/update/:id', updateSection); // Actualizar una sección por ID
router.delete('/drop/:id', deleteSection); // Eliminar una sección por ID
router.post('/add_subsection/:id', addSubsection); // Agregar una subsección
router.post('/delete_subsection/:id', deleteSubsection); // Eliminar una subsección

export default router;
