import Roles from "../models/Roles.js";

const obtenerRoles = async (req, res) => { 
    const roles = await Roles.find();
    res.json(roles);
}

const agregarRol = async (req, res) => {
    const rol = new Roles(req.body);
    try{
        const rolGuardado = await rol.save();
        res.json({rolGuardado});
    }catch(error){
        console.log(error)
    }
}
const eliminarRol = async (req, res) => {
    const {id} = req.params;
    try{
        const rol = await Roles.findById(id);
        if(!rol){
            const error = new Error("Rol no encontrado");
            return res.status(404).json({msg:error.message});
        }
        if(rol.nombre.toString() === "ADMIN_ROL"){
            const error = new Error("No puedes eliminar el rol ADMIN");
            return res.status(400).json({msg:error.message});
        }
        // if(req.veterinario.rol !== "ADMIN_ROL"){
        //     const error = new Error("No tienes permiso para eliminar roles");
        //     return res.status(401).json({msg:error.message});
        // }
        await rol.deleteOne();
        res.json({msg:"Rol eliminado"})
    }catch(error){
        console.log(error);
    }
}

export {
    obtenerRoles,
    agregarRol,eliminarRol
}