import React,{useState} from "react";
import "./Establishments.css";
// Antd
import { Card, Modal, Select } from 'antd';

import { connect } from "react-redux";
import { readAllEstablishments, readEstablishment} from "../../Redux/Reducers/EstablishmentReducer";
import {
  getAllEstablishments,
  selectedEstablishment,
} from "../../Redux/Actions/EstablishmentActions";

import TableForm from '../TableForm/TableForm';

const {Option} = Select;

const Establishments = ({establishment}) => {

  const [showTableForm,setShowTableForm] = useState(false);
  const [idCard,setIdCard] = useState();
  const [idTable,setIdTable] = useState();
  const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };


  return (
    <div className="establishmentWorkspace">


    <Card title={establishment.nombre}>    
    
      <Select defaultValue={1} style={{ width: 120 }} onChange={(e)=>{setIdCard(e)}}>
      {establishment.cartas.map((carta)=>{return(
        <Option value={carta.id}>{carta.nombre}</Option>
      )})}
      </Select>

      {establishment.mesas.map((mesa)=>{
return(
        <Card.Grid key={mesa.id.toString()} onClick={()=>{setIdTable(mesa.id);setShowTableForm(!showTableForm);}} style={gridStyle}>Mesa {mesa.id} </Card.Grid>
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
          <TableForm idCard={idCard} idTable={idTable}/>
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