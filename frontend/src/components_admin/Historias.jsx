/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import useHistorias from "../hooks/useHistorias";
import usePacientes from "../hooks/usePacientes";
import CardHistoria from "./CardHistoria";

const Historias = () => {
  const { historias } = useHistorias();
  const { pacientes } = usePacientes();

  const [paciente, setPaciente] = useState("");
  const [HISTORIAS, setHISTORIAS] = useState(historias);

  const [alerta, setAlerta] = useState({});

  useEffect(() => {
    setTimeout(() => {
      setAlerta({});
    }, 4000);
  }, [alerta.msg]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([paciente].includes("")) {
      setHISTORIAS(historias);
      return;
    }
    //Obtenemos el paciente
    const array_paciente = pacientes.filter((p) => p.nombre === paciente);
    if (!array_paciente.length > 0) {
      setAlerta({ msg: "No se encontró el paciente.", error: true });
      setHISTORIAS(historias);
      return;
    }
    const id_paciente = array_paciente[0]._id;
    //Obtenemos las historias del paciente
    const historias_paciente = historias.filter((h) => h.paciente === id_paciente);
    if (!historias_paciente.length > 0) {
      setAlerta({ msg: "No hay historias de este paciente.", error: true });
      setHISTORIAS(historias);
      return;
    }
    setHISTORIAS(historias_paciente);
  };
  return (
    <>
      <div className="text-center md:text-left md:px-16 ">
        <h2 className="text-gray-300 text-sm">Tus Historias Clínicas</h2>
        <p className="text-zinc-500 text-[11px]">
          Administra las historias clínicas de tu veterinaria{" "}
        </p>
      </div>
      <section className="relative md:mt-2 bg-gray-900 md:px-3 rounded-lg overflow-y-auto max-h-[660px] md:max-h-[400px] py-2">
        <div className="mb-2">
          <form
            onSubmit={handleSubmit}
            className="px-5 flex items-center gap-2 md:flex-row flex-col"
            action=""
          >
            <input
              className="p-[10px] outline-none bg-zinc-900 rounded-lg text-white text-[11px] w-[180px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="text"
              value={paciente}
              onChange={(e) => {
                setPaciente(e.target.value);
              }}
              placeholder="Nombre del paciente"
            />
            <button
              className="text-white flex items-center justify-center hover:bg-gray-800 transition-all rounded-lg p-2 bg-gray-700"
              type="submit"
            >
              <ion-icon name="search-outline"></ion-icon>
            </button>
          </form>
        </div>
        <hr className="mt-3" />
        <div className="p-2 grid grid-cols-1 gap-2">
          {alerta.msg ? <Alerta alerta={alerta} /> : null}
          {HISTORIAS.length < 1 ? (
            <Alerta
              alerta={{ msg: "No hay historias clínicas", error: true }}
            />
          ) : (
            HISTORIAS.map((historia) => {
              return <CardHistoria key={historia._id} HISTORIA={historia} />;
            })
          )}
        </div>
      </section>
    </>
  );
};

export default Historias;
