/* eslint-disable react/prop-types */
import { useState } from "react";

const Card = ({ info, setModal }) => {
  const { nombre, docPropietario} = info;
  
  const handleClick  = async() => {
    setModal({data:info, activo: true});
  }
  return (
    <article className="flex flex-col gap-5 p-4 bg-gradient-to-t from-zinc-950 to-black rounded-xl cursor-pointer transition-all hover:scale-105">
      <div className={`rounded-[50%] w-14 h-14 flex items-center justify-center text-lg text-zinc-950 ${info.estado ? "bg-blue-500" : "bg-red-500"} font-bold`}>
        {nombre[0] + nombre[1]}
      </div>
      <p className="text-blue-400 text-sm">
        Doc. Propietario: <span className="text-white">{docPropietario}</span>
      </p>
      <p className="text-blue-400 text-sm">
        Nombre del paciente: <span className="text-white">{nombre}</span>
      </p>
      <div className="flex items-center justify-center">
        <button className="px-6 py-3 text-blue-600 transition-all hover:bg-zinc-950 bg-black rounded-lg text-sm" onClick={handleClick}>
          Ver información completa
        </button>
      </div>
    </article>
  );
};

export default Card;
