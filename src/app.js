import express from 'express';
import userRoutes from './router/userRoutes.js';
import searchRoutes from './router/searchRoutes.js'

const app = express();
app.use(express.json()); // Middleware para manejar JSON
app.use('/users', userRoutes); // Prefijo para las rutas
app.use('/search', searchRoutes);

// Exporta la instancia de app sin iniciar el servidor
export default app;