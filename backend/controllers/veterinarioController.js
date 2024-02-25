import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarId.js";
//Para registrar al usuario
const registrar = async (req, res) => {
  //Aplicar destructuring para extraer los datos del formulario

  //Revisar si un usuario ya está registrado
  const { email } = req.body;

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

const autenticar = async (req,res) => {
    const {email,password} = req.body;
    //Pasos para autenticar al usuario 
    //1-Comprobar que el usuario existe
    const usuario = await Veterinario.findOne({email});
    if(!usuario){
      const error = new Error("El usuario no existe");
      //status 403 - no autorizado 
      return res.status(403).json({msg:error.message});
    }
    //2-Comprobar si el usuario está confirmado
    if(!usuario.confirmado){
      const error = new Error("Usuario no confirmado");
      return res.status(403).json({msg:error.message});
    }
    //3-Revisar si su password es correcto
    if(!(await usuario.comprobarPassword(password))){
      const error = new Error("Contraseña incorrecta");
      return res.status(403).json({msg:error.message});
    }
    //4-Autenticar al usuario con JSON WEB TOKEN
    res.json({token:generarJWT(usuario.id)});
}

//Para recuperar la contraseña
const olvidePassword = async (req,res) => {
  const {email} = req.body;
  const existeVeterinario = await Veterinario.findOne({email});
  if(!existeVeterinario){
    const error = new Error("Usuario no encontrado");
    return res.status(400).json({msg:error.message});
  }

  try{
    existeVeterinario.token = generarId();
    await existeVeterinario.save();
    //Enviar un email al usuario con el token
    res.json({msg:"Se ha enviado un email con las instrucciones al usuario"})
  }catch(error){
    console.log(error);
  }

}

//Para comprobar el token
const comprobarToken = async (req,res) => {
  const {token}  = req.params;

  const tokenValido = await Veterinario.findOne({token});
  if(!tokenValido){
    const error = new Error("Token no válido");
    return res.status(400).json({msg:error.message});
  }

  res.json({msg:"Token válido y el usuario existe"});

}
//Para crear un nuevo password
const nuevoPassword = async (req,res) => {
  //Lo que enviamos en la url
  const {token} = req.params;
  //Lo que el usuario escribas en el formulario
  const {password} = req.body;

  const veterinario = await Veterinario.findOne({token});
  if(!veterinario){
    const error = new Error("Hubo un error");
    return res.status(400).json({msg:error.message});
  }
  try{
    veterinario.token = null;
    veterinario.password = password;
    await veterinario.save();
    res.json({msg:"Password actualizado correctamente"});

  }catch(error){
    console.log(error);
  }
}

const perfil = (req, res) => {
  const {veterinario } = req;
  res.json({
    veterinario
  });
};

export { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword };
