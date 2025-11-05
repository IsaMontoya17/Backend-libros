import { Libro } from "../models/libro.model.js";

export const libroService = {
  obtenerTodos: async () => await Libro.find(),
  obtenerPorId: async (id) => await Libro.findById(id),
  crear: async (data) => await Libro.create(data),
  actualizar: async (id, data) => await Libro.findByIdAndUpdate(id, data, { new: true }),
  eliminar: async (id) => await Libro.findByIdAndDelete(id)
};
