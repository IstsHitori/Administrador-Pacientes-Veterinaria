import mongoose from "mongoose";

const pacienteSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  propietario: { type: String, required: true },
  docPropietario: {type:String, required: true},
  telefono: { type: String, required: true },
  fecha : { type: Date,required: true, default: Date.now()},
  sintomas: { type: String, required: true },
  estado: {type: Boolean, default: true},
  tamano:{type:String, required: true},
  //Para saber quien es el veterinario que atiende a este paciente
  veterinario: {type:mongoose.Schema.Types.ObjectId, 
    //Referencia al modelo de veterinario
    ref:'Veterinario'},
  auxiliar: {type:mongoose.Schema.Types.ObjectId,ref:"Veterinario"}
}, {
    //Agrega la fecha de creación y modificación
    timestamps: true,
});

const Paciente = mongoose.model("Paciente",pacienteSchema);

export default Paciente;  