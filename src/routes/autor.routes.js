import express from "express";
import { autorController } from "../controllers/autor.controller.js";

const router = express.Router();

router.get("/", autorController.listar);
router.get("/:id", autorController.obtenerUno);
router.post("/", autorController.crear);
router.put("/:id", autorController.actualizar);
router.delete("/:id", autorController.eliminar);

export default router;
