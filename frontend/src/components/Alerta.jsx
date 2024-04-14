/* eslint-disable react/prop-types */

const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-blue-400 to-blue-600'} bg-gradient-to-br w-full p-3 rounded-xl text-center mt-2`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta