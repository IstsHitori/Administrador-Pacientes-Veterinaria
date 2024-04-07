import { useContext,  } from "react";
import AuthContext from "../../context/AuthProvider";

const useAuth = () => {
  //Use context para acceder a los valores del context
  return useContext(AuthContext);
}

export default useAuth