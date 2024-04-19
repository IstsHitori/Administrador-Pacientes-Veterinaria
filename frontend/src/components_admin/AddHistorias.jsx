import useAuth from "../hooks/useAuth";
import { useState } from "react";
import CardHistoria from "./CardHistoria";
const AddHistorias = () => {
  //States
  const [docPaciente, setDocPaciente] = useState("");
  const { modoOscuro, auth } = useAuth();
  const { pacientes } = auth;
  //---

  //Variables
  const PALETA_COLORES = Object.freeze({
    MODO_OSCURO: {
      article: "bg-[#060A13] text-white",
      img: "bg-zinc-800",
      h4: "tex-white",
      h4_p: "text-gray-400",
      ModalClases:{
        backGround: "bg-gray-900",
        h1:"text-gray-100"
      }
    },
    MODO_CLARO: {
      article: "bg-white text-white",
      img: "bg-zinc-800",
      h4: "tex-white",
      h4_p: "text-gray-400",
      ModalClases:{
        backGround: "bg-gray-200"
      }
    },
  });
  //---

  //Funciones
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  //---
  return (
    <div>
      <div className="text-center md:text-left md:px-16">
        <h2 className="text-gray-300">Tus historias clínicas</h2>
        <p className="text-zinc-500 text-[12px]">
          Registra historias clínicas a tus pacientes
        </p>
      </div>
      <div>
        <section className="relative md:mt-6 bg-gray-900 md:px-3 rounded-lg overflow-y-auto max-h-[660px] md:max-h-[400px]">
          <div className="mb-2">
            <form
              onSubmit={handleSubmit}
              className="px-5 flex items-center gap-2"
              action=""
            >
              <input
                className="p-[10px] outline-none bg-zinc-900 rounded-lg text-white text-sm"
                type="number"
                min={0}
                value={docPaciente}
                onChange={(e) => {
                  setDocPaciente(e.target.value);
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
          <hr className="mt-3" />
          <div className="p-2">
            {pacientes.map((paciente) => {
              return (
                <CardHistoria
                  key={paciente._id}
                  paciente={paciente}
                  clase={modoOscuro ? PALETA_COLORES.MODO_OSCURO : PALETA_COLORES.MODO_CLARO}
                />
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddHistorias;
