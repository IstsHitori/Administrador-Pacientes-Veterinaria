import mongoose from "mongoose";
import generarId from "../helpers/generarId.js";
const usuarioSchema = new mongoose.Schema({
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
    rol:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Roles",
        default:"65dbb891df9ab26524666255"
    },
    token:{
        type:String,
        default: generarId()
    },
    confirmado:{
        type:Boolean,
        default:false
    }
});