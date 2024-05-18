import { useState, useEffect, createContext} from "react";
const PaletteContext = createContext();

const PaleteProvider = ({children}) => {
  
    const [modoOscuro,setModoOscuro] = useState(true);
  return (

    <PaletteContext.Provider
        value={{modoOscuro,setModoOscuro}}
    >
        {children}
    </PaletteContext.Provider>
  )
}

export {PaleteProvider}

export default PaletteContext;