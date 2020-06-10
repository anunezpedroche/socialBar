import React, { useCallback , useEffect , useState } from "react";
import { useParams } from "react-router";
import "./CardFromTable.css";

import Http from "../../Helpers/Http";

// Antd
import { Carousel } from "antd";
import { Layout } from 'antd';

import { connect } from "react-redux";
import { readAllDishes } from "../../Redux/Reducers/DishesReducer";
import { getAllDishes } from "../../Redux/Actions/DishesActions";

const { Header, Footer, Sider, Content } = Layout;

const CardFromTable = ({dishes,getAllDishes}) => {
  const [loading,setLoading] = useState(false);
  let {idCard, idTable} = useParams();

    console.log(idCard,idTable);

    const recoverCard = useCallback(async ()=>{
      const dataSource = await Http.getCard(`/api/tables/cardFromTable/${idTable}/${idCard}`);
      getAllDishes(dataSource);
      dataSource.map(item =>{
        const icon = require(`../../img/dishes/${item.imagen}`);
        return item.icon = icon;

      });
      
    setLoading(true);
    },[]);

    useEffect(()=>{
      recoverCard();
    },[])

    return (
    <React.Fragment>
      <Carousel effect="fade" autoplay autoplaySpeed="10"> 
        
        {(loading)?dishes.map((dish)=>{
          return(
                <div>
                  <img alt="example" src={dish.icon} style={{maxHeight:300}}/>
                </div>
        )}):""}

      </Carousel>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { dishes: readAllDishes(state)};
};

export default connect(mapStateToProps, {
  getAllDishes
})(CardFromTable);

