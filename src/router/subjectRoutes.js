import express from 'express'
import { showSubject, addStudents, addProfessors, addSections, deleteStudents, deleteProfessors, deleteSections} from './../controller/subjectController.js'
import { rules } from './../middleware/subjectRules.js'
import { validate } from './../middleware/validate.js'

const router = express.Router()

router.get('/:id', rules.show, validate, showSubject)
router.post('/student/:id', rules.addStudents, validate, addStudents)
router.post('/professor/:id', rules.addProfessors, validate, addProfessors)
router.post('/section/:id', rules.addSections, validate, addSections)
router.delete('/student/:id', rules.deleteStudents, validate, deleteStudents)
router.delete('/professor/:id', rules.deleteProfessors, validate, deleteProfessors)
router.delete('/section/:id', rules.deleteSections, validate, deleteSections)

export default router