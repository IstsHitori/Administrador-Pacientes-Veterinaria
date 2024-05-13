//NAV - ADMINISTRADOR
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import useAuth from "../hooks/useAuth";
const Nav = () => {
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const { cerrarSesion } = useAuth();

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const linkClass = (path) =>
    `flex items-center justify-center rounded-[10px] py-2 px-2 text-[18px] text-white transition ${
      activePath === path
        ? "bg-blue-500 hover:bg-blue-600"
        : "bg-stone-900 hover:bg-stone-950"
    }`;

  return (
    <nav className="bg-black relative">
      <header className="border-b-[1.9px] border-zinc-800 py-6 px-[.5rem] text-center">
        <span className="text-white text-[.9rem] font-semibold tracking-widest">
          APV
        </span>
      </header>
      <ul className="py-5 px-2 flex flex-col gap-8 md:gap-2 ">
        <li className="relative transition-all group">
          <span className="text-[10px] transition-all opacity-0 invisible group-hover:visible group-hover:delay-100 absolute top-[6px]  bg-black px-2 py-1 rounded-lg text-white group-hover:opacity-100 group-hover:translate-x-[55px] pointer-events-none  z-10 whitespace-nowrap">
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
          <span className="text-[10px] transition-all opacity-0 invisible group-hover:visible group-hover:delay-100 absolute top-[6px]  bg-black px-2 py-1 rounded-lg text-white group-hover:opacity-100 group-hover:translate-x-[55px] pointer-events-none  z-10 whitespace-nowrap">
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
          <span className="text-[10px] transition-all opacity-0 invisible group-hover:visible group-hover:delay-100 absolute top-[6px]  bg-black px-2 py-1 rounded-lg text-white group-hover:opacity-100 group-hover:translate-x-[55px] pointer-events-none  z-10 whitespace-nowrap">
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
          <span className="text-[10px] transition-all opacity-0 invisible group-hover:visible group-hover:delay-100 absolute top-[6px]  bg-black px-2 whitespace-nowrap py-1 rounded-lg text-white group-hover:opacity-100 group-hover:translate-x-[55px] pointer-events-none z-10">
            Registrar historias clínicas
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
          className="flex items-center justify-center bg-stone-900 rounded-[10px] py-2 px-2 text-[1.3rem] text-white hover:bg-stone-950 transition"
        >
          <ion-icon name="settings-outline"></ion-icon>
        </Link>

        <button
          onClick={cerrarSesion}
          className="flex items-center justify-center bg-stone-900 rounded-[10px] py-2 px-2 text-[1.3rem] text-red-700 hover:bg-stone-950 transition"
        >
          <ion-icon name="log-in-outline"></ion-icon>
        </button>
      </div>
    </nav>
  );
};

export default Nav;
