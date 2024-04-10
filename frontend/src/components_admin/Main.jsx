//MAIN ADMIN-DASHBOARD
import useAuth from "../hooks/useAuth";
import { ROLES, Trabajadores } from "../helpers/helpers.js";

const Main = () => {
  const { auth } = useAuth();
  const { info } = auth;
  console.log(auth);
  //Me trae los trabajadores
  const trabajadores = Trabajadores(auth.trabajadores.trabajadores);

  //Pacientes
  const cantidadPacientes = auth.pacientes.length;
  //Gistorias
  const cantidadHistorias = auth.historias.length;
  //cantidad trabajadores
  console.log(trabajadores);
  return (
    <main className="p-3 flex items-center w-full pt-[5rem]">
      <section className="bg-gradient-to-t from-black to-gray-900 h-full rounded-xl w-full p-5 py-7">
        <div className="text-center md:text-left md:px-16">
          <h2 className="text-gray-300">
            Bienvenido de vuelta,
            <span className="font-bold"> {info.veterinario.nombre}!!</span>
          </h2>
          <p className="text-zinc-500 text-[12px]">
            Tu Admin Dashboard, vuelve y explora la información de tu
            veterinaria
          </p>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-2">
          <article className="rounded-[10px] bg-card p-5 max-h-[200px] md:h-[180px]">
            <div>
              <p className="text-[12px] text-zinc-600">Estadistica</p>
              <p className="text-white text-[14px]">Veterinarios</p>
            </div>
            <div>
              <p className="text-[2.5rem] text-center text-blue-500">
                {trabajadores.VETERINARIOS.cantidad}
              </p>
            </div>
          </article>

          <article className="rounded-[10px] bg-card p-5 max-h-[200px] md:h-[180px]">
            <div>
              <p className="text-[12px] text-zinc-600">Estadistica</p>
              <p className="text-white text-[14px]">Auxiliares</p>
            </div>
            <div>
              <p className="text-[2.5rem] text-center text-blue-500">
                {trabajadores.AUXILIARES.cantidad}
              </p>
            </div>
          </article>

          <article className="rounded-[10px] bg-card p-5 max-h-[200px] md:h-[180px]">
            <div>
              <p className="text-[12px] text-zinc-600">Estadistica</p>
              <p className="text-white text-[14px]">Pacientes</p>
            </div>
            <div>
              <p className="text-[2.5rem] text-center text-blue-500">{cantidadPacientes}</p>
            </div>
          </article>

          <article className="rounded-[10px] bg-card p-5 max-h-[200px] md:h-[180px]">
            <div>
              <p className="text-[12px] text-zinc-600">Estadistica</p>
              <p className="text-white text-[14px]">Hisotorias Clínicas</p>
            </div>
            <div>
              <p className="text-[2.5rem] text-center text-blue-500">{cantidadHistorias}</p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Main;
