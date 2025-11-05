import mongoose from "mongoose";

const libroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  categoria: String,
  anio: Number,
  disponible: { type: Boolean, default: true },
  autor: { type: mongoose.Schema.Types.ObjectId, ref: "Autor" },
  editorial: { type: mongoose.Schema.Types.ObjectId, ref: "Editorial" }
});

export const Libro = mongoose.model("Libro", libroSchema);
