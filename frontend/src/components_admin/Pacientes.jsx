import { useState } from "react";
import Card from "./Card";

const Pacientes = () => {
  const handleSubmit = async(e) => {
    e.preventDefault();
  }

  return (
    <div>
      <div className="text-center md:text-left md:px-16">
        <h2 className="text-gray-300">Tus pacientes</h2>
        <p className="text-zinc-500 text-[12px]">
          Administra los pacientes de tu veterinaria
        </p>
      </div>
      <section className="mt-5 bg-gray-900 h-full p-2 rounded-lg">
        <div className="mb-2">
          <form onSubmit={handleSubmit} className="px-5 flex items-center gap-2" action="">
            <input className="p-[10px] outline-none bg-zinc-900 rounded-lg text-white text-sm" type="number" placeholder="Doc.Propietario" />
            <button className="text-white flex items-center justify-center hover:bg-gray-800 transition-all rounded-lg p-2 bg-gray-700" type="submit">
              <ion-icon name="search-outline"></ion-icon>
            </button>
          </form>
        </div>
        <hr />
        <div className="grid grid-cols-3">
          
        </div>
      </section>
    </div>
  );
};

export default Pacientes;
