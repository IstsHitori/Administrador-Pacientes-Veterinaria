/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import Tr from "./Tr";
import Th from "./Th";

import Alerta from "../components/Alerta";
import { useState, useEffect } from "react";

import useVeterinarios from "../hooks/useVeterinarios";

const Empleados = ({ info, trabajadores }) => {
  const {guardarVeterinarios} = useVeterinarios();

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
    const respuesta = guardarVeterinarios(empleados);

    if(respuesta){
      setAlerta({msg:"Empleados actualizados",error:false})
    }
  };

  const handleEstadoChange = (id, nuevoEstado) => {
    const empleadosActualizados = array_trabajadores.map((emp) => {
      if (emp._id === id) return { ...emp, estado: nuevoEstado };
      return emp;
    });
    setEmpleados(empleadosActualizados);
  };

  return (
    <>
      <div className="text-center md:text-left md:px-16">
        <h2 className="text-gray-300">
          Bienvenido de vuelta,
          <span className="font-bold"> {info.veterinario.nombre}!!</span>
        </h2>
        <p className="text-zinc-500 text-[12px]">
          Tu Admin Dashboard, vuelve y explora la información de tu veterinaria
        </p>
      </div>
      <article className="mt-1">
        {alerta.msg && <Alerta alerta={alerta} />}

        <form
          onSubmit={handleSubmit}
          className="h-[10rem] md:w-full "
          action=""
        >
          <table className=" md:mt-10  overflow-y-auto  bg-zinc-950 md:pt-2 rounded-lg w-full">
            <thead className="text-zinc-100 text-[7px] md:text-[12px]">
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
            <tbody className="text-[6px] md:text-[12px] text-zinc-300">
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
            className="text-white hover:cursor-pointer transition-all hover:bg-blue-600 md:p-2 text-[10px]  md:text-sm bg-blue-500 px-4 py-1 mt-10 rounded-lg"
            type="submit"
            value="Guardar"
          />
        </form>
      </article>
    </>
  );
};

export default Empleados;
