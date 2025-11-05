import { Autor } from "../models/autor.model.js";

export const autorService = {
  obtenerTodos: async () => await Autor.find(),
  obtenerPorId: async (id) => await Autor.findById(id),
  crear: async (data) => await Autor.create(data),
  actualizar: async (id, data) => await Autor.findByIdAndUpdate(id, data, { new: true }),
  eliminar: async (id) => await Autor.findByIdAndDelete(id)
};
