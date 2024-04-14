/* eslint-disable react/prop-types */
import { useState } from "react";
import Select from "./Select";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const AddPacientes = ({ trabajadores, id_admin }) => {
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [email, setEmail] = useState("");
  const [fechaAlta, setFechaAlta] = useState("");
  const [tamaño, setTamaño] = useState("");
  const [docPropietario, setDocPropietario] = useState("");
  const [veterinario, setVeterinario] = useState("");
  const [sintomas, setSintomas] = useState("");

  const [alerta, setAlerta] = useState({});
  console.log(id_admin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [
        nombre,
        propietario,
        email,
        fechaAlta,
        tamaño,
        docPropietario,
        veterinario,
        sintomas,
      ].includes("")
    ) {
      setAlerta({ msg: "Hay campos vacíos", error: true });
      return;
    }
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const paciente = {nombre,propietario,docPropietario,email,fechaAlta,sintomas,tamano:tamaño, veterinario, auxiliar:id_admin}

      const respuesta = await clienteAxios.post("/pacientes/",paciente,config);
      console.log(respuesta);
      setAlerta({ msg: "Paciente registrado correctamente", error: false });
    } catch (error) {
      setAlerta({ msg: error.response.data.msg, error: true });
      return;
    }
  };
  const { error } = alerta;
  return (
    <div>
      <div className="text-center md:text-left md:px-16">
        <h2 className="text-gray-300">Registra tus pacientes</h2>
        <p className="text-zinc-500 text-[12px]">
          Registra los pacientes de tu veterinaria
        </p>
      </div>
      <section className="mt-8 bg-gray-950 p-3 rounded-lg">
        {error ? <Alerta alerta={alerta} /> : <Alerta alerta={alerta} />}
        <form
          className="grid md:grid-cols-3 gap-3 mt-2"
          action=""
          onSubmit={handleSubmit}
        >
          <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
            <div>
              <p className="text-[10px] text-gray-500">Nombre del paciente</p>
              <input
                className="outline-none bg-transparent text-[11.5px] text-white md:w-[20rem]"
                type="text"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="paw-outline"></ion-icon>{" "}
            </span>
          </div>

          <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
            <div>
              <p className="text-[10px] text-gray-500">Nombre del propietario</p>
              <input
                className="outline-none bg-transparent text-[11.5px] text-white md:w-[20rem]"
                type="text"
                value={propietario}
                onChange={(e) => {
                  setPropietario(e.target.value);
                }}
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="person-outline"></ion-icon>
            </span>
          </div>

          <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
            <div>
              <p className="text-[10px] text-gray-500">Correo</p>
              <input
                className="outline-none bg-transparent text-[11.5px] text-white md:w-[20rem]"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="mail-outline"></ion-icon>{" "}
            </span>
          </div>

          <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
            <div>
              <p className="text-[10px] text-gray-500">Fecha de alta</p>
              <input
                className="outline-none bg-transparent text-[11.5px] text-white"
                type="date"
                value={fechaAlta}
                onChange={(e) => {
                  setFechaAlta(e.target.value);
                }}
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="calendar-number-outline"></ion-icon>{" "}
            </span>
          </div>

          <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
            <div>
              <p className="text-[10px] text-gray-500">Tamaño</p>
              <input
                className="outline-none bg-transparent text-[11.5px] text-white md:w-[20rem]"
                type="text"
                value={tamaño}
                onChange={(e) => {
                  setTamaño(e.target.value);
                }}
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="pin-outline"></ion-icon>{" "}
            </span>
          </div>

          <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
            <div>
              <p className="text-[10px] text-gray-500">Doc. Propietario</p>
              <input
                className="outline-none bg-transparent text-[11.5px] text-white md:w-[20rem]"
                type="number"
                value={docPropietario}
                onChange={(e) => {
                  setDocPropietario(e.target.value);
                }}
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="people-outline"></ion-icon>{" "}
            </span>
          </div>

          <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
            <div>
              <p className="text-[10px] text-gray-500">Veterinario</p>
              <Select
                setVeterinario={setVeterinario}
                clase={"outline-none text-white text-sm bg-gray-800"}
                data={trabajadores}
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="medkit-outline"></ion-icon>{" "}
            </span>
          </div>

          <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
            <div>
              <p className="text-[10px] text-gray-500">Síntomas</p>
              <textarea
                className="outline-none bg-transparent text-[11.5px] text-white md:w-[20rem]"
                cols="30"
                rows="2"
                value={sintomas}
                onChange={(e) => {
                  setSintomas(e.target.value);
                }}
              ></textarea>
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="people-outline"></ion-icon>{" "}
            </span>
          </div>

          <input
            className="py-1 inline-block px-5 text-white bg-blue-600 hover:bg-blue-700 text-sm rounded-lg font-normal transition-all hover:cursor-pointer"
            type="submit"
            value="Registrar paciente"
          />
        </form>
      </section>
    </div>
  );
};

export default AddPacientes;
