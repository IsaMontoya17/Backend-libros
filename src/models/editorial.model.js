import mongoose from "mongoose";

const editorialSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  pais: String,
  anioFundacion: Number
});

export const Editorial = mongoose.model("Editorial", editorialSchema);
