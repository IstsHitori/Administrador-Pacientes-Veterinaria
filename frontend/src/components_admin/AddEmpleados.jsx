const AddEmpleados = () => {
  return (
    <div>
      <div className="text-center md:text-left md:px-16">
        <h2 className="text-gray-300">Registra tus trabajadores</h2>
        <p className="text-zinc-500 text-[12px]">
          Registra los trabajadores de tu veterinaria
        </p>
      </div>
      <section className="mt-10 md:max-w-[800px]">
        <form
          className="flex flex-col gap-4 md:grid md:grid-cols-2 md:content-center md:justify-center"
          action=""
        >
          <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
            <div>
              <p className="text-[10px] text-gray-500">Nombre</p>
              <input
                className="outline-none bg-transparent text-[11.5px] text-white"
                type="text"
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="person-outline"></ion-icon>
            </span>
          </div>

          <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
            <div>
              <p className="text-[10px] text-gray-500">Telefono</p>
              <input
                className="appearance-none focus:outline-none bg-transparent text-[11.5px] text-white"
                type="number"
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="phone-portrait-outline"></ion-icon>{" "}
            </span>
          </div>

          <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
            <div>
              <p className="text-[10px] text-gray-500">Correo</p>
              <input
                className="outline-none bg-transparent text-[11.5px] text-white"
                type="email"
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="keypad-outline"></ion-icon>{" "}
            </span>
          </div>

          <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
            <div>
              <p className="text-[10px] text-gray-500">Contraseña</p>
              <input
                className="outline-none bg-transparent text-[11.5px] text-white"
                type="password"
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="medical-outline"></ion-icon>{" "}
            </span>
          </div>

          <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
            <div>
              <p className="text-[10px] text-gray-500">Confirmar contraseña</p>
              <input
                className="outline-none bg-transparent text-[11.5px] text-white"
                type="password"
              />
            </div>
            <span className="flex items-center justify-center text-gray-400">
              <ion-icon name="medical-outline"></ion-icon>{" "}
            </span>
          </div>

          <div className="py-2 px-5 bg-gray-800 flex items-center justify-between rounded-lg">
            <div>
              <p className="text-[10px] text-gray-500">Rol</p>
              <select className="text-[11px] outline-none bg-gray-800 text-white">
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
            className="Registrar Empleado py-2 px-5 text-center text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg hover:cursor-pointer"
            type="submit"
            value="Enviar"
          />
        </form>
      </section>
    </div>
  );
};

export default AddEmpleados;
