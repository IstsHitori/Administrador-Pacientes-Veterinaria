//NAV - ADMINISTRADOR
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
const Nav = () => {
  const location = useLocation();
  const[activePath,setActivePath] = useState(location.pathname); 

  useEffect(() =>{
    setActivePath(location.pathname);
  },[location]);

  const linkClass = (path) =>
  `flex items-center justify-center rounded-[10px] py-2 px-2 text-[18px] text-white transition ${
    activePath === path ? "bg-blue-500 hover:bg-blue-600" : "bg-stone-900 hover:bg-stone-950"
  }`;

  return (
    <nav className="bg-black">
      <header className="border-b-[1.9px] border-zinc-800 py-6 px-[1rem] text-center">
        <span className="text-white text-[.9rem] font-semibold tracking-widest">
          APV
        </span>
      </header>
      <ul className="py-5 px-4 flex flex-col gap-8 md:gap-2 mt-2">
        <li>
    
          <Link to={"/admin-dashboard"} className={linkClass("/admin-dashboard")} >
            <ion-icon name="grid-outline"></ion-icon>
          </Link>
        </li>

        <li>
          <Link to={"/admin-dashboard/empleados"} className={linkClass("/admin-dashboard/empleados")}>
            <ion-icon name="briefcase-outline"></ion-icon>
          </Link>
        </li>

        <li>
          <Link to={"/admin-dashboard/agregar-empleados"} className={linkClass("/admin-dashboard/agregar-empleados")}>
            <ion-icon name="bag-add-outline"></ion-icon>
          </Link>
        </li>

        <li>
          <Link to={"/admin-dashboard/pacientes"} className={linkClass("/admin-dashboard/pacientes")}>
            <ion-icon name="person-outline"></ion-icon>
          </Link>
        </li>

        <li>
          <Link to={"/admin-dashboard/agregar-pacientes"} className={linkClass("/admin-dashboard/agregar-pacientes")}>
            <ion-icon name="person-add-outline"></ion-icon>
          </Link>
        </li>

        <li>
          <Link to={"/admin-dashboard/historias"} className={linkClass("/admin-dashboard/historias")}>
            <ion-icon name="copy-outline"></ion-icon>
          </Link>
        </li>

        <li>
          <Link to={"/admin-dashboard/agregar-historias"} className={linkClass("/admin-dashboard/agregar-historias")}>
            <ion-icon name="duplicate-outline"></ion-icon>
          </Link>
        </li>
      </ul>
      <div className="py-5 px-4 flex flex-col gap-2 mt-[10rem] md:mt-[4rem]">
        <Link className="flex items-center justify-center bg-stone-900 rounded-[10px] py-2 px-2 text-[1.3rem] text-white hover:bg-stone-950 transition">
          <ion-icon name="settings-outline"></ion-icon>
        </Link>

        <Link className="flex items-center justify-center bg-stone-900 rounded-[10px] py-2 px-2 text-[1.3rem] text-red-700 hover:bg-stone-950 transition">
          <ion-icon name="log-in-outline"></ion-icon>
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
