import mongoose from "mongoose";

const autorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  nacionalidad: String,
  fechaNacimiento: Date
});

export const Autor = mongoose.model("Autor", autorSchema);
