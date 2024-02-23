import express from "express";
import { registrar, perfil } from "../controllers/veterinarioController.js";
const router = express.Router();

//Routing de registrar(para registrar al veterinario , hacemos una peticion get y cargue el formulario de registro del veterinario)
router.post("/",registrar);


//Routing de login(para cuando vayamos a iniciar sesion hagamos una peticion get y cargue el perfil del veterinario que se logueo)
router.get("/perfil",perfil);

export default router;
