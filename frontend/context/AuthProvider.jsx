import { useState, useEffect, createContext} from "react";
import clienteAxios from "../src/config/axios";
const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) =>{
    const [cargando,setCargando] = useState(true);
    const [auth,setAuth] = useState({});
    useEffect(() =>{
        const autenticarUsuario = async() => {
            const token = localStorage.getItem("token");
            if(!token) {
                setCargando(false);
                return;
            }

            //Configuración del header
            const config = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            try{

                //Información personal
                const info =  (await clienteAxios("/veterinarios/perfil",config)).data;
                //Información sobre sus veterinarios
                const trabajadores = (await clienteAxios("/veterinarios/mostrar-trabajadores",config)).data
            
                setAuth({info,trabajadores})
            }catch(error){
                console.log(error.response.data.msg)
                setAuth({});
            }
            setCargando(false);
        }
        autenticarUsuario();
    },[]);

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando
            }}
        >
            {/*Aquí estarán todos los componentes dentro del AuthProvider de App.jsx */}
            {children}
        </AuthContext.Provider>
    )
}

export{
    AuthProvider
}

export default AuthContext