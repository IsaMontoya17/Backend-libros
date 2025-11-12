import express from "express";
import { libroController } from "../controllers/libro.controller.js";

const router = express.Router();

router.get("/buscar/titulo/:titulo", libroController.buscarPorTitulo);
router.get("/buscar/categoria/:categoria", libroController.buscarPorCategoria);
router.get("/buscar/disponible/:disponible", libroController.buscarPorDisponibilidad);

router.post("/", libroController.crear);
router.get("/", libroController.listar);
router.get("/:id", libroController.obtenerUno);
router.put("/:id", libroController.actualizar);
router.delete("/:id", libroController.eliminar);

export default router;
