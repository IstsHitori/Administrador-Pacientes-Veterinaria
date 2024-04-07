import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { TOKEN } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${TOKEN}`);
        setAlerta({ msg: "Ingresa tu nueva contraseña" });
        setTokenValido(true);
      } catch (error) {
        setAlerta({ msg: "Hubo un error con el enlace", error: true });
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setAlerta({
        msg: "La contraseña debe ser mínimo de 6 caracteres",
        error: true,
      });
      return;
    }
    if (password !== confirmarPassword) {
      setAlerta({ msg: "Las contraseñas deben ser iguales", error: true });
      return;
    }
    try {
      const url = `/veterinarios/olvide-password/${TOKEN}`;
      const { data } = await clienteAxios.post(url, {
        password,
      });
      setAlerta({ msg: data.msg });
      setConfirmarPassword(true);
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
    }
  };
  const { msg } = alerta;
  return (
    <>
      <div className="p-8 flex justify-center items-center flex-col min-h-screen md:block">
        <header className="flex gap-4 items-center">
          <span className=" h-6 w-6  bg-blue-500 rounded-xl "></span>
          <p className="flex">
            Administrador de citas de veterinaria
            <span className="text-blue-500">.</span>
          </p>
        </header>
        <div className="mt-[4rem] mx-9">
          <h3 className="text-[24px]">
            Crea una nueva contraseña<span className="text-blue-500">.</span>
          </h3>

          {msg && <Alerta alerta={alerta} />}
          {tokenValido && (
            <>
              <form
                action=""
                onSubmit={handleSubmit}
                className="mt-5 transition-all grid grid-cols-2 gap-5 max-w-[32rem]"
              >
                <div className="bg-zinc-800 max-h-[4rem] rounded-xl px-6 py-1.5">
                  <label htmlFor="" className="text-[11px] text-zinc-500">
                    Nueva contraseña
                  </label>
                  <input
                    type="password"
                    name=""
                    id=""
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block bg-zinc-800 outline-none text-sm w-full"
                  />
                </div>

                <div className="bg-zinc-800 max-h-[4rem] rounded-xl px-6 py-1.5 ">
                  <label htmlFor="" className="text-[11px] text-zinc-500">
                    Confirmar nueva contraseña
                  </label>
                  <input
                    type="password"
                    name=""
                    id=""
                    value={confirmarPassword}
                    onChange={(e) => setConfirmarPassword(e.target.value)}
                    className="block bg-zinc-800 outline-none text-sm w-full"
                  />
                </div>

                <input
                  className="p-4 px-14 bg-sky-600 rounded-[15rem] hover:cursor-pointer text-[11px] hover:bg-sky-700 transition-all w-full text-center"
                  type="submit"
                  value="Cambiar contraseña"
                />
              </form>
              {passwordModificado && (
                <p className="text-zinc-500 text-[12px] mt-8">
                  Iniciar Sesion{" "}
                  <span className="text-blue-500 hover:text-blue-600">
                    <Link to="/"> aquí</Link>
                  </span>
                </p>
              )}
            </>
          )}
        </div>
      </div>{" "}
    </>
  );
};

export default NuevoPassword;
