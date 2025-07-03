import express from "express";
import path from "path";
import cors from 'cors';
import { fileURLToPath } from "url";
import connectDB from './db-mongodb.js';
import pedidosRouter from './routes/pedidos.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: '*' }));  // specify ruta aqui
// const corsOptions = {
//   origin: 'https://proyectofinal-frontend3.onrender.com',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// };

// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); // preflight

app.use(express.json());

async function startServer() {
  try {
    const db = await connectDB();
    app.locals.db = db;

    app.use('/api/v1/pedidos', pedidosRouter);
    console.log('Mounted pedidosRouter en /pedidos');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}

startServer();