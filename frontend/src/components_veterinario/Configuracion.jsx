import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useVeterinarios from "../hooks/useVeterinarios";
import Alerta from "../components/Alerta";
import Input from "../components/Input";
import usePalette from "../hooks/usePalette";

const Configuracion = () => {
  const veterinario = useAuth().auth.info.veterinario;
  const {actualizarVeterinario} = useVeterinarios();
  const { email, nombre, rol, telefono } = veterinario;
  //-States
  const [vNombre, setVNombre] = useState(nombre);
  const [vEmail, setVEmail] = useState(email);
  const [vtelefono, setVTelefono] = useState(telefono);
  const [vRol] = useState(rol.nombre.split("_")[0]);
  const [vPassword,setVPassword] = useState("");
  const [vConfirmarPass,setVconfirmarPass] = useState("");
  const [alerta, setAlerta] = useState({});
  //-Fin states

  //-Variables
  const {modoOscuro} = usePalette();

  const divClase =
    "py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg";
  const inputClase =
    "outline-none bg-transparent text-[11.5px] text-white w-[6rem] md:w-[20rem]";
  const pClase = "text-[10px] text-gray-500";
  const spanClase = "flex items-center justify-center text-gray-400";
  const nameIonIcon = "paw-outline";
  const sectionClase =`relative mt-2 p-5 ${modoOscuro ? 'bg-gray-950':'bg-slate-100'}  md:px-3 rounded-lg overflow-y-auto max-h-[660px] md:max-h-[400px] py-2`;

  //-Funciones
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([vEmail, vNombre, vtelefono].includes("")) {
      setAlerta({ msg: "Hay campos vacíos", error: true });
      return;
    }
    if(vPassword !== vConfirmarPass){
      setAlerta({msg:"Las contraseñas deben coincidir",error:true});
      if(vPassword.length < 6){
        setAlerta({msg:"La contraseña debe ser mayor o igual a 6 caracteres",error:true});
        return;
      }
      return;
    }
    let veterinarioActualizado;
    if(vPassword !== '') {
      veterinarioActualizado = {_id:veterinario._id,nombre:vNombre,email:vEmail,telefono:vtelefono,password:vPassword};
    }else{
      veterinarioActualizado = {_id:veterinario._id,nombre:vNombre,email:vEmail,telefono:vtelefono};
    }
    const respuesta = await actualizarVeterinario(veterinarioActualizado);
    if(respuesta.status === 200){
      setAlerta({msg:"Datos actualizados",error:false});
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setAlerta({});
    }, 4000);
  }, [alerta.msg]);

  return (
    <>
      <div className="text-center md:text-left md:px-16 ">
        <h2 className="text-gray-300 text-sm">Tu información personal</h2>
        <p className="text-zinc-500 text-[11px]">
          Edita tu información personal{" "}
        </p>
      </div>
      <section className={sectionClase}>
        {alerta.msg ? <Alerta alerta={alerta} /> : null}

        <form
          className="grid mt-2 md:grid-cols-2 gap-5"
          onSubmit={handleSubmit}
        >
          <Input
            value={vNombre}
            setValue={setVNombre}
            claseDiv={divClase}
            claseInput={inputClase}
            claseP={pClase}
            claseSpan={spanClase}
            editable={true}
            name={nameIonIcon}
            valueP={"Nombre"}
            tipo={"text"}
          />
          <Input
            value={vEmail}
            setValue={setVEmail}
            claseDiv={divClase}
            claseInput={inputClase}
            claseP={pClase}
            claseSpan={spanClase}
            name={nameIonIcon}
            valueP={"Email"}
            editable={true}
            tipo={"email"}
          />
          <Input
            value={vtelefono}
            setValue={setVTelefono}
            claseDiv={divClase}
            claseInput={inputClase}
            claseP={pClase}
            claseSpan={spanClase}
            name={nameIonIcon}
            editable={true}
            valueP={"Telefono"}
            tipo={"number"}
          />

          <Input
            value={vPassword}
            setValue={setVPassword}
            claseDiv={divClase}
            claseInput={inputClase}
            claseP={pClase}
            claseSpan={spanClase}
            editable={true}
            name={nameIonIcon}
            valueP={"Nueva contraseña"}
            tipo={"password"}
          />

          <Input
            value={vConfirmarPass}
            setValue={setVconfirmarPass}
            claseDiv={divClase}
            claseInput={inputClase}
            claseP={pClase}
            claseSpan={spanClase}
            editable={true}
            name={nameIonIcon}
            valueP={"Confirmar nueva contraseña"}
            tipo={"password"}
          />

          <Input
            value={vRol}
            claseDiv={divClase}
            claseInput={
              "outline-none bg-transparent text-[11.5px] text-yellow-300 md:w-[5rem]"
            }
            claseP={pClase}
            claseSpan={spanClase}
            name={nameIonIcon}
            valueP={"Rol"}
            editable={false}
            tipo={"text"}
          />

          <input
            className="px-12 py-2 text-white bg-blue-600 rounded-lg text-sm hover:bg-blue-700 cursor-pointer col-span-full  mx-auto"
            type="submit"
            value="Guardar cambios"
          />
        </form>
      </section>
    </>
  );
};

export default Configuracion;
