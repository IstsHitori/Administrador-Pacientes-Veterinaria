import express from "express";
import {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
} from "../controllers/pacienteController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(checkAuth, agregarPaciente)
  .get(checkAuth, obtenerPacientes);

//Cuando haga una petición get , nos trae el paciente con el id que le pasemos
router
  .route("/:id")
  //Para obtener un paciente
  .get(checkAuth, obtenerPaciente)
  //Para actualizar un paciente
  .put(checkAuth, actualizarPaciente)
  //Para eliminar un paciente
  .delete(checkAuth, eliminarPaciente);

export default router;
