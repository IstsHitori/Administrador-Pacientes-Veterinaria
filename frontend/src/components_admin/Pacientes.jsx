/* eslint-disable react/prop-types */
import { useState } from "react";
import Card from "./Card";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
import usePacientes from "../hooks/usePacientes";
import Modal from "./Modal";

const Pacientes = ({ pacientes }) => {
  const [docPropietario, setDocPropietario] = useState("");
  const [PACIENTES, setPACIENTES] = useState(pacientes);
  const [alerta, setAlerta] = useState({});
  const [modal, setModal] = useState({});

  //--Use
  const { obtenerPaciente} = usePacientes();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if([docPropietario].includes("")){
      setPACIENTES(pacientes);
      return;
    }
    const respuesta = await obtenerPaciente (docPropietario);
    setPACIENTES(respuesta);
  };
  const { error } = alerta;
  return (
    <div className="">
      <div className="text-center md:text-left md:px-16">
        <h2 className="text-gray-300">Tus pacientes</h2>
        <p className="text-zinc-500 text-[12px]">
          Administra los pacientes de tu veterinaria
        </p>
      </div>
      <section className="relative mt-10 md:mt-2 bg-gray-900 md:px-3 rounded-lg">
        {error ? <Alerta alerta={alerta} /> : null}
        <div className="mb-2">
          <form
            onSubmit={handleSubmit}
            className="px-5 py-2 flex items-center gap-2"
            action=""
          >
            <input
              className="p-[10px] outline-none bg-zinc-900 rounded-lg text-white text-[12px]"
              type="number"
              value={docPropietario}
              onChange={(e) => {
                setDocPropietario(e.target.value);
              }}
              placeholder="Doc.Propietario"
            />
            <button
              className="text-white flex items-center justify-center hover:bg-gray-800 transition-all rounded-lg p-2 bg-gray-700"
              type="submit"
            >
              <ion-icon name="search-outline"></ion-icon>
            </button>
          </form>
        </div>
        <hr />
        <div className="relative grid grid-cols-1 h-[660px] gap-3 md:max-h-[325px] max-h-[660px]  overflow-y-auto mt-2 p-2 md:grid-cols-3">
          {modal.data && (
            <Modal infoPaciente={modal.data} setModal={setModal} />
          )}
          {PACIENTES.length < 1 ? (
            <h3 className="p-5 bg-red-800 rounded-md w-full text-center text-white">
              No hay pacientes para mostrar
            </h3>
          ) : (
            PACIENTES.map((paciente) => {
              return (
                <Card key={paciente._id} info={paciente} setModal={setModal} />
              );
            })
          )}
        </div>
      </section>
    </div>
  );
};

export default Pacientes;
