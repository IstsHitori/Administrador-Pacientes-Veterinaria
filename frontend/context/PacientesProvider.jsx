/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import clienteAxios from "../src/config/axios";

const PacientesContext = createContext();
export const PacientesProvider = ({ children }) => {
  const [pacientes, setPacientes] = useState([]);
  const location = useLocation();
  useEffect(() => {
    const obtenerPacientes = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
  
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const {data} = await clienteAxios("/pacientes",config);
        setPacientes(data);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerPacientes();
  }, [location.pathname]);
  const guardarPaciente = async (paciente) => {
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
        "/pacientes/",
        paciente,
        config
      );
      return { msg: "Paciente registrado correctamente", error: false };
    } catch (error) {
      return { msg: error.response.data.msg, error: true };
    }
  };
  const obtenerPaciente = async (docPropietario) => {
    try{
        const token = localStorage.getItem("token");
        if (!token) return;
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        if ([docPropietario].includes("")) {
          setPacientes(pacientes);
          return;
        }
        const respuesta = await clienteAxios(
          `/pacientes/${docPropietario}`,
          config
        );
        if (respuesta.statusText === "OK") {
          return respuesta.data;
        }
    }catch(error) {console.log(error);}
  }

  const actualizarPaciente = async(pacienteActualizado) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      await clienteAxios.put(
        `/pacientes/${pacienteActualizado._id}`,
        pacienteActualizado,
        config
      );
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        setPacientes,
        guardarPaciente,
        obtenerPaciente,
        actualizarPaciente
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export default PacientesContext;
