// userRoutes.js
import express from 'express'
import { getUserById, getUserByEmail, getUserByValue, getUsers, updateUser, deleteUsers, createUser, getProfyle} from './../controller/userController.js'
// import { userRules } from './../middleware/userRules.js'
// import { validate } from './../middleware/validate.js'

const router = express.Router()

router.get('/profyle/:email', getProfyle)
router.get('/list', getUsers)                               // admin
router.get('/byemail', getUserByEmail)                      // professor
router.get('/byid', getUserById)                            // admin
router.get('/byvalue', getUserByValue)                      // admin
router.post('/create', /*userRules, validate,*/ createUser)     // admin
router.put('/update/:id', updateUser)                       // admin
router.delete('/drop', deleteUsers)                         // admin

export default router
