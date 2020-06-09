import React,{useCallback, useEffect, useState} from "react";
import "./DishesGrid.css";
import Http from '../../Helpers/Http';
import DishForm from '../DishForm/DishForm';
// Antd
import { Carousel } from "antd";
import Nav from '../Nav/Nav';
import { Layout } from 'antd';
import { Card, Modal } from 'antd';
import { connect } from "react-redux";
import { readAllDishes } from "../../Redux/Reducers/DishesReducer";
import { getAllDishes } from "../../Redux/Actions/DishesActions";


const {Meta} = Card;
const gridStyle = {
  width: '25%',
  textAlign: 'center',
};
const { Header, Footer, Sider, Content } = Layout;

const DishesGrid = ({dishes, getAllDishes}) => {

  const [loading,setLoading] = useState(false);
  const [showDishForm,setShowDishForm] = useState(false);

  const replenishDishes = useCallback(async () => {
    const dataSource = await Http.get(
      "/api/dishes/allDishes"
    );
    
    dataSource.unshift({
      id:"add",
      nombre: "Añadir plato",
      imagen: "add.jpg",
      descripcion: "Dar de alta un nuevo plato"
    });

    getAllDishes(dataSource);
    dataSource.map(item =>{
      
      const icon = require(`../../img/dishes/${item.imagen}`);
      item.icon = icon;
    });
    setLoading(true);
  }, []);

  useEffect(()=>{
    replenishDishes();
  },[])

  return (
    <div className="platosContainer">
    {loading?     dishes.map((dish)=>{

      return(
        (dish.id==="add")? 
        <Card
      className="platos"
      key={dish.id}
      style={{ width: 240 }}
      onClick={()=>{setShowDishForm(!showDishForm);}}
      cover={<img alt="example" src={dish.icon} />}
    >
      <Meta title={dish.nombre} description={dish.descripcion} />
    </Card>
        :
      <Card
      className="platos"
      key={dish.id}
      style={{ width: 240 }}
      cover={<img alt="example" src={dish.icon} />}
    >
      <Meta title={dish.nombre} description={dish.descripcion} />
    </Card>)
    })
    :""
    }
      <Modal
          title="Añadir plato"
          visible={showDishForm}
          okText="Salir"
          destroyOnClose={true}
          onOk={() => {
            setShowDishForm(!showDishForm);
          }}
          cancelText="Cancelar"
          onCancel={() => {
            setShowDishForm(!showDishForm);
          }}
        >
          <DishForm/>
        </Modal>
    
  </div>
  );
};

const mapStateToProps = (state) => {
  return { dishes: readAllDishes(state)};
};

export default connect(mapStateToProps, {
  getAllDishes
})(DishesGrid);

