import Veterinario from "../models/Veterinario.js";
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
    //Si el veterinario existe, actualizamos el estado de la cuenta a true
    veterinario.token = null;
    veterinario.confirmado = true;
    await veterinario.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const perfil = (req, res) => {
  res.json({
    url: "Desde API/VETERINARIO/REGISTRAR",
  });
};

export { registrar, perfil, confirmar };
