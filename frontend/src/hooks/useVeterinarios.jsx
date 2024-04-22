import { useContext } from "react";
import VeterinariosContext from "../../context/VeterinariosProvider";

const useVeterinarios = () => {
    return useContext(VeterinariosContext);
}

export default useVeterinarios;