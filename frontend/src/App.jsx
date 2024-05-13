import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";

import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import OlvidePassword from "./paginas/OlvidePassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import NuevoPassword from "./paginas/NuevoPassword";

//Admin
import AdminDashBoard from "./paginas_admin/AdminDashBoard";
import AdminEmpleados from "./paginas_admin/AdminEmpleados";
import AdminAddEmpleados from "./paginas_admin/AdminAddEmpleados";
import AdminAddPacientes from "./paginas_admin/AdminAddPacientes";
import AdminPacientes from "./paginas_admin/AdminPacientes";
import AdminHistorias from "./paginas_admin/AdminHistorias";
import AdminAddHistorias from "./paginas_admin/AdminAddHistorias";
import AdminConfiguracion from "./paginas_admin/AdminConfiguracion";
//Fin-Admin

//Veterinario
import VeterinarioConfiguración from "./paginas_veterinario/VeterinarioConfiguración";
import VeterinarioAddHistorias from "./paginas_veterinario/VeterinarioAddHistorias";
import VeterinarioHistorias from "./paginas_veterinario/VeterinarioHistorias";
import VeterinarioPacientes from "./paginas_veterinario/VeterinarioPacientes";
//Fin-veterinario

//Auxiliar
import AuxiliarDashBoard from "./paginas_auxiliar/AuxiliarDashBoard";
import AuxiliarAddPacientes from "./paginas_auxiliar/AuxiliarAddPacientes";
import AuxiliarHistorias from "./paginas_auxiliar/AuxiliarHistorias";
import AuxiliarPacientes from "./paginas_auxiliar/AuxiliarPacientes";
import AuxiliarConfiguracion from "./paginas_auxiliar/AuxiliarConfiguracion";
//Fin-auxiliar

import VeterinarioDashBoard from "./paginas_veterinario/VeterinarioDashBoard";
//Provider
import { AuthProvider } from "../context/AuthProvider";
import { PacientesProvider } from "../context/PacientesProvider";
import { VeterinariosProvider } from "../context/VeterinariosProvider";
import { HistoriasProvider } from "../context/HistoriasProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <VeterinariosProvider>
            <HistoriasProvider>
              <Routes>
                {/* AREA PÚBLICA */}
                <Route path="/" element={<AuthLayout />}>
                  <Route index element={<Login />} />
                  <Route path="registrar" element={<Registrar />} />
                  <Route path="olvide-password" element={<OlvidePassword />} />
                  <Route
                    path="olvide-password/:TOKEN"
                    element={<NuevoPassword />}
                  />
                  <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
                </Route>

                {/* AREA PRIVADA */}
                <Route path="/admin-dashboard" element={<RutaProtegida />}>
                  <Route index element={<AdminDashBoard />} />
                  <Route
                    path="/admin-dashboard/empleados"
                    element={<AdminEmpleados />}
                  />
                  <Route
                    path="/admin-dashboard/agregar-empleados"
                    element={<AdminAddEmpleados />}
                  />
                  <Route
                    path="/admin-dashboard/pacientes"
                    element={<AdminPacientes />}
                  />
                  <Route
                    path="/admin-dashboard/agregar-pacientes"
                    element={<AdminAddPacientes />}
                  />
                  <Route
                    path="/admin-dashboard/historias"
                    element={<AdminHistorias />}
                  />
                  <Route
                    path="/admin-dashboard/agregar-historias"
                    element={<AdminAddHistorias />}
                  />
                  <Route
                    path="/admin-dashboard/configuracion"
                    element={<AdminConfiguracion />}
                  />
                </Route>

                <Route path="/auxiliar-dashboard" element={<RutaProtegida />}>
                  <Route
                    path="/auxiliar-dashboard/pacientes"
                    element={<AuxiliarPacientes />}
                  />
                  <Route
                    path="/auxiliar-dashboard/agregar-pacientes"
                    element={<AuxiliarAddPacientes />}
                  />
                  <Route
                    path="/auxiliar-dashboard/historias"
                    element={<AuxiliarHistorias />}
                  />
                  <Route
                    path="/auxiliar-dashboard/configuracion"
                    element={<AuxiliarConfiguracion />}
                  />
                  <Route index element={<AuxiliarDashBoard />} />
                </Route>

                <Route
                  path="/veterinario-dashboard"
                  element={<RutaProtegida />}
                >
                  <Route
                    path="/veterinario-dashboard/pacientes"
                    element={<VeterinarioPacientes />}
                  />
                  <Route
                    path="/veterinario-dashboard/agregar-historias"
                    element={<VeterinarioAddHistorias />}
                  />

                  <Route
                    path="/veterinario-dashboard/historias"
                    element={<VeterinarioHistorias />}
                  />
                  <Route
                    path="/veterinario-dashboard/configuracion"
                    element={<VeterinarioConfiguración />}
                  />
                  <Route index element={<VeterinarioDashBoard />} />
                </Route>
              </Routes>
            </HistoriasProvider>
          </VeterinariosProvider>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
