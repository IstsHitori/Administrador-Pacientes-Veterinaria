import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/axios"


const OlvidePassword = () => {
  const [email,setEmail] = useState("");
  const [alerta,setAlerta] = useState({});

  const handleSubmit = async e =>{
    e.preventDefault();
    if(email === ""){
      setAlerta({msg:"El Email es obligatorio",error: true});
      return;
    }
    try{
      const {data} = await clienteAxios.post("/veterinarios/olvide-password",{email});
      setAlerta({msg:data.msg});
    }catch(error){
      setAlerta({msg:error.response.data.msg,error:true})
      return;
    }
  }
  const {msg} = alerta;
  return (
    <>
    <div className="p-10 px-20 flex flex-col justify-center items-center md:block min-h-screen">
      <header className="flex gap-4 items-center">
        <span className=" h-6 w-6  bg-blue-500 rounded-xl"></span>
        <p className="flex">
          Administrador de citas de veterinaria
          <span className="text-blue-500">.</span>
        </p>
      </header>
      <div className="mt-[5rem] mx-9">
        <h3 className="text-[24px]">
          Recuerar contraseña<span className="text-blue-500">.</span>
        </h3>
        <p className="mt-5 text-[12px] text-zinc-500">
          Ya estás registrado?
          <span className=" transition-all text-blue-500 hover:text-blue-600">
            <Link to="/"> Inicia sesión aquí</Link>
          </span>
        </p>
        { msg && <Alerta alerta={alerta}/>
          
        }
        <form
          action=""
          onSubmit={handleSubmit}
          className="mt-20 transition-all grid grid-cols-1 gap-5 max-w-[25rem]"
        >

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

          <div className="flex justify-center">
            <input
              className="p-4 px-14 bg-sky-600 rounded-[15rem] hover:cursor-pointer text-sm hover:bg-sky-700 transition-all text-center"
              type="submit"z
              value="Enviar email"
            />
          </div>
        </form>
        <p className="text-zinc-500 text-[12px] mt-8">
          No estás registrado?{" "}
          <span className="text-blue-500 hover:text-blue-600">
            <Link to="/registrar">Crea una cuenta aquí</Link>
          </span>
        </p>
      </div>
    </div>
  </>
  )
}

export default OlvidePassword