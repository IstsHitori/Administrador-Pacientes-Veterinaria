import express from "express";
import conectarDB from "./config/db.js";
//Para las variables de entorno en el archivo .env
import dotenv from "dotenv";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";

//Middleware's

const app = express();
//Habilitamos a express de que pueda leer los datos que el usuario envien formato json
app.use(express.json());
dotenv.config();

conectarDB();
//Routing
app.use("/api/veterinarios",veterinarioRoutes);

const PORT = process.env.PORT || 4000;

//Registramos el servidor en el puerto 4000
app.listen(PORT, () => {
  console.log("Servidor funcionando en el puerto 4000");
});
