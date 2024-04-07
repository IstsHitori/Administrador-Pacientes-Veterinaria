import { Outlet, Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import Nav from "../components/Nav";
import Main from "../components/Main";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  const {veterinario} = auth;
  return (
    <>
      <Nav />
      <div>RutaProtegida</div>
      {veterinario._id ? <Outlet /> : <Navigate to="/" />}
      <Main />
    </>
  );
};

export default RutaProtegida;
