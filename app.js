import express from "express";
import cors from "cors";
import libroRoutes from "./src/routes/libro.routes.js";
import autorRoutes from "./src/routes/autor.routes.js";
import editorialRoutes from "./src/routes/editorial.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("📚 API funcionando correctamente"));

app.use("/api/libros", libroRoutes);
app.use("/api/autores", autorRoutes);
app.use("/api/editoriales", editorialRoutes);
