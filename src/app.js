import express from 'express';
import userRoutes from './router/userRoutes.js';

const app = express();
app.use(express.json()); // Middleware para manejar JSON
app.use('/api', userRoutes); // Prefijo para las rutas

// Exporta la instancia de app sin iniciar el servidor
export default app;