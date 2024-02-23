const registrar = (req, res) => {
    //Aplicar destructuring para extraer los datos del formulario
    const {email,password,nombre} = req.body;
    console.log(nombre)
    //el servidor nos responde con un mensaje en formato json
  res.json({
    msg: "Registrando usuario",
  });
};

const perfil = (req, res) => {
  res.json({
    url: "Desde API/VETERINARIO/REGISTRAR",
  });
};

export { registrar,perfil };
