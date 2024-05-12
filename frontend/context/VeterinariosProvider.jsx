import { createContext, useState, useEffect } from "react";
import clienteAxios from "../src/config/axios";

const VeterinariosContext = createContext();

export const VeterinariosProvider = ({ children }) => {
  const [veterinarios, setVeterinarios] = useState([]);

  useEffect(() => {
    const obtenerVeterinarios = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios(
          "/veterinarios/mostrar-trabajadores",
          config
        );
        setVeterinarios(data.trabajadores);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerVeterinarios();
  }, []);

  const guardarVeterinarios = async (empleados) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      empleados.forEach(async (empleado) => {
        console.log(empleado.rol)
        await clienteAxios.put(
          `/veterinarios/actualizar-trabajador/${empleado._id}`,
          empleado,
          config
        );
      });
      return true;
    } catch (error) {
      console.log(error);
    }
  };
  const guardarVeterinario = async (empleado) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const respuesta = await clienteAxios.post(
        "/veterinarios/registrar-trabajador",
        empleado,
        config
      );
      return { msg: respuesta.data.msg, error: false };
    } catch (error) {
      return { msg: error.response.data.msg, error: true };
    }
  };
  const actualizarVeterinario = async (empleado) => {
    try{
      const token = localStorage.getItem("token");
      if(!token)return;

      const config = {
        headers: {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${token}`
        }
      }
      const respuesta = await clienteAxios.put(
        `/veterinarios/actualizar-trabajador/${empleado._id}`,
        empleado,
        config
      );
      return respuesta;
    }catch(error){
      console.log(error);
    }
  };
  return (
    <VeterinariosContext.Provider
      value={{ veterinarios, guardarVeterinarios, guardarVeterinario,actualizarVeterinario }}
    >
      {children}
    </VeterinariosContext.Provider>
  );
};

export default VeterinariosContext;
