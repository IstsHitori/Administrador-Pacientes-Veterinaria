import express from "express";
import conectarDB from "./config/db.js";
//Para las variables de entorno en el archivo .env
import dotenv from "dotenv";
import cors from "cors"
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import historiasRoutes from "./routes/historiasRoutes.js";
//Middleware's

const app = express();
//Habilitamos a express de que pueda leer los datos que el usuario envien formato json
app.use(express.json());
dotenv.config();
conectarDB();

//Dominios permitidos

const dominiosPermitidos = [process.env.FRONTEND_URL];
const corsOptions = {
  origin: function(origin,callback){
    if(dominiosPermitidos.indexOf(origin) !== -1){
      //El origen del request está permitido
      callback(null,true);
    }else{
      new Error("No permitido por axios");
    }
  }
}

app.use(cors(corsOptions));
//Routing para veterinarios
app.use("/api/veterinarios",veterinarioRoutes);

//Routing para pacientes
app.use("/api/pacientes",pacienteRoutes);

//Routing para historias
app.use("/api/historias",historiasRoutes);
const PORT = process.env.PORT || 4000;

//Registramos el servidor en el puerto 4000
app.listen(PORT, () => {
  console.log("Servidor funcionando en el puerto 4000");
});
