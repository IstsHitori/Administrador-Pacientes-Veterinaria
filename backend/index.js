import express from "express";

const app = express();

//Routing
app.use("/", (req, res) => {
    res.send("Hello World");
});

//Registramos el servidor en el puerto 4000
app.listen(4000, () => {
  console.log("Servidor funcionando en el puerto 4000");
});
