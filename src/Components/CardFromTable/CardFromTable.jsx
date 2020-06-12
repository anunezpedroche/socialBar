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
  const [ response, setResponse ] = useState("");
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
      
    setLoading(true);
    },[]);

    useEffect(()=>{

const socket = socketIOClient("http://localhost:4000");
      socket.on('news', (data)=>{
        console.log(data);
        socket.emit('my other event', {my:'data'});
        setResponse(data);
        });
      console.log(response);
      //recoverCard();

    },[]);

    useEffect(()=>{

    },[])

    return (
      <p>
        It's {response.hello}
      </p>
  );
};

const mapStateToProps = (state) => {
  return { dishes: readAllDishes(state)};
};

export default connect(mapStateToProps, {
  getAllDishes
})(CardFromTable);

