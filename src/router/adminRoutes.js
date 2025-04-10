import express from 'express'
import { createCareers, updateCareers, deleteCareers, createSubjects, updateSubjects, deleteSubjects} from './../controller/adminController.js'
import { rules } from './../middleware/adminRules.js'
import { validate } from './../middleware/validate.js'

const router = express.Router()

// Gestión de Carreras
router.post('/carrer', rules.createCareers, validate, createCareers)
router.put('/carrer', rules.updateCareers, validate, updateCareers)
router.delete('/carrer', rules.deleteCareers, validate, deleteCareers)

// Gestión de Materias
router.post('/subject', rules.createSubjects, validate, createSubjects)
router.put('/subject', rules.updateSubjects, validate, updateSubjects)
router.delete('/subject', rules.deleteSubjects, validate, deleteSubjects)

export default router