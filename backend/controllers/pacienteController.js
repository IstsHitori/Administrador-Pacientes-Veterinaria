import Paciente from "../models/Paciente.js";

//Para agregar un paciente
const agregarPaciente = async (req, res) => {
    //Obtenemos los datos del paciente en el formulario
    const paciente = new Paciente(req.body);
    //Agregamos el veterinario que atiende a este paciente
    paciente.veterinario = req.veterinario._id;
    try{
        const pacienteAlmacenado = await paciente.save();
        res.json(pacienteAlmacenado);
    }catch(error){
        console.log(error);
    }
}

const obtenerPacientes = async (req, res) => {
    //me trae todos los pacientes que estén asociados al veterinario que está logueado
    const pacientes = await Paciente.find().where("veterinario").equals(req.veterinario);

    res.json(pacientes);
}

export {
    agregarPaciente,
    obtenerPacientes
}