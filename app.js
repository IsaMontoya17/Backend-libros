import express from "express";
import cors from "cors";

import libroRoutes from "./src/routes/libro.routes.js";
import autorRoutes from "./src/routes/autor.routes.js";
import editorialRoutes from "./src/routes/editorial.routes.js";
import informeRoutes from "./src/routes/informes.routes.js";

export const app = express();

// ✅ Configurar CORS para permitir local y Render
const allowedOrigins = [
  process.env.CLIENT_URL,      // dominio del frontend en Render
  "http://localhost:5173"      // dominio local de Vite
];

app.use(cors({
  origin: (origin, callback) => {
    // Permite si no hay origin (ej. Postman) o si está en la lista
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS no permitido"));
    }
  }
}));

// 🧱 Middlewares
app.use(express.json());

// 📚 Rutas
app.get("/", (req, res) => res.send("📚 API funcionando correctamente 🚀"));

app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);
app.use("/api/editoriales", editorialRoutes);
app.use("/api/informe", informeRoutes);
