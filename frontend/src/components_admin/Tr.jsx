/* eslint-disable react/prop-types */
import { useState } from "react";
const Tr = ({ clase, contenido, onEstadoChange }) => {
  const { nombre, email, telefono, estado, confirmado, rol, _id } = contenido;
  const [estate, setState] = useState(estado);
  const ESTADO_1 = estate.toString();
  const ESTADO_2 = (!estate).toString();
  return (
    <tr className={clase}>
      <th className="font-[300] md:p-2">{nombre}</th>
      <th className="font-[300] md:p-2">{email}</th>
      <th className="font-[300] md:p-2">{telefono}</th>
      <th className="font-[300] md:p-2">{rol.nombre}</th>
      <th>
        <select
          onChange={ e => onEstadoChange(_id, e.target.value === "true")}
          className={`font-[300] rounded-lg md:p-2 hover:cursor-pointer ${
            estate === true
              ? "text-[#48FFAF] bg-[#0C1D14]"
              : "text-[#FF3461] bg-[#2C1317]"
          }`}
        >
          <option
            className={`${estate ? "bg-[#0C1D14] text-[#48FFAF]" : "bg-[#2C1317] text-[#FF3461]"}`}
            value={estate}
          >
            {ESTADO_1}
          </option>

          <option className={`${estate} ? "bg-[#0C1D14] text-[#48FFAF]" : "bg-[#2C1317] text-[#FF3461]"`} value={!estate}>
            {ESTADO_2}
          </option>
        </select>
      </th>
      <th
        className={`font-[300] md:p-2 ${
          confirmado ? "text-[#48FFAF]" : "text-[#FF3461]"
        } ${confirmado ? "bg-[#0C1D14]" : "bg-[#2C1317]"} rounded-lg`}
      >
        {confirmado ? "Si" : "No"}
      </th>
    </tr>
  );
};

export default Tr;
