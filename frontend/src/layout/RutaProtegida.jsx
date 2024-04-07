import { Outlet } from "react-router-dom";

const RutaProtegida = () => {
  return (
    <>
      <div>RutaProtegida</div>
      <Outlet />
    </>
  );
};

export default RutaProtegida;
