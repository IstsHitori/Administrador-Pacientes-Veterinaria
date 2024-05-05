/* eslint-disable react/prop-types */

const Input = ({
  value,
  setValue,
  claseDiv,
  claseInput,
  valueP,
  claseP,
  name,
  claseSpan,
  editable,
  tipo,
}) => {
  return (
    <>
      {editable ? (
        <div className={claseDiv}>
          <div>
            <p className={claseP}>{valueP}</p>
            <input
              className={claseInput}
              type={tipo}
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
          </div>
          <span className={claseSpan}>
            <ion-icon name={name}></ion-icon>
          </span>
        </div>
      ) : (
        <div className={claseDiv}>
          <div>
            <p className={claseP}>{valueP}</p>
            <input disabled className={claseInput} type={tipo} value={value} />
          </div>
          <span className={claseSpan}>
            <ion-icon name={name}></ion-icon>
          </span>
        </div>
      )}
    </>
  );
};

export default Input;
