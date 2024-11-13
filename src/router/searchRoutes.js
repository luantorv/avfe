import express from 'express'
import { getSubjects, getSubjectById, getSubjectByCarrer } from './../controller/searchController.js'
// import { searchRules } from './../middleware/searchRules.js'
// import { validate } from './../middleware/validate.js'

const router = express.Router()

router.get('/list', getSubjects);
router.get('/byid', getSubjectById);
router.get('/bycarrer', getSubjectByCarrer);

export default router