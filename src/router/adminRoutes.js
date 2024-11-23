import express from 'express'
import { createCareers, updateCareers, deleteCareers, createSubjects, updateSubjects, deleteSubjects} from './../controller/adminController.js'
// import { adminRules } from './../middleware/adminRules.js'
// import { validate } from './../middleware/validate.js'

const router = express.Router()

// Gestión de Carreras
router.post('/carrer', createCareers)
router.put('/carrer', updateCareers)
router.drop('/carrer', deleteCareers)

// Gestión de Materias
router.post('/subject', createSubjects)
router.put('/subject', updateSubjects)
router.drop('/subject', deleteSubjects)

export default router