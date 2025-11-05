import mongoose from "mongoose";

const libroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  categoria: String,
  anio: Number,
  disponible: { type: Boolean, default: true },
});

export const Libro = mongoose.model("Libro", libroSchema);
