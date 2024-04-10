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

//Fin-Admin
import AuxiliarDashBoard from "./paginas_auxiliar/AuxiliarDashBoard";
import VeterinarioDashBoard from "./paginas_veterinario/VeterinarioDashBoard";
//Provider
import { AuthProvider } from "../context/AuthProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* AREA PÚBLICA */}
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:TOKEN" element={<NuevoPassword />} />
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
          </Route>

          {/* AREA PRIVADA */}
          <Route path="/admin-dashboard" element={<RutaProtegida />}>
            <Route index element={<AdminDashBoard />} />
            <Route path="/admin-dashboard/empleados" element={<AdminEmpleados />} />
            <Route path="/admin-dashboard/agregar-empleados" element={<AdminAddEmpleados />} />
            <Route path="/admin-dashboard/pacientes" element={<AdminPacientes />} />
            <Route path="/admin-dashboard/agregar-pacientes" element={<AdminAddPacientes />} />
            <Route path="/admin-dashboard/historias" element={<AdminHistorias />} />
            <Route path="/admin-dashboard/agregar-historias" element={<AdminAddHistorias />} />
          </Route>

          <Route path="/auxiliar-dashboard" element={<RutaProtegida />}>
            <Route index element={<AuxiliarDashBoard />} />
          </Route>

          <Route path="/veterinario-dashboard" element={<RutaProtegida />}>
            <Route index element={<VeterinarioDashBoard />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
