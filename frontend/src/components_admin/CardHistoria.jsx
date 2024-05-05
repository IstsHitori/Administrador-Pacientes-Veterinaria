/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import usePacientes from "../hooks/usePacientes";
import useVeterinarios from "../hooks/useVeterinarios";
import { useState } from "react";
const CardHistoria = ({ HISTORIA }) => {
  const { historia, fecha, paciente, veterinario } = HISTORIA;
  const { pacientes } = usePacientes();
  const { veterinarios } = useVeterinarios();
console.log(HISTORIA)
  const [visible, setVisible] = useState(false);

  //Obtener el nombre del veterinario y paciente
  const nombrePaciente = () => {
    if (pacientes.length < 1) return null;
    return pacientes.filter((p) => p._id === paciente)[0].nombre;
  };
  const documentoPropietario = () => {
    if (pacientes.length < 1) return null;
    return pacientes.filter((p) => p._id === paciente)[0].docPropietario;
  };

  const nombreVeterinario = () => {
    if (veterinarios.length < 1) return null;
    return veterinarios.filter((v) => v._id === veterinario)[0].nombre;
  };
  const handleClick = () => {
    setVisible(visible ? false : true);
  };
  return (
    <div className="bg-black rounded-md  hover:shadow-sm hover:shadow-blue-800 hover:translate-y-[-3px] transition-all">
      <div className="px-4 py-2  flex gap-5 transition-all items-center justify-between ">
        <div className="w-12 h-12 rounded-[8px] bg-blue-600 text-center flex items-center justify-center">
          <p>{nombrePaciente()[0].toUpperCase() + nombrePaciente()[1]}</p>
        </div>

        <div className=" md:mr-[70%] flex flex-col gap-[3px]">
          <p className="text-white md:text-[11px] text-[10px] font-extralight mb-1">
            Fecha: {new Date(fecha).toLocaleString()}
          </p>
          <p className="text-zinc-400 md:text-[11px] text-[9px] flex items-center gap-2">
          <svg className="text-lg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#4063ff" d="M18 13q.425 0 .713-.288T19 12t-.288-.712T18 11h-3q-.425 0-.712.288T14 12t.288.713T15 13zm0-3q.425 0 .713-.288T19 9t-.288-.712T18 8h-3q-.425 0-.712.288T14 9t.288.713T15 10zm-9 3q-.9 0-1.625.163t-1.275.512q-.525.325-.8.738t-.275.887q0 .3.225.5t.55.2h6.4q.325 0 .55-.213t.225-.537q0-.425-.275-.825t-.8-.75q-.55-.35-1.275-.513T9 13m0-1q.825 0 1.412-.587T11 10t-.587-1.412T9 8t-1.412.588T7 10t.588 1.413T9 12m-5 8q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20z"/></svg>
            Doc.Propietario: {documentoPropietario()}
          </p>
          <p className="text-zinc-400 md:text-[11px] text-[9px] flex items-center gap-2">
          <svg className="text-lg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#4063ff" d="m19.5 15.5l-1.425-1.4l1.1-1.1H16v-2h3.15l-1.075-1.075L19.5 8.5L23 12zM2 5V3h12v2zm4.5 12.5h3V15H12v-3H9.5V9.5h-3V12H4v3h2.5zM1 21V6h14v15z"/></svg>
            Paciente: {nombrePaciente()}
          </p>
          <p className="text-white md:text-[11px] font-semibold text-[9px] flex items-center gap-2">
          <svg className="text-lg" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 11 11"><path d="M5.5 4.32a2.2 2.2 0 0 0-2.14 2.46a4.4 4.4 0 0 0-1.21.63a1.42 1.42 0 0 0-.29 2a1.48 1.48 0 0 0 2 .28a2.89 2.89 0 0 1 1.64-.52a2.89 2.89 0 0 1 1.64.49c.6.495 1.49.41 1.985-.191l.015-.019a1.35 1.35 0 0 0-.21-2l-.08-.04a6.4 6.4 0 0 0-1.21-.63A2.2 2.2 0 0 0 5.5 4.32zm-3.87-1.2a1.11 1.11 0 0 0-.55 1.44a1.08 1.08 0 0 0 1.15 1a1.11 1.11 0 0 0 .55-1.44a1.08 1.08 0 0 0-1.15-1zm7.74 0c.541.254.784.89.55 1.44a1.08 1.08 0 0 1-1.15 1a1.11 1.11 0 0 1-.55-1.44a1.08 1.08 0 0 1 1.15-1zM3.77 1a1 1 0 0 0-.55 1.32a1.26 1.26 0 0 0 1.16 1.09a1 1 0 0 0 .558-1.3l-.008-.02A1.26 1.26 0 0 0 3.77 1zm3.46 0a1 1 0 0 1 .558 1.3l-.008.02a1.26 1.26 0 0 1-1.16 1.09a1 1 0 0 1-.559-1.3l.009-.02A1.26 1.26 0 0 1 7.23 1z" fill="#4063ff"/></svg>
            Veterinario: {nombreVeterinario()}
          </p>
        </div>

        <button
          className="p-2 bg-zinc-800 hover:bg-zinc-900 rounded-md outline-none"
          onClick={handleClick}
        >
          <svg
            className="text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m12 13.171l4.95-4.95l1.414 1.415L12 16L5.636 9.636L7.05 8.222z"
            />
          </svg>
        </button>
      </div>
      {visible ? (
        <div className="text-white rounded-sm p-2">
          <h1 className="md:text-[13px] text-[10px] text-center before:content-[''] md:before:w-[43%] before:w-[30%] before:h-1 before:rounded-lg block before:absolute before:left-0 before:bg-blue-600 before:bottom-[7px] after:content-[''] md:after:w-[43%] after:w-[30%] after:h-1 after:rounded-lg relative after:absolute after:right-0 after:bg-blue-600 after:bottom-[7px]">
            Historia Clínica
          </h1>
          <textarea
            disabled
            defaultValue={historia}
            className="w-[100%] p-2 h-[150px] outline-none md:text-[13px] text-[11px] rounded-md mt-2 bg-gray-800"
          >
            
          </textarea>
        </div>
      ) : null}
    </div>
  );
};

export default CardHistoria;
