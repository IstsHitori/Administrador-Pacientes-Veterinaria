/* eslint-disable react/prop-types */

const Th = ({ clase, contenido }) => {
  return (
    <>
      <th className={clase}>{contenido}</th>
    </>
  );
};

export default Th;
