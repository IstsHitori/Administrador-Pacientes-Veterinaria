/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
import useAuth from "../hooks/useAuth";

const Dashboard = () => {
  const { auth } = useAuth();
  const { info } = auth;

  return (
    <>
      <div className="text-center md:text-left md:px-16">
        <h2 className="text-gray-300">
          Bienvenido de vuelta,
          <span className="font-bold"> {info.veterinario.nombre}!!</span>
        </h2>
        <p className="text-zinc-500 text-[12px]">
          Mira tus pacientes, agrega historiales clínicos
        </p>
      </div>
      <div className="mt-10 grid md:grid-cols-2 gap-2">
        <article className="rounded-[10px] font-semibold text-center bg-yellow-300 p-5 max-h-[200px] md:h-[180px]">
          <p className=" my-auto">Recuerda ser amigable con los animales</p>
        </article>
      </div>
    </>
  );
};

export default Dashboard;
