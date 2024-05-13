/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Select from "../components/Select";
import Alerta from "../components/Alerta";
import usePacientes from "../hooks/usePacientes";
import useVeterinarios from "../hooks/useVeterinarios";
import useAuth from "../hooks/useAuth";
import { Trabajadores } from "../helpers/helpers";

const AddPacientes = () => {
  const { auth } = useAuth();
  const { info } = auth;
  //ID ADMINISTRADOR
  const id_admin = info.veterinario._id;
  //--
  const [nombre, setNombre] = useState("");
  const [propietario, setPropietario] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaAlta, setFechaAlta] = useState("");
  const [tamaño, setTamaño] = useState("");
  const [docPropietario, setDocPropietario] = useState("");
  const [veterinario, setVeterinario] = useState("");
  const [sintomas, setSintomas] = useState("");

  //---Use
  const { guardarPaciente } = usePacientes();
  const { veterinarios } = useVeterinarios();

  //Variables
  const divClase =
    "py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg";
  //-----
  const [alerta, setAlerta] = useState({});
  useEffect(() => {
    setTimeout(() => {
      setAlerta({});
    }, 4000);
  }, [alerta.msg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [
        nombre,
        propietario,
        telefono,
        fechaAlta,
        tamaño,
        docPropietario,
        sintomas,
      ].includes("")
    ) {
      setAlerta({ msg: "Hay campos vacíos", error: true });
      return;
    }
    const respuesta = await guardarPaciente({
      nombre,
      propietario,
      docPropietario,
      telefono,
      fechaAlta,
      sintomas,
      tamano: tamaño,
      veterinario,
      auxiliar: id_admin,
    });
    setAlerta({ msg: respuesta.msg, error: respuesta.error });
  };
  return (
    <div>
      <div className="text-center md:text-left md:px-16">
        <h2 className="text-gray-300 text-[14px]">Registra tus pacientes</h2>
        <p className="text-zinc-500 text-[11px]">
          Registra los pacientes de tu veterinaria
        </p>
      </div>
      <section className="mt-9 bg-gray-950 p-3 rounded-lg">
        {alerta.msg && <Alerta alerta={alerta} />}
        <form
          className="grid md:grid-cols-3 gap-3 mt-2"
          action=""
          onSubmit={handleSubmit}
        >
          <div className={divClase}>
            <div>
              <p className="text-[10px] text-gray-500">Nombre del paciente</p>
              <input
                className="outline-none bg-transparent text-[11.5px] text-white md:w-[5rem]"
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

          <div className={divClase}>
            <div>
              <p className="text-[10px] text-gray-500">
                Nombre del propietario
              </p>
              <input
                className="outline-none bg-transparent text-[11.5px] text-white md:w-[5rem]"
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

          <div className={divClase}>
            <div>
              <p className="text-[10px] text-gray-500">Telefono</p>
              <input
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none outline-none bg-transparent text-[11.5px] text-white md:w-[5rem]"
                type="number"
                value={telefono}
                onChange={(e) => {
                  setTelefono(e.target.value);
                }}
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="phone-portrait-outline"></ion-icon>{" "}
            </span>
          </div>

          <div className={divClase}>
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

          <div className={divClase}>
            <div>
              <p className="text-[10px] text-gray-500">Tamaño</p>
              <input
                className="outline-none bg-transparent text-[11.5px] text-white md:w-[5rem]"
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

          <div className={divClase}>
            <div>
              <p className="text-[10px] text-gray-500">Doc. Propietario</p>
              <input
                className="outline-none bg-transparent text-[11.5px] text-white md:w-[5rem]"
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

          <div className={divClase}>
            <div>
              <p className="text-[10px] text-gray-500">Veterinario</p>
              <Select
                setVeterinario={setVeterinario}
                clase={"outline-none text-white text-sm bg-gray-800"}
                data={Trabajadores(veterinarios)}
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="medkit-outline"></ion-icon>{" "}
            </span>
          </div>

          <div className={divClase}>
            <div>
              <p className="text-[10px] text-gray-500">Síntomas</p>
              <textarea
                className="outline-none bg-transparent text-[11.5px] text-white md:w-[14rem]"
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
