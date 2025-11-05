import { libroService } from "../services/libro.service.js";

export const libroController = {
  listar: async (req, res) => {
    const libros = await libroService.obtenerTodos();
    res.json(libros);
  },
  obtenerUno: async (req, res) => {
    const libro = await libroService.obtenerPorId(req.params.id);
    libro ? res.json(libro) : res.status(404).json({ mensaje: "Libro no encontrado" });
  },
  crear: async (req, res) => {
    try {
      const nuevo = await libroService.crear(req.body);
      res.status(201).json(nuevo);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  actualizar: async (req, res) => {
    const actualizado = await libroService.actualizar(req.params.id, req.body);
    actualizado
      ? res.json(actualizado)
      : res.status(404).json({ mensaje: "Libro no encontrado" });
  },
  eliminar: async (req, res) => {
    const eliminado = await libroService.eliminar(req.params.id);
    eliminado
      ? res.json({ mensaje: "Libro eliminado" })
      : res.status(404).json({ mensaje: "Libro no encontrado" });
  }
};
