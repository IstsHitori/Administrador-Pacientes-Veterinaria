//MAIN ADMIN-DASHBOARD
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

//------
import Dashboard from "./Dashboard";
import Configuracion from "./Configuracion";
import Pacientes from "./Pacientes";
import Historias from "./Historias";
import AddHistorias from "./AddHistorias";
//--

//--Use


const Main = () => {
  //
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);
  //Me trae los trabajadores

  return (
    <main className="p-3 flex items-center md:w-full pt-[2rem]">
      <section className="bg-gradient-to-t from-black h-full to-gray-900 rounded-xl md:w-full p-5 py-7">
        {activePath === "/veterinario-dashboard" ? <Dashboard /> : ""}
        {activePath === "/veterinario-dashboard/configuracion" ? <Configuracion /> : ""}
        {activePath === "/veterinario-dashboard/pacientes" ? <Pacientes /> : ""}
        {activePath === "/veterinario-dashboard/historias" ? <Historias /> : ""}
        {activePath === "/veterinario-dashboard/agregar-historias" ? <AddHistorias /> : ""}
      </section>
    </main>
  );
};

export default Main;
