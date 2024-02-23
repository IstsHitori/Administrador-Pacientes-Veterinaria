import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res) => {
    //Aplicar destructuring para extraer los datos del formulario
    try{
        //Guardar un nuevo veterinario en la base de datos
        const veterinario = new Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();

        res.json(veterinarioGuardado);

    }catch(error){
        console.log(error);
    }
    //el servidor nos responde con un mensaje en formato json

};

const perfil = (req, res) => {
  res.json({
    url: "Desde API/VETERINARIO/REGISTRAR",
  });
};

export { registrar,perfil };
