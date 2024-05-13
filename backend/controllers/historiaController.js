import Historia from "../models/Historias.js";
import Veterinario from "../models/Veterinario.js";
import Paciente from "../models/Paciente.js";
import Roles from "../models/Roles.js";

const obtenerHistorias = async (req, res) => {
  const rolBuscar = req.veterinario.rol;
  const rol = await Roles.findById(rolBuscar);
  //Si es admin
  if (rol.nombre === "ADMIN_ROL" || rol.nombre === "AUXILIAR_ROL") {
    const historias = await Historia.find();
    return res.json(historias);
  }
  const historias = await Historia.find().where("veterinario").equals(req.veterinario._id);
  return res.json(historias);
};

const agregarHistoriaPaciente = async (req, res) => {
  const { id } = req.params;
  try {
    const veterinarioBuscar = await Veterinario.findById(req.veterinario._id);
    const pacienteBuscar = await Paciente.findById(id);

    if (!veterinarioBuscar) {
      const error = new Error("Veterinario no encontrado");
      return res.status(404).json({ msg: error.message });
    }
    if (veterinarioBuscar._id.toString() !== req.veterinario._id.toString()) {
      const error = new Error("No tienes permiso para esta acción");
      return res.json({ msg: error.message });
    }
    //paciente
    if (!pacienteBuscar) {
      const error = new Error("Paciente no encontrado");
      return res.status(404).json({ msg: error.message });
    }
    if (pacienteBuscar._id.toString() !== id.toString()) {
      const error = new Error("No tienes permiso para esta acción");
      return res.json({ msg: error.message });
    }

    const historia = new Historia(req.body);
    historia.veterinario = veterinarioBuscar._id;
    historia.paciente = pacienteBuscar._id;

    const historiaGuardada = await historia.save();

    return res.json(historiaGuardada);
  } catch (error) {
    console.log(error);
  }
};

const obtenerHistoriasPaciente = async (req, res) => {
  const { id } = req.params;

  try {
    const pacienteBuscar = await Paciente.findById(id);
    //paciente
    if (!pacienteBuscar) {
      const error = new Error("Paciente no encontrado");
      return res.status(404).json({ msg: error.message });
    }
    if (pacienteBuscar._id.toString() !== id.toString()) {
      const error = new Error("No tienes permiso para esta acción");
      return res.json({ msg: error.message });
    }

    const historiasPaciente = await Historia.find().where("paciente").equals(id);

    return res.json(historiasPaciente);
  } catch (error) {
    console.log(error);
  }
};
export { obtenerHistorias, agregarHistoriaPaciente, obtenerHistoriasPaciente };
