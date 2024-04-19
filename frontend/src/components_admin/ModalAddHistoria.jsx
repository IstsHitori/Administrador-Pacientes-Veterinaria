/* eslint-disable react/prop-types */

// eslint-disable-next-line react/prop-types, no-unused-vars
const ModalAddHistoria = ({clase,paciente}) => {
    //Paciente
    const {nombre} = paciente;
    //---

    const {backGround,h1} = clase
  return (
    <div className={`${backGround} transition-all rounded-lg p-2 mt-4`}>
        <h1 className={`${h1} text-sm text-center`}>{`Registra una nueva historia clínica para  ${nombre}`}
        </h1>
        <hr className="block mt-3" />

        <form action="">
            
        </form>
    </div>
  )
}

export default ModalAddHistoria