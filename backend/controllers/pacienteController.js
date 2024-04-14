import Paciente from "../models/Paciente.js";

//Para agregar un paciente
const agregarPaciente = async (req, res) => {
  //Obtenemos los datos del paciente en el formulario
  const paciente = new Paciente(req.body);
  //Agregamos el veterinario que atiende a este paciente
  paciente.auxiliar = req.veterinario._id;
  try {
    const pacienteAlmacenado = await paciente.save();
    res.json(pacienteAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const obtenerPacientes = async (req, res) => {
  //me trae todos los pacientes que estén asociados al veterinario que está logueado
  const pacientes = await Paciente.find()
    .where("veterinario")
    .equals(req.veterinario);

  res.json(pacientes);
};

const obtenerPaciente = async (req, res) => {
  const { id } = req.params;
  try {
    const paciente = await Paciente.findById(id);
    if (!paciente) {
      const error = new Error("Paciente no encontrado");
      return res.status(404).json({ msg: error.message });
    }
    if (
      paciente.veterinario._id.toString() !== req.veterinario._id.toString()
    ) {
      const error = new Error("No tienes permiso para ver este paciente");
      return res.json({ msg: error.message });
    }
    res.json(paciente);
    req.paciente = paciente;
  } catch (error) {
    console.log(error);
  }
};

const actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);
  if (!paciente) {
    const error = new Error("Paciente no encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    const error = new Error("No tienes permiso para editar este paciente");
    return res.json({ msg: error.message });
  }

  //Actualizamos el paciente
  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.propietario = req.body.propietario || paciente.propietario;
  paciente.email = req.body.email || paciente.email;
  paciente.fecha = req.body.fecha || paciente.fecha;
  paciente.sintomas = req.body.sintomas || paciente.sintomas;

  try {
    const pacienteActualizado = await paciente.save();
    return res.json(pacienteActualizado);
  } catch (error) {
    console.log(error);
  }
};

const eliminarPaciente = async (req, res) => {
  const { id } = req.params;
  const paciente = await Paciente.findById(id);
  if (!paciente) {
    const error = new Error("Paciente no encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()) {
    const error = new Error("No tienes permiso para eliminar este paciente");
    return res.json({ msg: error.message });
  }

  //Eliminamos el paciente
  try {
    await paciente.deleteOne();
    res.json({ msg: "Paciente eliminado" });
  } catch (error) {
    console.log(error);
  }
};

export {
  agregarPaciente,
  obtenerPacientes,
  obtenerPaciente,
  actualizarPaciente,
  eliminarPaciente,
};
