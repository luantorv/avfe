import express from 'express'
import { getSubjects, getSubjectByCarrer, getCareersByType } from './../controller/searchController.js'
import { rules } from './../middleware/searchRules.js'
import { validate } from './../middleware/validate.js'

const router = express.Router()

router.get('/list', getSubjects)
router.get('/bytype/:type', rules.byType, validate, getCareersByType)
router.get('/bycarrer/:carrer', rules.byCarrer, validate, getSubjectByCarrer)

export default router