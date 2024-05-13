/* eslint-disable react/prop-types */
import { useState } from "react";
import ModalAddHistoria from "../components_admin/ModalAddHistoria";
const CardAddHistoria = ({ clase, paciente }) => {
  const { article, img, h4, h4_p, ModalClases } = clase;
  //Paciente
  const { nombre, docPropietario, estado } = paciente;
  //---
  //States
  const [modalActivo, setModalActivo] = useState(false);
  //---

  //Funciones
  const handleClick = async () => {
    setModalActivo(modalActivo ? false : true)
  };
  //---
  return (
    <article
      className={`${article} mt-2 rounded-lg transition-all border-2 p-2 ${
        estado ? "border-green-600 " : "border-rose-600 "
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <div className={`${img} rounded-[50%] w-11 h-11 text-[15px] text-center flex items-center justify-center`}>
            <p className="text-center">{nombre[0] + nombre[1]}</p>
          </div>
          <div>
            <h4 className={`${h4} text-[14px]`}>{nombre}</h4>
            <p className={`${h4_p} text-sm mt-1`}>{docPropietario}</p>
          </div>
        </div>
        <button
          onClick={handleClick}
          className="p-2 rounded-lg cursor-pointer bg-zinc-800 hover:bg-zinc-900 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          >
            <path
              fill="currentColor"
              d="m202.83 146.83l-72 72a4 4 0 0 1-5.66 0l-72-72a4 4 0 0 1 5.66-5.66L124 206.34V40a4 4 0 0 1 8 0v166.34l65.17-65.17a4 4 0 0 1 5.66 5.66"
            />
          </svg>
        </button>
      </div>
      {modalActivo ? <ModalAddHistoria clase={ModalClases} paciente={paciente} /> : null}
    </article>
  );
};

export default CardAddHistoria;
