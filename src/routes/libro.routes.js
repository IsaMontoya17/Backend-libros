import express from "express";
import { libroController } from "../controllers/libro.controller.js";

const router = express.Router();

router.post("/", libroController.crear);
router.get("/", libroController.listar);
router.put("/:id", libroController.actualizar);
router.delete("/:id", libroController.eliminar);

export default router;
