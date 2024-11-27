// userRoutes.js
import express from 'express'
import { getUserById, getUserByEmail, getUserByValue, getUsers, updateUser, deleteUsers, createUser, getProfyle} from './../controller/userController.js'
import { rules } from './../middleware/userRules.js'
import { validate } from './../middleware/validate.js'

const router = express.Router()

router.get('/profyle/:email', rules.profyle, validate, getProfyle)
router.get('/list', getUsers)
router.get('/byemail', rules.byEmail, validate, getUserByEmail)
router.get('/byid', rules.byId, validate, getUserById)
router.get('/byvalue', rules.byValue, validate, getUserByValue)
router.post('/create', rules.create, validate, createUser)
router.put('/update/:id', rules.update, validate, updateUser)
router.delete('/drop', rules.delete, validate, deleteUsers)

export default router