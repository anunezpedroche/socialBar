import React from "react";
import "./Establishments.css";
// Antd

const Establishments = ({establishment}) => {

  

  return (
    <div className="establishmentWorkspace">
        {establishment.nombre}
    </div>
  );
};

export default Establishments;