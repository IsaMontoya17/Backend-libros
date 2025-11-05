import { editorialService } from "../services/editorial.service.js";

export const editorialController = {
  listar: async (req, res) => res.json(await editorialService.obtenerTodos()),
  obtenerUno: async (req, res) => {
    const editorial = await editorialService.obtenerPorId(req.params.id);
    editorial ? res.json(editorial) : res.status(404).json({ mensaje: "Editorial no encontrada" });
  },
  crear: async (req, res) => {
    try {
      const nueva = await editorialService.crear(req.body);
      res.status(201).json(nueva);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  actualizar: async (req, res) => {
    const actualizada = await editorialService.actualizar(req.params.id, req.body);
    actualizada
      ? res.json(actualizada)
      : res.status(404).json({ mensaje: "Editorial no encontrada" });
  },
  eliminar: async (req, res) => {
    const eliminada = await editorialService.eliminar(req.params.id);
    eliminada
      ? res.json({ mensaje: "Editorial eliminada" })
      : res.status(404).json({ mensaje: "Editorial no encontrada" });
  }
};
