import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";
import Roles from "../models/Roles.js";
//Para registrar al usuario
const registrar = async (req, res) => {
  //Aplicar destructuring para extraer los datos del formulario

  //Revisar si un usuario ya está registrado
  const { email, nombre } = req.body;

  //Nos traemos con findOne un registro de la base de datos
  const existeUsuario = await Veterinario.findOne({ email });

  if (existeUsuario) {
    //Generamos un error si el usuario ya está registrado
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }
  try {
    //Guardar un nuevo veterinario en la base de datos
    const veterinario = new Veterinario(req.body);
    const veterinarioGuardado = await veterinario.save();
    //el servidor nos responde con un mensaje en formato json
    emailRegistro({ email, nombre, token: veterinarioGuardado.token });

    res.json(veterinarioGuardado);
  } catch (error) {
    console.log(error);
  }
};

//Para confirmar al usuario en la base de datos
const confirmar = async (req, res) => {
  const { token } = req.params;
  const veterinario = await Veterinario.findOne({ token });
  if (!veterinario) {
    const error = new Error("Token no válido");
    return res.status(404).json({ msg: error.message });
  }
  try {
    //Si el veterinario existe, actualizamos el confirmado de la cuenta a true
    veterinario.token = null;
    veterinario.confirmado = true;
    //Actualizamos al veterinario
    await veterinario.save();
    //El servidor nos devuelve un json con un mensaje de confirmación
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

//Para autenticar a los usuarios

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  //Pasos para autenticar al usuario
  //1-Comprobar que el usuario existe
  const usuario = await Veterinario.findOne({ email }).populate(
    "rol",
    "_id nombre"
  );
  if (!usuario) {
    const error = new Error("El usuario no existe");
    //status 403 - no autorizado
    return res.status(403).json({ msg: error.message });
  }
  //2-Comprobar si el usuario está confirmado
  if (!usuario.confirmado) {
    const error = new Error("Usuario no confirmado");
    return res.status(403).json({ msg: error.message });
  }
  //Comprobar si el usuario está permitido para acceder al programa o no
  if(!usuario.estado){
    const error = new Error("No tienes permiso para acceder");
    return res.status(403).json({msg:error.message});
  }
  //3-Revisar si su password es correcto
  if (!(await usuario.comprobarPassword(password))) {
    const error = new Error("Contraseña incorrecta");
    return res.status(403).json({ msg: error.message });
  }
  usuario.token = generarJWT(usuario.id);
  //4-Autenticar al usuario con JSON WEB TOKEN
  res.json({
    veterinario: {
      _id: usuario._id,
      nombre: usuario.nombre,
      confirmado: usuario.confirmado,
      estado: usuario.estado,
      rol: usuario.rol,
      email: usuario.email,
      telefono: usuario.telefono,
      token: usuario.token,
    },
  });
};

//Para recuperar la contraseña
const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const existeVeterinario = await Veterinario.findOne({ email });
  if (!existeVeterinario) {
    const error = new Error("Usuario no encontrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    existeVeterinario.token = generarId();
    await existeVeterinario.save();
    //Enviar email con instrucciones
    emailOlvidePassword({
      email,
      nombre: existeVeterinario.nombre,
      token: existeVeterinario.token,
    });

    //Enviar un email al usuario con el token
    res.json({
      msg: "Se ha enviado un email con las instrucciones al usuario",
    });
  } catch (error) {
    console.log(error);
  }
};

//Para comprobar el token
const comprobarToken = async (req, res) => {
  const { token } = req.params;

  const tokenValido = await Veterinario.findOne({ token });
  if (!tokenValido) {
    const error = new Error("Token no válido");
    return res.status(400).json({ msg: error.message });
  }

  res.json({ msg: "Token válido y el usuario existe" });
};
//Para crear un nuevo password
const nuevoPassword = async (req, res) => {
  //Lo que enviamos en la url
  const { token } = req.params;
  //Lo que el usuario escribas en el formulario
  const { password } = req.body;

  const veterinario = await Veterinario.findOne({ token });
  if (!veterinario) {
    const error = new Error("Hubo un error");
    return res.status(400).json({ msg: error.message });
  }
  try {
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();
    res.json({ msg: "Password actualizado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

//Para actualizar trabajador
const actualizarTrabajador = async (req, res) => {
  try {
    const EMPLEADO = await Veterinario.findById(req.body._id);
    if (!EMPLEADO) {
      res.json({ msg: `No se encontró el empleado` });
    }
    EMPLEADO.estado = Boolean(req.body.estado);
    EMPLEADO.nombre = req.body.nombre || EMPLEADO.nombre;
    EMPLEADO.telefono = req.body.telefono || EMPLEADO.telefono;
    EMPLEADO.email = req.body.email || EMPLEADO.email;
    EMPLEADO.password = req.body.password || EMPLEADO.password;
    const empledadoActualizado = await EMPLEADO.save();    
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

//Para obtener todos los veterinarios
const obtenerTrabajadores = async (req, res) => {
  //Acceder al rol del veterinario
  const veterinarioRol = req.veterinario.rol;
  //Traerme rol admin
  const rolAdmin = (
    await Roles.find().where("nombre").equals("ADMIN_ROL").select("-nombre")
  )[0]._id;


  const nombreRolesPermitidos = ["VETERINARIO_ROL", "AUXILIAR_ROL","ADMIN_ROL"];
  //traerme los roles que sean veterinario
  const roles = await Roles.find()
    .where("nombre")
    .in(nombreRolesPermitidos)
    .select("-nombre");

  const trabajadores = await Veterinario.find()
    .where("rol")
    .in(roles)
    .populate("rol", "-_id nombre")
    .select("-password");

  res.json({ trabajadores });
};

const perfil = async (req, res) => {
  if(req.veterinario === null || undefined){
    const error = new Error("No existe el usuario")
    return res.status(403).json({msg:error.message});
  }
  const veterinario = await Veterinario.findById(req.veterinario._id)
    .populate("rol", "-_id nombre")
    .select("-password");
  res.json({
    veterinario,
  });
};

const obtenerTrabajador = async (req, res) => {
  const { id } = req.params;

  const veterinario = await Veterinario.findById(id).select("-password");
  return res.json({ veterinario });
};

//Registrar el trabajador
const registrarTrabajador = async (req, res) => {
  const { email, rol } = req.body;
  const nombreRol = { nombre: rol };
  const existeEmpleado = await Veterinario.findOne({ email });

  if (existeEmpleado) {
    const error = new Error(
      "Este empleado ya está registrado con este correo."
    );
    return res.status(400).json({ msg: error.message });
  }
  const idRol = (await Roles.findOne(nombreRol))._id;
  const empleado = new Veterinario(req.body);
  empleado.rol = idRol;
  const empleadoGuardado = await empleado.save();
  emailRegistro({
    email,
    nombre: empleadoGuardado.nombre,
    token: empleadoGuardado.token,
  });

  return res.json({ msg: "Empleado registrado correctamente." });
};

export {
  registrar,
  perfil,
  confirmar,
  autenticar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  obtenerTrabajadores,
  actualizarTrabajador,
  registrarTrabajador,
  obtenerTrabajador,
};
