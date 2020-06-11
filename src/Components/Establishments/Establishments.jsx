import React,{useState} from "react";
import "./Establishments.css";
// Antd
import { Card, Modal } from 'antd';

import { connect } from "react-redux";
import { readAllEstablishments, readEstablishment} from "../../Redux/Reducers/EstablishmentReducer";
import {
  getAllEstablishments,
  selectedEstablishment,
} from "../../Redux/Actions/EstablishmentActions";

import TableForm from '../TableForm/TableForm';
const Establishments = ({establishment}) => {

  const [showTableForm,setShowTableForm] = useState(false);
  
  const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

  return (
    <div className="establishmentWorkspace">


    <Card title={establishment.nombre}>
      {establishment.mesas.map((mesa)=>{
return(
        <Card.Grid key={mesa.id.toString()} onClick={()=>{setShowTableForm(!showTableForm)}} style={gridStyle}>Mesa {mesa.id} </Card.Grid>
)
      })}
                  <Modal
          title="Añadir platos a la carta"
          visible={showTableForm}
          okText="Guardar y salir"
          destroyOnClose={true}
          onOk={() => {
            console.log("hola")
          }}
          cancelText="Cancelar"
          onCancel={() => {
            setShowTableForm(!showTableForm);
          }}
          width={1000}
        >
          <TableForm/>
        </Modal>
    </Card>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { establishments: readAllEstablishments(state), establishment: readEstablishment(state)};
};

export default connect(mapStateToProps, {
  getAllEstablishments,
  selectedEstablishment,
})(Establishments);