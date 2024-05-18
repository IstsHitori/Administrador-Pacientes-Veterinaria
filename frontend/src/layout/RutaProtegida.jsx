import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import usePalette from "../hooks/usePalette";
const RutaProtegida = () => {
  const { auth, cargando } = useAuth();
  const {modoOscuro} = usePalette();
  console.log(modoOscuro  )
  if(cargando) return "";
  return (
    <div className={`min-h-screen bg-gradient-to-t ${modoOscuro ? ' from-black to-blue-950' : 'from-white to-blue-600' } flex`}>
      {auth?.info?.veterinario?._id ? (<Outlet />) : <Navigate to="/" />}

    </div>
  );
};

export default RutaProtegida;
