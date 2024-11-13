// userRoutes.js
import express from 'express'
import { createUser, getUsers, getUserById, updateUser, deleteUser, getUserByEmail } from './../controller/userController.js'
import { userRules } from './../middleware/userRules.js'
import { validate } from './../middleware/validate.js'

const router = express.Router()

router.get('/byemail', getUserByEmail)
router.get('/byid', getUserById)

router.post('/create', userRules, validate, createUser)
router.get('/list', getUsers)
router.put('/update/:id', updateUser)
router.delete('/drop/:id', deleteUser)

export default router
