import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Registrar = () => {

  const [nombre,setNombre]  = useState("");
  const [telefono,setTelefono]  = useState("");
  const [email,setEmail]  = useState("");
  const [password,setPassword]  = useState("");
  const [repetirPassword,setRepetirPassword]  = useState("");
  const [alerta,setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if([nombre,telefono,email,password,repetirPassword].includes("")){
      setAlerta({msg:"Hay campos vacíos",error:true})
      return;
    }
    if(password !== repetirPassword){
      setAlerta({msg:"Las contraseñas no son iguales",error:true})
      return;
    }
    if(password.length < 6){
      setAlerta({msg:"La contraseña debe tener mínimo 6 carácteres",error:true})
      return;
    }
    setAlerta({})

    //Crear una cuenta de veterinario
    try{
      //A donde se envía la petición post
      await clienteAxios.post("/veterinarios",{
        nombre,telefono,email,password
      });
      setAlerta({msg:"Te has registrado correctamente, revisa tu email",error:false})

    }catch(error){
      setAlerta({msg:error.response.data.msg,error:true})
    }
  }
  return (  
    <>
      <div className="p-12 flex justify-center items-center flex-col min-h-screen md:block">
        <header className="flex gap-4 items-center">
          <span className=" h-6 w-6  bg-blue-500 rounded-xl "></span>
          <p className="flex">
            Administrador de citas de veterinaria
            <span className="text-blue-500">.</span>
          </p>
        </header>
        <div className="mt-[4rem] mx-9">
          <h3 className="text-[24px]">
            Crea una nueva cuenta<span className="text-blue-500">.</span>
          </h3>
          <p className="mt-5 text-[12px] text-zinc-500">
            Ya tienes una cuenta?
            <span className=" transition-all text-blue-500 hover:text-blue-600">
              <Link to="/"> Inicia sesión aquí</Link>
            </span>
          </p>
          {alerta.error ? <Alerta alerta={alerta}/> : null }
          <form
            action=""
            onSubmit={handleSubmit}
            className="mt-5 transition-all grid grid-cols-2 gap-5 max-w-[32rem]"
          >
            <div className="bg-zinc-800 max-h-[4rem] rounded-xl px-6 py-1.5">
              <label htmlFor="" className="text-[11px] text-zinc-500">
                Nombre
              </label>
              <input
                type="text"
                name=""
                id=""
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                className="block bg-zinc-800 outline-none text-sm w-full"
              />
            </div>

            <div className="bg-zinc-800 max-h-[4rem] rounded-xl px-6 py-1.5 ">
              <label htmlFor="" className="text-[11px] text-zinc-500">
                Telefono
              </label>
              <input
                type="text"
                name=""
                id=""
                value={telefono}
                onChange={e => setTelefono(e.target.value)}
                className="block bg-zinc-800 outline-none text-sm w-full"
              />
            </div>

            <div className="bg-zinc-800 max-h-[4rem] rounded-xl px-6 py-1.5 ">
              <label htmlFor="" className="text-[11px] text-zinc-500">
                Correo
              </label>
              <input
                type="email"
                name=""
                id=""
                value={email}
                onChange={e => setEmail(e.target.value)}
         
                className="block bg-zinc-800 outline-none text-sm w-full"
              />
            </div>

            <div className="bg-zinc-800 max-h-[4rem] rounded-xl px-6 py-1.5">
              <label htmlFor="" className="text-[11px] text-zinc-500">
                Contraseña
              </label>
              <input
                type="password"
                name=""
                id=""
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="block bg-zinc-800 outline-none text-sm w-full"
              />
            </div>

            <div className="bg-zinc-800 max-h-[4rem] rounded-xl px-6 py-1.5 ">
              <label htmlFor="" className="text-[11px] text-zinc-500">
                Confirmar contraseña
              </label>
              <input
                type="password"
                name=""
                id=""
                value={repetirPassword}
                onChange={e => setRepetirPassword(e.target.value)}
                className="block bg-zinc-800 outline-none text-sm w-full"
              />
            </div>

            <input
                className="p-4 px-14 bg-sky-600 rounded-[15rem] hover:cursor-pointer text-sm hover:bg-sky-700 transition-all w-full text-center"
                type="submit"
                value="Registrarse"
              />
          </form>
          <p className="text-zinc-500 text-[12px] mt-8">
            Has olvidado tu contraseña?{" "}
            <span className="text-blue-500 hover:text-blue-600">
              <Link to="/olvide-password">Recuperala aquí</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Registrar;
