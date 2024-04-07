import express from "express";
import checkAuth from "../middleware/authMiddleware.js";
import { agregarHistoriaPaciente, obtenerHistorias,obtenerHistoriasPaciente } from "../controllers/historiaController.js"; 

const router = express.Router();

router.route("/").get(checkAuth,obtenerHistorias)

router.route("/:id").post(checkAuth, agregarHistoriaPaciente).get(checkAuth, obtenerHistoriasPaciente);

export default router;