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

const Main = () => {
  //
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

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
    <main className="p-3 flex items-center md:w-full pt-[2rem]">
      <section className="bg-gradient-to-t from-black  h-full to-gray-900 rounded-xl md:w-full p-5 py-7">
        {activePath === "/admin-dashboard" ? (
          <Dashboard
            info={info}
            trabajadores={trabajadores}
            cantidadHistorias={cantidadHistorias}
            cantidadPacientes={cantidadPacientes}
          />
        ) : (
          ""
        )}

        {activePath === "/admin-dashboard/empleados" ? <Empleados info={info} trabajadores={trabajadores}/> : ""}

        {activePath === "/admin-dashboard/agregar-empleados" ? (
          <AddEmpleados />
        ) : (
          ""
        )}
        {activePath === "/admin-dashboard/pacientes" ? <Pacientes pacientes={auth.pacientes} /> : ""}
        {activePath === "/admin-dashboard/agregar-pacientes" ? (
          <AddPacientes trabajadores={trabajadores} id_admin={info.veterinario._id} />
        ) : (
          ""
        )}
        {activePath === "/admin-dashboard/historias" ? <Historias /> : ""}
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
