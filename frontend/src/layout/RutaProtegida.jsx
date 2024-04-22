import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  console.log(auth);
  if(cargando) return "";
  return (
    <div className="min-h-screen bg-gradient-to-t from-black to-blue-950 flex">
      {auth?.info?.veterinario?._id ? (<Outlet />) : <Navigate to="/" />}

    </div>
  );
};

export default RutaProtegida;
