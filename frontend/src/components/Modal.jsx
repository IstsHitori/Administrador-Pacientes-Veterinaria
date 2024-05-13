/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";
const Modal = ({ infoPaciente, setModal, esAdmin }) => {
  //Funciones
  const formarDate = (date) => {
    return date.substring(0, 10);
  };
  //----

  //--Use
  const { actualizarPaciente } = usePacientes();
  //---

  //-----

  //States
  const [nombre, setNombre] = useState(infoPaciente.nombre);
  const [propietario, setPropietario] = useState(infoPaciente.propietario);
  const [telefono, setTelefono] = useState(infoPaciente.telefono);
  const [fechaAlta, setFechaAlta] = useState(formarDate(infoPaciente.fecha));
  const [tamaño, setTamaño] = useState(infoPaciente.tamano);
  const [docPropietario, setDocPropietario] = useState(
    infoPaciente.docPropietario
  );
  const [veterinario, setVeterinario] = useState("");
  const [sintomas, setSintomas] = useState(infoPaciente.sintomas);
  const [estado, setEstado] = useState(infoPaciente.estado);
  const [alerta, setAlerta] = useState({});

  const ID_VETERINARIO = infoPaciente.veterinario;
  const { _id, auxiliar } = infoPaciente;
  //-----
  //Eventos---

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!esAdmin){
      setAlerta({msg:"No tienes permiso para editar pacientes",error:true});
      return;
    }
    if (
      [
        nombre,
        propietario,
        telefono,
        fechaAlta,
        tamaño,
        docPropietario,
        veterinario,
        sintomas,
        estado,
      ].includes("")
    ) {
      setAlerta({ msg: "Hay campos vacíos", error: true });
      return;
    }

    const pacienteActualizado = {
      _id,
      auxiliar,
      docPropietario,
      telefono,
      estado,
      fechaAlta,
      nombre,
      propietario,
      sintomas,
      tamano: tamaño,
      veterinario,
    };
    try {
      const respuesta = await actualizarPaciente(pacienteActualizado);
      console.log(respuesta)
      setAlerta({ msg: "Datos actualizados correctamente", error: false });
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = () => {
    setModal({ data: "", activo: false });
  };
  //----

  //useEffect
  useEffect(() => {
    const cargarNombreVeterinario = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const respuesta = await clienteAxios.get(
        `/veterinarios/obtener-trabajador/${ID_VETERINARIO}`,
        config
      );
      const nombreVeterinario =  respuesta.data.veterinario;
      if(nombreVeterinario !== null){
        setVeterinario(nombreVeterinario.nombre)
        return;
      }
      setVeterinario("No existe")

    };
    cargarNombreVeterinario();
  }, [ID_VETERINARIO]);

  useEffect(() => {
    setTimeout(() => {
      setAlerta({});
    }, 4000);
  }, [alerta.msg]);

  //----

  return (
    <>
      {esAdmin ? (
        <article className="absolute  min-h-[400px] z-10 max-w-[500px] left-[25%]">
          {alerta.msg && <Alerta alerta={alerta} />}

          <div className="bg-zinc-950 rounded-lg p-4">
            <h4 className="text-sm text-white text-center mb-2">
              Información completa del paciente
            </h4>
            <hr />
            <form
              className="grid md:grid-cols-2 gap-4 mt-2"
              onSubmit={handleSubmit}
            >
              <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
                <div>
                  <p className="text-[10px] text-gray-500">
                    Nombre del paciente
                  </p>
                  <input
                    className="ooutline-none bg-transparent text-[11.5px] text-white md:w-[10rem]"
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
                  <p className="text-[10px] text-gray-500">
                    Nombre del propietario
                  </p>
                  <input
                    className="outline-none bg-transparent text-[11.5px] text-white md:w-[10rem]"
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
                  <p className="text-[10px] text-gray-500">Telefono</p>
                  <input
                    className="outline-none bg-transparent text-[11.5px] text-white md:w-[10rem]"
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

              <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
                <div>
                  <p className="text-[10px] text-gray-500">Fecha de alta</p>
                  <input
                    className="outline-none bg-transparent text-[11.5px] text-white md:w-[10rem]"
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
                  <p className="text-[10px] text-gray-500">Estado</p>
                  <select
                    onChange={(e) => {
                      setEstado(e.target.value === "true");
                    }}
                    className={`outline-none bg-gray-800 text-[11.5px] ${
                      estado ? "text-green-500" : "text-red-500"
                    } md:w-[10rem]`}
                  >
                    <option
                      className={`${
                        estado ? "text-green-500" : "text-red-500"
                      }`}
                      value={true}
                    >
                      {"true"}
                    </option>

                    <option
                      className={`${
                        !estado ? "text-green-500" : "text-red-500"
                      }`}
                      value={false}
                    >
                      {"false"}
                    </option>
                  </select>
                </div>
                <span className="flex items-center justify-center text-gray-400">
                  <ion-icon name="calendar-number-outline"></ion-icon>{" "}
                </span>
              </div>

              <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
                <div>
                  <p className="text-[10px] text-gray-500">Tamaño</p>
                  <input
                    className="outline-none bg-transparent text-[11.5px] text-white md:w-[10rem]"
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
                    className="outline-none bg-transparent text-[11.5px] text-white md:w-[10rem]outline-none  md:w-[10rem]"
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
                  <input
                    className="outline-none bg-transparent text-[11.5px] text-yellow-400 md:w-[10rem]"
                    type="text"
                    disabled
                    value={veterinario}
                    onChange={(e) => {
                      setVeterinario(e.target.value);
                    }}
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
                    className="outline-none bg-transparent text-[11.5px] text-white md:w-[10rem]"
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
                className="text-white bg-blue-600 rounded-lg hover:cursor-pointer max-h-[70px] hover:bg-blue-700 mt-5"
                type="submit"
                value="Guardar"
              />
            </form>
            <div className="flex items-center justify-center mt-5">
              <button
                className="text-white bg-red-700 px-8 py-2 text-sm rounded-lg hover:bg-red-800"
                onClick={handleClick}
              >
                Cerrar
              </button>
            </div>
          </div>
        </article>
      ) : (
        //OTRO ARTICLEEEEEEEEEEEEEEEE-----------
        <article className="absolute  min-h-[400px] z-10 max-w-[500px] left-[25%]">
          {alerta.msg && <Alerta alerta={alerta} />}

          <div className="bg-zinc-950 rounded-lg p-4">
            <h4 className="text-sm text-white text-center mb-2">
              Información completa del paciente
            </h4>
            <hr />
            <form
              className="grid md:grid-cols-2 gap-4 mt-2"
              onSubmit={handleSubmit}
            >
              <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
                <div>
                  <p className="text-[10px] text-gray-500">
                    Nombre del paciente
                  </p>
                  <input
                    className="ooutline-none bg-transparent text-[11.5px] text-white md:w-[10rem]"
                    type="text"
                    value={nombre}
                    disabled
                  />
                </div>
                <span className="flex items-center justify-center text-gray-400">
                  <ion-icon name="paw-outline"></ion-icon>{" "}
                </span>
              </div>

              <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
                <div>
                  <p className="text-[10px] text-gray-500">
                    Nombre del propietario
                  </p>
                  <input
                    className="outline-none bg-transparent text-[11.5px] text-white md:w-[10rem]"
                    type="text"
                    value={propietario}
                    disabled
                  />
                </div>
                <span className="flex items-center justify-center text-gray-400">
                  <ion-icon name="person-outline"></ion-icon>
                </span>
              </div>

              <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
                <div>
                  <p className="text-[10px] text-gray-500">Telefono</p>
                  <input
                    className="outline-none bg-transparent text-[11.5px] text-white md:w-[10rem]"
                    type="number"
                    value={telefono}
                    disabled
                  />
                </div>
                <span className="flex items-center justify-center text-gray-400">
                  <ion-icon name="phone-portrait-outline"></ion-icon>{" "}
                </span>
              </div>

              <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
                <div>
                  <p className="text-[10px] text-gray-500">Fecha de alta</p>
                  <input
                    className="outline-none bg-transparent text-[11.5px] text-white md:w-[10rem]"
                    type="date"
                    value={fechaAlta}
                    disabled
                  />
                </div>
                <span className="flex items-center justify-center text-gray-400">
                  <ion-icon name="calendar-number-outline"></ion-icon>{" "}
                </span>
              </div>
              <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
                <div>
                  <p className="text-[10px] text-gray-500">Estado</p>
                  <select
                    onChange={(e) => {
                      setEstado(e.target.value === "true");
                    }}
                    disabled
                    className={`outline-none bg-gray-800 text-[11.5px] ${
                      estado ? "text-green-500" : "text-red-500"
                    } md:w-[10rem]`}
                  >
                    <option
                      className={`${
                        estado ? "text-green-500" : "text-red-500"
                      }`}
                      value={true}
                    >
                      {"true"}
                    </option>

                    <option
                      className={`${
                        !estado ? "text-green-500" : "text-red-500"
                      }`}
                      value={false}
                    >
                      {"false"}
                    </option>
                  </select>
                </div>
                <span className="flex items-center justify-center text-gray-400">
                  <ion-icon name="calendar-number-outline"></ion-icon>{" "}
                </span>
              </div>

              <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
                <div>
                  <p className="text-[10px] text-gray-500">Tamaño</p>
                  <input
                    className="outline-none bg-transparent text-[11.5px] text-white md:w-[10rem]"
                    type="text"
                    value={tamaño}
                    disabled
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
                    className="outline-none bg-transparent text-[11.5px] text-white md:w-[10rem]outline-none  md:w-[10rem]"
                    type="number"
                    value={docPropietario}
                    disabled
                  />
                </div>
                <span className="flex items-center justify-center text-gray-400">
                  <ion-icon name="people-outline"></ion-icon>{" "}
                </span>
              </div>

              <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
                <div>
                  <p className="text-[10px] text-gray-500">Veterinario</p>
                  <input
                    className="outline-none bg-transparent text-[11.5px] text-yellow-400 md:w-[10rem]"
                    type="text"
                    disabled
                    value={veterinario}
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
                    className="outline-none bg-transparent text-[11.5px] text-white md:w-[10rem]"
                    cols="30"
                    rows="2"
                    value={sintomas}
                    disabled
                  ></textarea>
                </div>
                <span className="flex items-center justify-center text-gray-400">
                  <ion-icon name="people-outline"></ion-icon>{" "}
                </span>
              </div>
     
            </form>
            <div className="flex items-center justify-center mt-5">
              <button
                className="text-white bg-red-700 px-8 py-2 text-sm rounded-lg hover:bg-red-800"
                onClick={handleClick}
              >
                Cerrar
              </button>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default Modal;
