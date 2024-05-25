/* eslint-disable react/prop-types */
import { useState } from "react";
import usePalette from "../hooks/usePalette";
const Tr = ({ clase, contenido, onEstadoChange }) => {
  const { nombre, email, telefono, estado, confirmado, rol, _id } = contenido;
  const [estate,setState] = useState(estado);

  const {modoOscuro} = usePalette();
  return (
    <tr className={clase}>
      <th className="font-[300] md:p-2">{nombre}</th>
      <th className="font-[300] md:p-2">{email}</th>
      <th className="font-[300] md:p-2">{telefono}</th>
      <th className="font-[300] md:p-2">
        {rol.nombre === "AUXILIAR_ROL" ? "Auxiliar" : "Veterinario"}
      </th>
      <th>
        <select
          onChange={(e) => {
            onEstadoChange(_id, e.target.value === "true");
            setState(e.target.value === "true");
            console.log(estate)
          }}
          className={`font-[300] rounded-lg md:p-2 hover:cursor-pointer outline-none ${
            estate === true
              ? "text-[#48FFAF] bg-[#0C1D14]"
              : "text-[#FF3461] bg-[#2C1317]"
          }`}
          value={estate}
        >
          <option className={"bg-[#0C1D14] text-[#48FFAF]"} value={true}>
            {"Activo"}
          </option>

          <option className={"bg-[#2C1317] text-[#FF3461]"} value={false}>
            {"Inactivo"}
          </option>
        </select>
      </th>
      <th
        className={`font-[300] ${
          confirmado ? "text-[#48FFAF]" : "text-[#FF3461]"
        } ${modoOscuro ? 'p-0' : `${confirmado ? 'bg-green-300 text-green-800' : 'bg-red-200 text-red-800'}`}`}
      >
        {confirmado ? "Si" : "No"}
      </th>
    </tr>
  );
};

export default Tr;
