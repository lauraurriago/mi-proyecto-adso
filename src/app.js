import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import healthRoutes from './routes/healthRoutes.js';

const app = express();

// 1. Middlewares Globales
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// 2. Montaje de Enrutadores
app.use('/api/health', healthRoutes);

// 3. Manejador de Rutas No Encontradas (404)
app.use((req, res) => {
  res.status(404).json({ error: 'NotFound', message: `Ruta [${req.method}] ${req.originalUrl} no existe.` });
});

// 4. Manejador Global de Excepciones No Controladas (500)
app.use((err, req, res, next) => {
  console.error('🔥 Error:', err.stack);
  res.status(500).json({ error: 'InternalServerError', message: 'Error interno en el servidor.' });
});

export default app;