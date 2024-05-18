//MAIN ADMIN-DASHBOARD
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

//------
import Dashboard from "./Dashboard";
import Configuracion from "./Configuracion";
import Pacientes from "./Pacientes";
import Historias from "./Historias";
import AddPacientes from "./AddPacientes";
//--

//--Use
import usePalette from "../hooks/usePalette";

const Main = () => {
  //
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const {modoOscuro} = usePalette();
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);
  //Me trae los trabajadores

  return (
    <main className="p-3 flex items-center md:w-full pt-[2rem]">
      <section className={`bg-gradient-to-t ${modoOscuro ? 'from-black to-gray-900' : 'from-white to-white'}  rounded-xl md:w-full p-5 py-7 h-full`}>
        {activePath === "/auxiliar-dashboard" ? <Dashboard /> : ""}
        {activePath === "/auxiliar-dashboard/configuracion" ? <Configuracion /> : ""}
        {activePath === "/auxiliar-dashboard/pacientes" ? <Pacientes /> : ""}
        {activePath === "/auxiliar-dashboard/historias" ? <Historias /> : ""}
        {activePath === "/auxiliar-dashboard/agregar-pacientes" ? <AddPacientes /> : ""}
      </section>
    </main>
  );
};

export default Main;
