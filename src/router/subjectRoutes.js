import express from 'express'
import { showSubject, addStudents, addProfessors, addSections, deleteStudents, deleteProfessors, deleteSections} from './../controller/subjectController.js'

const router = express.Router()

router.get('/:id', showSubject)
router.post('/student/:id', addStudents)
router.post('/professor/:id', addProfessors)
router.post('/section/:id', addSections)
router.delete('/student/:id', deleteStudents)
router.delete('/professor/:id', deleteProfessors)
router.delete('/section/:id', deleteSections)

export default router