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

//WebSocket
import socketIOClient from "socket.io-client";

const ENDPOINT = 'http://localhost:4000';


const CardFromTable = ({dishes,getAllDishes}) => {
  const [ response, setResponse ] = useState(false);
  const [loading,setLoading] = useState(false);
  let {idCard, idTable} = useParams();

    console.log(idCard,idTable);

    const recoverCard = useCallback(async ()=>{
      const dataSource = await Http.getCard(`/api/tables/cardFromTable/${idTable}/${idCard}`);
      getAllDishes(dataSource);
      console.log(dataSource);
      dataSource.map(item =>{
        const icon = require(`../../img/dishes/${item.imagen}`);
        return item.icon = icon;
        
      });
      const socket = socketIOClient("http://localhost:5000");
      socket.emit('joinTable', (dataSource));
      socket.on('acceptedTable',({accepted})=>{
        console.log(accepted);
        setResponse(accepted.accepted);
      })
    setLoading(true);
    },[]);

    useEffect(()=>{


      //console.log(response);
      recoverCard();

    },[]);

    useEffect(()=>{

    },[])

    return (
<React.Fragment>
      {(response===true)? <p>{ dishes[0].titulo}</p> : <p> It's </p> }
</React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { dishes: readAllDishes(state)};
};

export default connect(mapStateToProps, {
  getAllDishes
})(CardFromTable);

