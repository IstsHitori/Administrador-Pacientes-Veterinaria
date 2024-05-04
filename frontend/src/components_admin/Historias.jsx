/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import useHistorias from "../hooks/useHistorias"
import CardHistoria from "./CardHistoria";

const Historias = () => {
  const [docPropietario, setDocPropietario] = useState("");
  const [alerta, setAlerta] = useState({});
  let {historias} = useHistorias();
  
  useEffect(() => {
    setTimeout(() => {
      setAlerta({})
    },4000)
  },[alerta.msg])

  const handleSubmit = async () => {};
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
            className="px-5 flex items-center gap-2"
            action=""
          >
            <input
              className="p-[10px] outline-none bg-zinc-900 rounded-lg text-white text-[11px] w-[180px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              type="number"
              min={0}
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
        <hr className="mt-3" />
        <div className="p-2 grid grid-cols-1 gap-2">
          {alerta.msg ?  <Alerta alerta={alerta}/> :null}
          {historias.length < 1 ? (<Alerta alerta={{msg:"No hay historias clínicas",error:true}} />) : (
            historias.map(historia => {
              return (<CardHistoria  key={historia._id} HISTORIA={historia} />)
            })
          )}
        </div>
      </section>
    </>
  );
};

export default Historias;
