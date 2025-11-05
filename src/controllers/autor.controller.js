import { autorService } from "../services/autor.service.js";

export const autorController = {
  listar: async (req, res) => res.json(await autorService.obtenerTodos()),
  obtenerUno: async (req, res) => {
    const autor = await autorService.obtenerPorId(req.params.id);
    autor ? res.json(autor) : res.status(404).json({ mensaje: "Autor no encontrado" });
  },
  crear: async (req, res) => {
    try {
      const nuevo = await autorService.crear(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  actualizar: async (req, res) => {
    const actualizado = await autorService.actualizar(req.params.id, req.body);
    actualizado
      ? res.json(actualizado)
      : res.status(404).json({ mensaje: "Autor no encontrado" });
  },
  eliminar: async (req, res) => {
    const eliminado = await autorService.eliminar(req.params.id);
    eliminado
      ? res.json({ mensaje: "Autor eliminado" })
      : res.status(404).json({ mensaje: "Autor no encontrado" });
  }
};
