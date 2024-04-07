import { useState, useEffect, createContext} from "react";
import clienteAxios from "../src/config/axios";
const AuthContext = createContext();

const AuthProvider = ({children}) =>{
    const [cargando,setCargando] = useState(true);
    const [auth,setAuth] = useState({});
    useEffect(() =>{
        const autenticarUsuario = async() => {
            const token = localStorage.getItem("token");
            console.log("token:", token)
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
                const {data} = await clienteAxios("/veterinarios/perfil",config);
                setAuth(data)
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