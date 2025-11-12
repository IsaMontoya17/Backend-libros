import express from "express";
import { editorialController } from "../controllers/editorial.controller.js";

const router = express.Router();

router.get("/buscar/:nombre", editorialController.buscarPorNombre);

router.get("/", editorialController.listar);
router.get("/:id", editorialController.obtenerUno);
router.post("/", editorialController.crear);
router.put("/:id", editorialController.actualizar);
router.delete("/:id", editorialController.eliminar);

export default router;
