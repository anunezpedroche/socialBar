import React,{useCallback, useEffect, useState} from "react";
import "./DishesGrid.css";
import Http from '../../Helpers/Http';
// Antd
import { Carousel } from "antd";
import Nav from '../Nav/Nav';
import { Layout } from 'antd';
import { Card } from 'antd';

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
  const replenishDishes = useCallback(async () => {
    const dataSource = await Http.get(
      "/api/dishes/allDishes"
    );

    getAllDishes(dataSource);
    console.log(dataSource);
    setLoading(true);
  }, []);

  useEffect(()=>{
    replenishDishes();
  },[])

  return (
    <div className="platosContainer">
    {loading?     dishes.map((dish)=>{
      return(
      <Card
      className="platos"
      key={dish.id}
      style={{ width: 200 }}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
    >
      <Meta title={dish.nombre} description={dish.descripcion} />
    </Card>)
    })
    :""
    }

    
  </div>
  );
};

const mapStateToProps = (state) => {
  return { dishes: readAllDishes(state)};
};

export default connect(mapStateToProps, {
  getAllDishes
})(DishesGrid);

