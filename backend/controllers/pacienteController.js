import mongoose from "mongoose";
import Paciente from "../models/Paciente.js";
import Roles from "../models/Roles.js";

//Para agregar un paciente
const agregarPaciente = async (req, res) => {
  //Obtenemos los datos del paciente en el formulario
  const {docPaciente,nombre} = req.body;
  const paciente = new Paciente(req.body);
  const exixstePaciente = await Paciente.find({docPaciente,nombre});
  if(exixstePaciente.length > 0) return res.status(404).json({msg:"Este paciente ya está registrado"});
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
  const rolBuscar = req.veterinario.rol;
  const rol = await Roles.findById(rolBuscar);

  //Si es admin
  if (rol.nombre === "ADMIN_ROL" || rol.nombre === "AUXILIAR_ROL") {
    const pacientes = await Paciente.find();
    return res.json(pacientes);
  }

  const pacientes = await Paciente.find()
    .where("veterinario")
    .equals(req.veterinario._id);

  res.json(pacientes);
};

const obtenerPaciente = async (req, res) => {
  const { id } = req.params;
  try {
    const paciente = await Paciente.find().where("docPropietario").equals(id);
    if (!paciente) {
      const error = new Error("Paciente no encontrado");
      return res.status(404).json({ msg: error.message });
    }
    res.json(paciente);
    req.paciente = paciente;
  } catch (error) {
    console.log(error);
  }
};

const actualizarPaciente = async (req, res) => {
  const { id } = req.params;
  const ADMIN_ROL = (await Roles.find({nombre:"ADMIN_ROL"}))[0];
  const paciente = await Paciente.findById(id);
  if (!paciente) {
    const error = new Error("Paciente no encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if ((paciente.auxiliar._id.toString() !== req.veterinario._id.toString()) && (ADMIN_ROL._id.toString() !== req.veterinario.rol.toString())) {
    const error = new Error("No tienes permiso para editar este paciente");
    return res.json({ msg: error.message });
  }
  //Actualizamos el paciente
  paciente.nombre = req.body.nombre || paciente.nombre;
  paciente.propietario = req.body.propietario || paciente.propietario;
  paciente.telefono = req.body.telefono || paciente.telefono;
  paciente.fecha = req.body.fecha || paciente.fecha;
  paciente.sintomas = req.body.sintomas || paciente.sintomas;
  console.log(req.body.estado)
  paciente.estado = req.body.estado;
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
