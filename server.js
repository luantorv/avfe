// server.js
import app from './src/app.js';
import listen from './src/config/db.js';

const PORT = process.env.PORT || 8080;

const startServer = async () => {
    try {
        await listen(); // Conecta a la base de datos
        app.listen(PORT, () => {
            console.log(`escuchando en http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error.message);
        process.exit(1); // Detiene la app si falla la conexión
    }
};

startServer();
