import { useContext } from "react";
import PaletteContext from "../../context/PaletteProvider";

const usePalette = () => {
  return useContext(PaletteContext);
};

export default usePalette;
