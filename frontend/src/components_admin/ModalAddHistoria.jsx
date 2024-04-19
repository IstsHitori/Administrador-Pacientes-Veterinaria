import { useState } from "react";
import useAuth from "../hooks/useAuth";
/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types, no-unused-vars
const ModalAddHistoria = ({ clase, paciente }) => {
  //Paciente
  const { nombre, docPropietario } = paciente;
  //---

  //Variables
  const { auth } = useAuth();
  console.log(auth);
  //---
  //States
  const [historia, setHistoria] = useState("");
  //----

  const { backGround, h1 } = clase;
  return (
    <div className={`${backGround} transition-all rounded-lg p-2 mt-4`}>
      <h1 className={`${h1} text-sm text-center`}>
        {`Registra una nueva historia clínica para  ${paciente.nombre}`}
      </h1>
      <hr className="block mt-3" />

      <form className="mt-2 grid grid-cols-2 gap-2" action="">
        <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
          <div>
            <p className="text-[10px] text-gray-500">Nombre</p>
            <input
              className="outline-none bg-transparent text-[11.5px] text-white"
              type="text"
              value={nombre}
              disabled
            />
          </div>
        </div>

        <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
          <div>
            <p className="text-[10px] text-gray-500">Veterinario</p>
            <input
              className="appearance-none focus:outline-none bg-transparent text-[11.5px] text-yellow-400"
              type="text"
              value={auth.info.veterinario.nombre}
              disabled
            />
          </div>
        </div>

        <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
          <div>
            <p className="text-[10px] text-gray-500">Doc. Propietario</p>
            <input
              className="outline-none bg-transparent text-[11.5px] text-white"
              type="text"
              value={docPropietario}
              disabled
            />
          </div>
        </div>

        <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
          <div>
            <p className="text-[10px] text-gray-500">Fecha</p>
            <input
              className="outline-none bg-transparent text-[11.5px] text-white"
              type="text"
              value={new Date().toLocaleDateString()}
              disabled
            />
          </div>
        </div>

        <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg col-span-2">
          <div>
            <p className="text-[10px] text-gray-500">Historia</p>
            <textarea
              className="outline-none bg-transparent md:w-[950px] text-[11.5px] text-white"
              cols="20"
              rows="8"
            ></textarea>
          </div>
        </div>
        <input
          className="cursor-pointer bg-blue-600 hover:bg-blue-700 rounded-md mx-auto col-span-2 p-2 text-center text-sm px-7"
          type="submit"
          value="Registrar historia"
        />
      </form>
    </div>
  );
};

export default ModalAddHistoria;
