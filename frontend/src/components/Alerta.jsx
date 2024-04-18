/* eslint-disable react/prop-types */


const Alerta = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error ? "from-red-500 to-red-600 border-red-400" : "from-blue-500 to-blue-600 border-blue-400"
      } bg-gradient-to-br p-3 rounded-xl text-center mt-2 h-[45px] w-full transition-all  border text-white`}
    >
      <svg
        className="flex-shrink-0 inline w-4 h-4 me-3"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>
      {alerta.msg}
    </div>
  );
};

export default Alerta;
