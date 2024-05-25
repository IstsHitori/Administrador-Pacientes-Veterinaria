/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import Tr from "./Tr";
import Th from "./Th";
import { Trabajadores } from "../helpers/helpers.js";
import useVeterinarios from "../hooks/useVeterinarios";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import { useState, useEffect } from "react";
import usePalette from "../hooks/usePalette";

const Empleados = () => {
  const {auth} = useAuth();
  const {info}  = auth;
  const {guardarVeterinarios, veterinarios} = useVeterinarios();
  const trabajadores = Trabajadores(veterinarios);
  const {modoOscuro} = usePalette();

  const { AUXILIARES } = trabajadores;
  const { VETERINARIOS } = trabajadores;
  const array_trabajadores = AUXILIARES.auxiliares.concat(
    VETERINARIOS.veterinarios
  );
  const [alerta, setAlerta] = useState({});
  const [empleados, setEmpleados] = useState(array_trabajadores);
  useEffect(() => {
    setTimeout(() => {
      setAlerta({});
    }, 4000);
  }, [alerta.msg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const respuesta = await guardarVeterinarios(empleados);
    if(respuesta){
      setAlerta({msg:"Empleados actualizados",error:false})
    }
  };

  const handleEstadoChange = (id, nuevoEstado) => {
    const empleadosActualizados = empleados.map((emp) => {
      if (emp._id === id) return { ...emp, estado: nuevoEstado };
      return emp;
    });
    setEmpleados(empleadosActualizados);
  };

  return (
    <>
      <div className="text-center md:text-left md:px-16 ">
        <h2 className={`${modoOscuro ? 'text-gray-300' :'text-black'}`}>
          Tus trabajadores
        </h2>
        <p className="text-zinc-500 text-[12px]">
          Administra los trabajadores de tu veterinaria
        </p>
      </div>
      <article className="relative mt-4">
        {alerta.msg && <Alerta alerta={alerta} />}

        <form
          onSubmit={handleSubmit}
          className="md:w-full max-h-[370px] overflow-y-auto"
          action=""
        >
          <table className={`${modoOscuro ? 'bg-zinc-950' :'bg-slate-100'}  md:pt-2 rounded-lg w-full`} >
            <thead className="text-zinc-100 text-[7px] md:text-[12px] sticky top-0">
              <tr className="border-b border-zinc-700">
                <Th
                  clase={"bg-blue-600 rounded-s font-[200]"}
                  contenido={"Nombre"}
                />
                <Th clase={" bg-blue-600 font-[200]"} contenido={"Email"} />
                <Th clase={" bg-blue-600 font-[200]"} contenido={"Telefono"} />
                <Th clase={" bg-blue-600 font-[200]"} contenido={"Rol"} />
                <Th clase={" bg-blue-600 font-[200]"} contenido={"Estado"} />
                <Th
                  clase={"bg-blue-600 rounded-e font-[200]"}
                  contenido={"Confirmado"}
                />
              </tr>
            </thead>
            <tbody className={`${modoOscuro ? 'text-zinc-300' : 'text-black font-semibold'} text-[6px] md:text-[12px] `}>
              {array_trabajadores.map((i) => {
                return (
                  <Tr
                    clase={"border-b border-zinc-700"}
                    contenido={i}
                    key={i._id}
                    onEstadoChange={handleEstadoChange}
                  />
                );
              })}
            </tbody>
          </table>
          <input
            className="text-white hover:cursor-pointer transition-all hover:bg-blue-600 md:p-2 text-[10px]  md:text-sm bg-blue-500 px-4 py-1 mt-10 rounded-lg absolute bottom-[-50px]"
            type="submit"
            value="Guardar"
          />
        </form>
      </article>
    </>
  );
};

export default Empleados;
