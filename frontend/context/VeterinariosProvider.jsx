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
        const {data} = await clienteAxios(
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

  const guardarVeterinarios = async () => {
    console.log("Guardando...");
  };
  return (
    <VeterinariosContext.Provider value={{ veterinarios, guardarVeterinarios }}>
      {children}
    </VeterinariosContext.Provider>
  );
};

export default VeterinariosContext;
