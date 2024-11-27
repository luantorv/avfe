import { Router } from 'express';
const router = Router();
import { getSectionById, createSection, updateSection, deleteSection, addSubsection, deleteSubsection } from './../controller/sectionController.js'
import { validate } from './../middleware/validate.js'
import { rules } from './../middleware/sectionRules.js'

router.get('/:id', rules.byId, validate, getSectionById)
router.post('/create', rules.create, validate, createSection)
router.put('/update/:id', rules.update, validate, updateSection)
router.delete('/drop/:id', rules.delete, validate,deleteSection)
router.post('/subsection/:id', rules.addSubsection, validate, addSubsection)
router.delete('/subsection/:id', rules.deleteSubsection, validate, deleteSubsection)

export default router;