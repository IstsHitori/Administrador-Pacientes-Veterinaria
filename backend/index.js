import express from "express";
import conectarDB from "./config/db.js";
//Para las variables de entorno en el archivo .env
import dotenv from "dotenv";

const app = express();
dotenv.config();

conectarDB();
//Routing
app.use("/", (req, res) => {
    res.send("Hello World");
});

const PORT = process.env.PORT || 4000;

//Registramos el servidor en el puerto 4000
app.listen(PORT, () => {
  console.log("Servidor funcionando en el puerto 4000");
});
