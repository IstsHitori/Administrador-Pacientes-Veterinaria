//MAIN ADMIN-DASHBOARD
import useAuth from "../hooks/useAuth";
import { ROLES, Trabajadores } from "../helpers/helpers.js";
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

//--
import clienteAxios from "../config/axios.jsx";

//--Use
import useVeterinarios from "../hooks/useVeterinarios.jsx";
import useHistorias from "../hooks/useHistorias.jsx";
import usePacientes from "../hooks/usePacientes.jsx";

const Main = () => {
  //
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const { auth } = useAuth();
  const { info } = auth;

  const { veterinarios } = useVeterinarios();
  const { historias } = useHistorias();
  const { pacientes } = usePacientes();
  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);
  //Me trae los trabajadores

  return (
    <main className="p-3 flex items-center md:w-full pt-[2rem]">
      <section className="bg-gradient-to-t from-black h-full to-gray-900 rounded-xl md:w-full p-5 py-7">
        {activePath === "/admin-dashboard" ? (
          <Dashboard
            info={info}
            trabajadores={Trabajadores(veterinarios)}
            cantidadHistorias={historias.length}
            cantidadPacientes={pacientes.length}
          />
        ) : (
          ""
        )}
        {activePath === "/admin-dashboard/empleados" ? <Empleados info={info} trabajadores={Trabajadores(veterinarios)}/> : ""}
        {activePath === "/admin-dashboard/agregar-pacientes" ? (
          <AddPacientes id_admin={info.veterinario._id} />
        ) : (
          ""
        )}

        {activePath === "/admin-dashboard/agregar-empleados" ? (
          <AddEmpleados />
        ) : (
          ""
        )}
        {activePath === "/admin-dashboard/pacientes" ? (
          <Pacientes pacientes={pacientes} />
        ) : (
          ""
        )}
        {activePath === "/admin-dashboard/historias" ? <Historias  /> : ""}
        {activePath === "/admin-dashboard/agregar-historias" ? (
          <AddHistorias />
        ) : (
          ""
        )}
      </section>
    </main>
  );
};

export default Main;
