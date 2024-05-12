//MAIN ADMIN-DASHBOARD
import useAuth from "../hooks/useAuth";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

//------
import Empleados from "./Empleados.jsx";
import Dashboard from "./Dashboard.jsx";
import AddEmpleados from "./AddEmpleados.jsx";
import Pacientes from "./Pacientes.jsx";
import AddPacientes from "./AddPacientes.jsx";
import Historias from "./Historias.jsx";
import AddHistorias from "./AddHistorias.jsx";
import Configuracion from "./Configuracion.jsx";
//--

//--Use
import useVeterinarios from "../hooks/useVeterinarios.jsx";
import useHistorias from "../hooks/useHistorias.jsx";
import usePacientes from "../hooks/usePacientes.jsx";

const Main = () => {
  //
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const { pacientes } = usePacientes();
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);
  //Me trae los trabajadores

  return (
    <main className="p-3 flex items-center md:w-full pt-[2rem]">
      <section className="bg-gradient-to-t from-black h-full to-gray-900 rounded-xl md:w-full p-5 py-7">
        {activePath === "/admin-dashboard" ? <Dashboard /> : ""}
        {activePath === "/admin-dashboard/empleados" ? <Empleados /> : ""}
        {activePath === "/admin-dashboard/agregar-pacientes" ? (
          <AddPacientes />
        ) : (
          ""
        )}

        {activePath === "/admin-dashboard/agregar-empleados" ? (
          <AddEmpleados />
        ) : (
          ""
        )}
        {activePath === "/admin-dashboard/pacientes" ? <Pacientes /> : ""}
        {activePath === "/admin-dashboard/historias" ? <Historias /> : ""}
        {activePath === "/admin-dashboard/agregar-historias" ? (
          <AddHistorias />
        ) : (
          ""
        )}

        {activePath === "/admin-dashboard/configuracion" ? (
          <Configuracion />
        ) : (
          ""
        )}
      </section>
    </main>
  );
};

export default Main;
