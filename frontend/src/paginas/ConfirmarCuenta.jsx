//permite leer los parámetros de la URL
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Alerta from "../components/Alerta";
import { Link } from "react-router-dom";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {
  const params = useParams();
  const { id } = params;
  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const { data } = await clienteAxios(url);
        setCuentaConfirmada(true);
        setAlerta({ msg: data.msg, error: false });
      } catch (error) {
        console.log(error);
        setAlerta({ msg: error.response.data.msg, error: true });
      }
      setCargando(false);
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <div className="p-14 flex flex-col justify-center items-center md:block">
        <header className="flex gap-4 items-center mb-16">
          <span className=" h-6 w-6  bg-blue-500 rounded-xl "></span>
          <p className="flex">
            Administrador de citas de veterinaria
            <span className="text-blue-500">.</span>
          </p>
        </header>
        {!cargando && <Alerta alerta={alerta} />}
        {cuentaConfirmada && (
          <>
            <h2 className="mt-10 mb-6 text-2xl">Tu cuenta se ha confirmado <br /> correctamente<span className="text-blue-500">.</span></h2>
            <p className="transition-all text-zinc-500 text-sm ">Inicia sesion {""}
              <Link to="/"><span className="text-blue-500 hover:text-blue-600">
              aquí</span></Link>
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default ConfirmarCuenta;
