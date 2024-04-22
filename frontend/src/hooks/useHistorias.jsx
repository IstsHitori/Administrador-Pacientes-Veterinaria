import { useContext } from "react";
import HistoriasContext from "../../context/HistoriasProvider";

const useHistorias = () => {
  return useContext(HistoriasContext);
};

export default useHistorias;
