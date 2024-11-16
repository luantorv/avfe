import express from 'express'
import userRoutes from './router/userRoutes.js'
import searchRoutes from './router/searchRoutes.js'
// import adminRoutes from './router/adminRoutes.js'

const app = express()
app.use(express.json()) // Middleware para manejar JSON
app.use('/users', userRoutes)
app.use('/search', searchRoutes)
// app.use('/admin', adminRoutes.js)

export default app;