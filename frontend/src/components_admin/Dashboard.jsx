/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import useAuth from "../hooks/useAuth";
import { Trabajadores } from "../helpers/helpers.js";
import useVeterinarios from "../hooks/useVeterinarios";
import useHistorias from "../hooks/useHistorias";
import usePacientes from "../hooks/usePacientes";
import usePalette from "../hooks/usePalette.jsx";
const Dashboard = () => {
  const { auth } = useAuth();
  const { info } = auth;
  const { veterinarios } = useVeterinarios();
  const {modoOscuro} = usePalette();
  const trabajadores = Trabajadores(veterinarios);
  const cantidadHistorias = useHistorias().historias.length;
  const cantidadPacientes = usePacientes().pacientes.length;

  const articleClase = `${modoOscuro ? 'bg-card':'bg-slate-100 shadow-lg shadow-slate-300'} rounded-[10px]  p-5 max-h-[200px] md:h-[180px]`;
  return (
    <>
      <div className="text-center md:text-left md:px-16">
        <h2 className={`${modoOscuro ? 'text-gray-300' : 'text-black'}`}>
          Bienvenido de vuelta,
          <span className="font-bold"> {info.veterinario.nombre}!!</span>
        </h2>
        <p className="text-zinc-500 text-[12px]">
          Tu Admin Dashboard, vuelve y explora la información de tu veterinaria
        </p>
      </div>
      <div className="mt-10 grid md:grid-cols-2 gap-2">
        <article className={articleClase}>
          <div>
            <p className={`text-zinc-600 text-[12px] `}>Estadistica</p>
            <p className={`${modoOscuro ? 'text-white' : 'text-black'} text-[14px]`}>Veterinarios</p>
          </div>
          <div>
            <p className="text-[2.5rem] text-center text-blue-500">
              {trabajadores.VETERINARIOS.cantidad}
            </p>
          </div>
        </article>

        <article className={articleClase}>
          <div>
            <p className={`text-zinc-600 text-[12px] `}>Estadistica</p>
            <p className={`${modoOscuro ? 'text-white' : 'text-black'} text-[14px]`}>Auxiliares</p>
          </div>
          <div>
            <p className="text-[2.5rem] text-center text-blue-500">
              {trabajadores.AUXILIARES.cantidad}
            </p>
          </div>
        </article>

        <article className={articleClase}>
          <div>
            <p className={`text-zinc-600 text-[12px] `}>Estadistica</p>
            <p className={`${modoOscuro ? 'text-white' : 'text-black'} text-[14px]`}>Pacientes</p>
          </div>
          <div>
            <p className="text-[2.5rem] text-center text-blue-500">
              {cantidadPacientes}
            </p>
          </div>
        </article>

        <article className={articleClase}>
          <div>
            <p className={`text-zinc-600 text-[12px] `}>Estadistica</p>
            <p className={`${modoOscuro ? 'text-white' : 'text-black'} text-[14px]`}>Hisotorias Clínicas</p>
          </div>
          <div>
            <p className="text-[2.5rem] text-center text-blue-500">
              {cantidadHistorias}
            </p>
          </div>
        </article>
      </div>
    </>
  );
};

export default Dashboard;
