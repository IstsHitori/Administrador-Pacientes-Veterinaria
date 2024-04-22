import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import { useEffect } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import { ROLES } from "../helpers/helpers";

const Login = () => {
  const { auth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const {setAuth} = useAuth();
  const navigate = useNavigate();
  //Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, password].includes("")) {
      setAlerta({ msg: "Hay campos vacíos", error: true });
      return;
    }
    try {
      const respuesta  = await clienteAxios.post("/veterinarios/login", {
        email,
        password,
      });
      const {data} = respuesta;
      setAuth({info:data});
      localStorage.setItem("token", data.veterinario.token);
      
      //para que nos envíe a la ruta del rol envíe a la
      // Resto de tu código
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true }); 
    }
  };

  useEffect(() => {
    if (auth?.info?.veterinario?.rol) {
      console.log(auth);
      const { rol } = auth.info.veterinario;
      console.log("paso")
      if (rol.nombre === ROLES.ADMIN_ROL) {
        navigate("/admin-dashboard");
      } else if (rol === ROLES.AUXILIAR_ROL) {
        navigate("/auxiliar-dashboard");
      } else {
        navigate("/veterinario-dashboard");
      }
    }
  }, [auth.info]);
  const { msg } = alerta;
  return (
    <>
      <div className="p-14 min-h-screen flex flex-col items-center justify-center md:block">
        <header className="flex gap-4 items-center">
          <span className=" h-6 w-6  bg-blue-500 rounded-xl "></span>
          <p className="flex">
            Administrador de citas de veterinaria
            <span className="text-blue-500">.</span>
          </p>
        </header>
        <div className="mt-[2rem] mx-9">
          <h3 className="text-[24px]">
            Inicia sesión en tu cuenta<span className="text-blue-500">.</span>
          </h3>
          <p className="mt-5 text-[12px] text-zinc-500">
            No tienes una cuenta?
            <span className=" transition-all text-blue-500 hover:text-blue-600">
              <Link to="/registrar"> Crea una aquí</Link>
            </span>
          </p>
          {msg && <Alerta alerta={alerta} />}
          <form
            action=""
            className="mt-8 transition-all"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col p-3 px-5 bg-zinc-800 rounded-xl w-[25rem] ">
              <label className="text-[10px] text-zinc-500 font-bold">
                Correo
              </label>
              <input
                className="outline-none bg-zinc-800 text-[12px] mt-1"
                type="email"
                name=""
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id=""
              />
            </div>

            <div className="flex mt-[2.3rem] flex-col p-3 px-5 bg-zinc-800 rounded-xl w-[25rem]">
              <label className="text-[10px] text-zinc-500 font-bold" name="">
                Contraseña
              </label>
              <input
                className="outline-none bg-zinc-800 text-[12px] mt-1"
                type="password"
                name=""
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id=""
              />
            </div>

            <div className="mx-[6rem] mt-6">
              <input
                className="p-4 px-14 bg-sky-600 rounded-[15rem] hover:cursor-pointer text-sm hover:bg-sky-700 transition-all"
                type="submit"
                value="Iniciar sesion"
              />
            </div>
          </form>
          <p className="text-zinc-500 text-[12px] mt-5">
            Has olvidado tu contraseña?{" "}
            <span className="text-blue-500 hover:text-blue-600">
              <Link to="olvide-password">Recuperala aquí</Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
