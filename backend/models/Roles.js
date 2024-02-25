import mongoose from "mongoose";

const rolSchema = mongoose.Schema({
  nombre: { type: String, required: true },
});

const Rol = mongoose.model("Roles", rolSchema);

export default Rol;
