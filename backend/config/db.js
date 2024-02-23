import mongoose from "mongoose";

//Para conectarme a la base de datos mongoDB

const conectarDB = async () =>{
    try{
        //Nos conectamos a la base de datos
        const db = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        //nos dará una url  y el puerto en donde se conectara
        const url = `${db.connection.host}:${db.connection.port}`

        console.log(`Conectado a la base de datos en: ${url}`);
    }catch(error){
        console.log(`Error: ${error.message}`);
        process.exit(1); //Detener la app
    }
}

export default conectarDB;