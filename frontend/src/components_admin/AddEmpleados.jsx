import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import useVeterinarios from "../hooks/useVeterinarios";
import usePalette from "../hooks/usePalette";
const AddEmpleados = () => {
  //-use
  const {guardarVeterinario} = useVeterinarios();
  const {modoOscuro} = usePalette();

  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [repetirContraseña, setRepetirContraseña] = useState("");
  const [rol, setRol] = useState("AUXILIAR_ROL");
  const [alerta, setAlerta] = useState({});

  const formClase = ` ${modoOscuro ? '' : 'bg-slate-100'} p-4 flex mt-2 flex-col gap-4 md:grid md:grid-cols-2 md:content-center md:justify-center`;

  const divClase = `py-2 px-5 ${modoOscuro ? 'bg-gray-800' : 'bg-blue-700'}  flex items-center justify-between rounded-lg`;
  const pClase = `text-[10px] ${modoOscuro ? 'text-gray-500': 'text-white'}`;

  const inputBtnClass = `py-2 px-5 text-center text-white font-semibold ${modoOscuro ? 'bg-blue-600 hover:bg-blue-700' :'bg-stone-900 hover:bg-stone-950'}  rounded-lg hover:cursor-pointer` 
  useEffect(() =>{
    setTimeout(()=> {
      setAlerta({});
    },4000)
  },[alerta.msg])
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [nombre, telefono, correo, contraseña, repetirContraseña, rol].includes(
        ""
      )
    ) {
      setAlerta({ msg: "Hay campos vacíos", error: true });
      return;
    }
    if (contraseña !== repetirContraseña) {
      setAlerta({ msg: "Las contraseñas deben ser iguales", error: true });
      return;
    }
    if (contraseña.length < 6) {
      setAlerta({
        msg: "La contraseña debe tener mínimo 6 caracteres",
        error: true,
      });
      return;
    }
    const empleado = { nombre, telefono, email: correo, password:contraseña, rol };
    const respuesta = await guardarVeterinario(empleado);
    setAlerta({msg:respuesta.msg,error:respuesta.error})

  };
  return (
    <div>
      <div className="text-center md:text-left md:px-16">
        <h2 className={`${modoOscuro ? 'text-gray-300' : 'text-black'}`}>Registra tus trabajadores</h2>
        <p className="text-zinc-500 text-[12px]">
          Registra los trabajadores de tu veterinaria
        </p>
      </div>
      <section className="mt-10 md:max-w-[800px]">

        { alerta.msg && <Alerta alerta={alerta} />}
        <form
          className={formClase}
          action=""
          onSubmit={handleSubmit}
        >
          <div className={divClase}>
            <div>
              <p className={pClase}>Nombre</p>
              <input
                className="outline-none bg-transparent text-[11.5px] text-white md:w-[20rem]"
                type="text"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="person-outline"></ion-icon>
            </span>
          </div>

          <div className={divClase}>
            <div>
              <p className={pClase}>Telefono</p>
              <input
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none bg-transparent text-[11.5px] md:w-[20rem] text-white"
                type="number"
                value={telefono}
                onChange={(e) => {
                  setTelefono(e.target.value);
                }}
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="phone-portrait-outline"></ion-icon>{" "}
            </span>
          </div>

          <div className={divClase}>
            <div>
              <p className={pClase}>Correo</p>
              <input
                className="outline-none bg-transparent md:w-[20rem] text-[11.5px] text-white"
                type="email"
                value={correo}
                onChange={(e) => {
                  setCorreo(e.target.value);
                }}
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="mail-outline"></ion-icon>{" "}
            </span>
          </div>

          <div className={divClase}>
            <div>
              <p className={pClase}>Contraseña</p>
              <input
                className="outline-none bg-transparent md:w-[20rem] text-[11.5px] text-white"
                type="password"
                value={contraseña}
                onChange={(e) => {
                  setContraseña(e.target.value);
                }}
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="medical-outline"></ion-icon>{" "}
            </span>
          </div>

          <div className={divClase}>
            <div>
              <p className={pClase}>Confirmar contraseña</p>
              <input
                className="outline-none bg-transparent md:w-[20rem] text-[11.5px] text-white"
                type="password"
                value={repetirContraseña}
                onChange={(e) => {
                  setRepetirContraseña(e.target.value);
                }}
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="medical-outline"></ion-icon>{" "}
            </span>
          </div>

          <div className={divClase}>
            <div>
              <p className={pClase}>Rol</p>
              <select
                className={`text-[11px] outline-none ${modoOscuro ? 'bg-gray-800 text-white' : 'bg-stone-200 text-black'} `}
                value={rol}
                onChange={(e) => {
                  setRol(e.target.value);
                }}
              >
                <option defaultChecked value="AUXILIAR_ROL">
                  Auxiliar
                </option>
                <option value="VETERINARIO_ROL">Veterinario</option>
              </select>
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="keypad-outline"></ion-icon>{" "}
            </span>
          </div>
          <input
            className={inputBtnClass}
            type="submit"
            value="Enviar"
          />
        </form>
      </section>
    </div>
  );
};

export default AddEmpleados;
