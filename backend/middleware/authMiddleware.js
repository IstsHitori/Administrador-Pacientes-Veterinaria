import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js';
//Para verificar el token
const checkAuth = async (req,res,next) => {
    let token;
    //Verificamos si el token existe y si empieza con Bearer
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            //Extraemos el token
            token = req.headers.authorization.split(" ")[1];

            //Decodificamos el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            //Buscamos al usuario por el id
            //Nos trae todos los datos del usuario menos la contraseña
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");

            return next();
        }catch(error){
            const e = new Error("Token no válido");
            return res.status(403).json({msg:e.message});
        }
    }
    if(!token){
        const error = new Error("Token no válido o inexistente");
        console.log("el no valido:",token)
        res.status(403).json({msg:error.message});
    }
    next();
}

export default checkAuth;