import { Outlet } from "react-router-dom";
import "../paginas/Fonts.css"
const AuthLayout = () => {
  return (
    <>

      {/* Muestra los componentes hijos */}
      <main className="container min-w-full bg-[url('img/conejito4.jpg')]  bg-center bg-cover bg-no-repeat  min-h-screen">
        
        <div className="min-w-full min-h-screen absolute bg-gradient-to-r from-primero to-segundo opacity-70 z-0"></div>
        <div className="min-w-full min-h-screen absolute bg-gradient-to-r from-primero to-segundo opacity-80 z-0 "></div>
        <div className="min-w-full min-h-screen absolute bg-gradient-to-r from-primero to-segundo opacity-60 z-0"></div>
        <div className="relative z-10 text-white overflow-hidden">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default AuthLayout;
