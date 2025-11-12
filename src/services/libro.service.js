import { Libro } from "../models/libro.model.js";

export const libroService = {
  obtenerTodos: async () => await Libro.find(),
  obtenerPorId: async (id) => await Libro.findById(id),
  crear: async (data) => await Libro.create(data),
  actualizar: async (id, data) => await Libro.findByIdAndUpdate(id, data, { new: true }),
  eliminar: async (id) => await Libro.findByIdAndDelete(id),

  buscarPorTitulo: async (titulo) => {
    return await Libro.find({ titulo: { $regex: titulo, $options: "i" } });
  },

  buscarPorCategoria: async (categoria) => {
    return await Libro.find({ categoria: { $regex: categoria, $options: "i" } });
  },

  buscarPorDisponibilidad: async (disponible) => {
    const valor = disponible === "true" || disponible === true;
    return await Libro.find({ disponible: valor });
  }
};
