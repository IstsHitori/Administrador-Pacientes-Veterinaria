import express from "express";
import { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword } from "../controllers/veterinarioController.js";
import checkAuth from "../middleware/authMiddleware.js";

const router = express.Router();

//Area pública
//Routing de registrar(para registrar al veterinario , hacemos una peticion get y cargue el formulario de registro del veterinario)
router.post("/",registrar);
//Para confirmar bya token al veterinario que se registró
router.get("/confirmar/:token",confirmar);
//Para autenticar al veterinario y iniciar sesion
router.post("/login", autenticar);
//Param validar el email del usuario
router.post("/olvide-password", olvidePassword);
//Para validar el token
//Para crear otro nuevo password
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword);

//Area privada
//Routing de login(para cuando vayamos a iniciar sesion hagamos una peticion get y cargue el perfil del veterinario que se logueo)
router.get("/perfil", checkAuth,perfil);

export default router;
