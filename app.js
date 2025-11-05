import express from "express";
import cors from "cors";
import libroRoutes from "./src/routes/libro.routes.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/libros", libroRoutes);

app.get("/", (req, res) => res.send("📚 API de Libros funcionando"));
