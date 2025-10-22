import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error al conectar:", err));

// Modelo de Libro
const libroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  categoria: String,
  anio: Number,
  disponible: { type: Boolean, default: true },
});

const Libro = mongoose.model("Libro", libroSchema);

// RUTAS CRUD
// ➕ Crear libro
app.post("/api/libros", async (req, res) => {
  try {
    const nuevo = new Libro(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 📚 Listar libros
app.get("/api/libros", async (req, res) => {
  const libros = await Libro.find();
  res.json(libros);
});

// ✏️ Actualizar libro
app.put("/api/libros/:id", async (req, res) => {
  const actualizado = await Libro.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
});

// 🗑️ Eliminar libro
app.delete("/api/libros/:id", async (req, res) => {
  await Libro.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Libro eliminado" });
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
