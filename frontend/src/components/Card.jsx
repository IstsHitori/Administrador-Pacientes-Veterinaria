/* eslint-disable react/prop-types */
import usePalette from "../hooks/usePalette";
const Card = ({ info, setModal }) => {
  const { nombre, docPropietario} = info;
  const {modoOscuro} = usePalette();
  const handleClick  = async() => {
    setModal({data:info, activo: true});
  }
  const articleClass = `${modoOscuro ? 'from-zinc-950 to-black' : 'from-white to-white shadow-lg shadow-slate-300'} flex max-h-[250px] md:max-h-[200px] flex-col gap-2 p-4 bg-gradient-to-t  rounded-xl cursor-pointer transition-all hover:scale-95 transition-all `;
  const pClass = `${modoOscuro ? 'text-blue-400' : 'text-slate-800' } font-semibold text-[13px]`
  const spanClass = `${modoOscuro ? 'text-white' :'text-black'} font-normal`
  const buttonClass = `${modoOscuro ? 'text-blue-600' : 'text-white'} px-6 md:mt-0  mt-5 py-3  transition-all hover:bg-zinc-950 bg-black rounded-lg text-[12px]`
  
  return (
    <article className={articleClass}>
      <div className={`rounded-[50%]  w-14 h-14 flex items-center justify-center text-lg text-zinc-950 ${info.estado ? "bg-blue-500" : "bg-red-500"} font-bold`}>
        {nombre[0] + nombre[1]}
      </div>
      <p className={pClass}>
        Doc. Propietario: <span className={spanClass} >{docPropietario}</span>
      </p>
      <p className={pClass}> 
        Nombre del paciente: <span className={spanClass}>{nombre}</span>
      </p>
      <div className="flex items-center justify-center">
        <button className={buttonClass} onClick={handleClick}>
          Ver información completa
        </button>
      </div>
    </article>
  );
};

export default Card;
