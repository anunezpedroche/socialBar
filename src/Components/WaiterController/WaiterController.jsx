import React, { useCallback , useEffect , useState } from "react";
import { useParams } from "react-router";
import "./WaiterController.css";

import Http from "../../Helpers/Http";

// Antd
import { Carousel,Button } from "antd";
import { Layout } from 'antd';

import { connect } from "react-redux";
import { readAllDishes } from "../../Redux/Reducers/DishesReducer";
import { getAllDishes } from "../../Redux/Actions/DishesActions";

//WebSocket
import socketIOClient from "socket.io-client";

const PROD = 'http://www.tacumba.es:5000';
const DEV = 'http://localhost:5000';


const WaiterController = ({dishes,getAllDishes}) => {
  const [ response, setResponse ] = useState(false);
  const [loading,setLoading] = useState(false);
  let {idCard, idTable} = useParams();

    console.log(idCard,idTable);

    const recoverCard = useCallback(async ()=>{
      
      const socket = socketIOClient(PROD);
      socket.emit('acceptTable',({accepted:loading}));
      console.log(response);

    },[loading]);

    useEffect(()=>{

 

      //console.log(response);
      recoverCard();

    },[loading]);

    useEffect(()=>{

    },[])

    return (
<React.Fragment>
      {(response)? <p>{dishes[0].titulo}</p>:
      <p>
             <Button onClick={()=>{setLoading(!loading)}}> Aceptar mesas/Rechazar</Button>
      </p>
}
</React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { dishes: readAllDishes(state)};
};

export default connect(mapStateToProps, {
  getAllDishes
})(WaiterController);

