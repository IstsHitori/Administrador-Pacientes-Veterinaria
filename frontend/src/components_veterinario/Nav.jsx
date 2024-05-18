//NAV - ADMINISTRADOR
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import usePalette from "../hooks/usePalette";
import useAuth from "../hooks/useAuth";

const Nav = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const { cerrarSesion } = useAuth();
  const { modoOscuro, setModoOscuro } = usePalette();

  //Clasess
  const spanClass = `text-[10px] transition-all opacity-0 invisible group-hover:visible group-hover:delay-100 absolute top-[6px]  ${modoOscuro ? "bg-black text-white" : "bg-white text-black" } px-2 py-1 rounded-lg  group-hover:opacity-100 group-hover:translate-x-[55px] pointer-events-none  z-10 whitespace-nowrap font-semibold`;
  //Fin-calses
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleClick = () => {
    setModoOscuro(modoOscuro ? false : true);
  };

  const linkClass = (path) =>
    `flex items-center justify-center rounded-[10px] py-2 px-2 text-[18px]  transition $ ${
      activePath === path
        ? modoOscuro ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-white  text-black hover:bg-zinc-200"
        : modoOscuro ? "bg-stone-900 hover:bg-stone-950 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"
    }  `;

  return (
    <nav
      className={`${
        modoOscuro ? "bg-black" : "bg-white"
      } relative transition-all`}
    >
      <header className={`${modoOscuro ? "border-zinc-800" : "border-blue-400"}
       border-b-[1.9px]  py-6 px-[.5rem] text-center`}>
        <span className={`${modoOscuro ? "text-white" : "text-black"} text-[.9rem] font-semibold tracking-widest`}>
          APV
        </span>
      </header>
      <ul className="py-5 px-2 flex flex-col gap-8 md:gap-2 ">
        <li className="relative transition-all group">
          <span className={spanClass}>
            Dashboard
          </span>
          <Link
            to={"/veterinario-dashboard"}
            className={linkClass("/veterinario-dashboard")}
          >
            <ion-icon name="grid-outline"></ion-icon>
          </Link>
        </li>

        <li className="relative transition-all group">
          <span className={spanClass}>
            Pacientes
          </span>
          <Link
            to={"/veterinario-dashboard/pacientes"}
            className={linkClass("/veterinario-dashboard/pacientes")}
          >
            <ion-icon name="person-outline"></ion-icon>
          </Link>
        </li>

 

        <li className="relative transition-all group">
          <span className={spanClass}>
            Historias clínicas
          </span>
          <Link
            to={"/veterinario-dashboard/historias"}
            className={linkClass("/veterinario-dashboard/historias")}
          >
            <ion-icon name="copy-outline"></ion-icon>
          </Link>
        </li>

        <li className="relative transition-all group">
          <span className={spanClass}>
            Agregar pacientes
          </span>
          <Link
            to={"/veterinario-dashboard/agregar-historias"}
            className={linkClass("/veterinario-dashboard/agregar-historias")}
          >
            <ion-icon name="duplicate-outline"></ion-icon>
          </Link>
        </li>
      </ul>
      <div className="py-5 px-2 flex flex-col gap-2 absolute bottom-5 md:mt-[1rem]">
        <Link
          to={"/veterinario-dashboard/configuracion"}
          className={`flex items-center justify-center ${modoOscuro ? "bg-stone-900 hover:bg-stone-950" : "bg-blue-600 hover:bg-blue-700"}  rounded-[10px] py-2 px-2 text-[1.3rem] text-white  transition`}
        >
          <ion-icon name="settings-outline"></ion-icon>
        </Link>

        <button
          className={`${
            modoOscuro
              ? " bg-white hover:bg-white"
              : "bg-stone-900 hover:bg-stone-900"
          } flex items-center justify-center p-2 rounded-[10px] transition-all`}
          onClick={handleClick}
        >
          {modoOscuro ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="#000000"
                d="M12 21q-3.75 0-6.375-2.625T3 12t2.625-6.375T12 3q.35 0 .688.025t.662.075q-1.025.725-1.638 1.888T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q1.375 0 2.525-.613T20.9 10.65q.05.325.075.662T21 12q0 3.75-2.625 6.375T12 21"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path
                fill="#ffffff"
                d="M12 21q-3.75 0-6.375-2.625T3 12t2.625-6.375T12 3q.35 0 .688.025t.662.075q-1.025.725-1.638 1.888T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q1.375 0 2.525-.613T20.9 10.65q.05.325.075.662T21 12q0 3.75-2.625 6.375T12 21"
              />
            </svg>
          )}
        </button>

        <button
          onClick={cerrarSesion}
          className={`flex items-center justify-center ${modoOscuro ? "bg-stone-900 hover:bg-stone-950" : "bg-zinc-300 hover:bg-zinc-400"}  rounded-[10px] py-2 px-2 text-[1.3rem] text-red-700  transition`}
        >
          <ion-icon name="log-in-outline"></ion-icon>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
