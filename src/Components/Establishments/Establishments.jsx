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
import { useEffect } from "react";

const {Option} = Select;

const Establishments = ({establishment}) => {

  const [showTableForm,setShowTableForm] = useState(false);
  const [idCard,setIdCard] = useState();
  const [idTable,setIdTable] = useState();
  const gridStyle = {
    width: '25%',
    textAlign: 'center',
  };

  useEffect(()=>{
    if(!establishment.cartas[0]){
      setIdCard("noCards");
    }else{
      setIdCard(establishment.cartas[0].id);
    }
  },[]);

  return (
    <div className="establishmentWorkspace">

    <Select defaultValue={idCard} style={{ width: 120 }} onChange={(e)=>{setIdCard(e)}}>
      {establishment.cartas.map((carta)=>{return(
        <Option value={carta.id} key={carta.id}>{carta.nombre}</Option>
      )})}
      </Select>
    <Card title={establishment.nombre}>    
    


      {establishment.mesas.map((mesa)=>{
return(
        <Card.Grid key={mesa.id.toString()} onClick={()=>{setIdTable(mesa.id);setShowTableForm(!showTableForm);}} style={gridStyle}>Mesa {mesa.id} </Card.Grid>
)
      })}
                  <Modal
          title={"QR de mesa "+idTable}
          visible={showTableForm}
          destroyOnClose={true}
          onOk={() => {
            
            setShowTableForm(!showTableForm);
          }}
          onCancel={() => {
            setShowTableForm(!showTableForm);
          }}
          width={175}
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