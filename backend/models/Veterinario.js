import mongoose from "mongoose";

//Creamos el esquema veterinario
//no asignamos ID porque mongo lo asigna automaticamente
const veterinarioSchema = new mongoose.Schema({
    nombre:{
        //El tipo de dato
        type:String,
        //Si es obligario o no
        required:true,
        //Elimina espacios en blanco
        trim:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    telefono:{
        type:String,
        //No es obligatorio
        default:null,
        trim:true
    },
    web:{
        type:String,
        default:null,
    },
    token:{
        type:String,
    },
    confirmado:{
        type:Boolean,
        default:false
    }
});

const Veterinario = mongoose.model("Veterinario",veterinarioSchema);
export default Veterinario;