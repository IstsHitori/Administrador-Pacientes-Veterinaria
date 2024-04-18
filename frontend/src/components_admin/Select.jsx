/* eslint-disable react/prop-types */

const Select = ({ clase, data, setVeterinario }) => {
  const { VETERINARIOS } = data;
  const veterinarios = VETERINARIOS.veterinarios;
  return (
    <select onChange={e => {setVeterinario(e.target.value)}} className={clase}>
      <option defaultChecked value={""}>Elija el veterinario</option>
      {veterinarios.map((veterinario) => {
        if (veterinario.confirmado === true && veterinario.estado === true) {
          return (
            <option value={veterinario._id} key={veterinario._id}>{veterinario.nombre}</option>
          )
        }
      })}
    </select>
  );
};

export default Select;
