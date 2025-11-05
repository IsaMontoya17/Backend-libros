import { Editorial } from "../models/editorial.model.js";

export const editorialService = {
  obtenerTodos: async () => await Editorial.find(),
  obtenerPorId: async (id) => await Editorial.findById(id),
  crear: async (data) => await Editorial.create(data),
  actualizar: async (id, data) => await Editorial.findByIdAndUpdate(id, data, { new: true }),
  eliminar: async (id) => await Editorial.findByIdAndDelete(id)
};
