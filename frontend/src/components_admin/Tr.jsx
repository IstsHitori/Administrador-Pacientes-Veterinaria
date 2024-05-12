/* eslint-disable react/prop-types */
import { useState } from "react";
const Tr = ({ clase, contenido, onEstadoChange }) => {
  const { nombre, email, telefono, estado, confirmado, rol, _id } = contenido;
  const [estate] = useState(estado);
  const ESTADO_1 = estate.toString() == "true" ? "Activo" : "Inactivo";
  const ESTADO_2 = (!estate).toString() == "true" ? "Activo" : "Inactivo";
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
          }}
          className={`font-[300] rounded-lg md:p-2 hover:cursor-pointer outline-none ${
            estate === true
              ? "text-[#48FFAF] bg-[#0C1D14]"
              : "text-[#FF3461] bg-[#2C1317]"
          }`}
        >
          <option className={"bg-[#0C1D14] text-[#48FFAF]"} value={estate}>
            {ESTADO_1}
          </option>

          <option className={"bg-[#2C1317] text-[#FF3461]"} value={!estate}>
            {ESTADO_2}
          </option>
        </select>
      </th>
      <th
        className={`font-[300] ${
          confirmado ? "text-[#48FFAF]" : "text-[#FF3461]"
        }`}
      >
        {confirmado ? "Si" : "No"}
      </th>
    </tr>
  );
};

export default Tr;
