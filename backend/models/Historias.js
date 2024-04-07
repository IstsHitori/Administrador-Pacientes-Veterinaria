import mongoose from "mongoose";

const historiaSchema = new mongoose.Schema({
    veterinario: {type: mongoose.Schema.Types.ObjectId,
        ref:"Veterinario"
    },
    paciente: {type: mongoose.Schema.Types.ObjectId,
    ref:"Paciente"},
    historia:{type:String, required: true},
    fecha: {type: Date, default: Date.now()}
});

const Historia = mongoose.model("Historia",historiaSchema);

export default Historia;