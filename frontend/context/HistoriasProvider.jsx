import { createContext, useState, useEffect } from "react";
import clienteAxios from "../src/config/axios";

const HistoriasContext = createContext();

export const HistoriasProvider = ({ children }) => {
  const [historias, setHistorias] = useState([]);

  useEffect(() => {
    const obtenerHistorias = async () => {
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
          "/historias",
          config
        );
        setHistorias(data)
      } catch (error) {
        console.log(error);
      }
    };
    obtenerHistorias();
  }, []);

  const guardarHistoria = async () => {
    console.log("Guardando...");
  };
  return (
    <HistoriasContext.Provider value={{ historias, guardarHistoria }}>
      {children}
    </HistoriasContext.Provider>
  );
};

export default HistoriasContext;
