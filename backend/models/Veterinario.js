import mongoose from "mongoose";
import generarId from "../helpers/generarId.js";
import bcrypt from "bcrypt";
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
    rol:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Roles",
        required:true,
        default:"65dbb891df9ab26524666255"
    },
    estado:{
        type:Boolean,
        default: true
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

//Antes de guardar el veterinario en la base de datos, encriptamos la contraseña

veterinarioSchema.pre("save", async function(next){

    //Validar si la contraseña ya está encriptada ya no la vuelva a encriptar
    if(!this.isModified("password")){
        next();
    }
    //Generamos el salt, rondas de hasheo
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
});

//Creamos un método para comprobar la contraseña
veterinarioSchema.methods.comprobarPassword = async function(passwordFormulario){
    //Comparamos la contraseña que el usuario ingresa con la contraseña encriptada
    return await bcrypt.compare(passwordFormulario,this.password);
}
const Veterinario = mongoose.model("Veterinario",veterinarioSchema);
export default Veterinario;