import React, { useCallback , useEffect , useState } from "react";
import "./WaiterController.css";

// Antd
import { Button } from "antd";

import { connect } from "react-redux";
import { readAllDishes } from "../../Redux/Reducers/DishesReducer";
import { getAllDishes } from "../../Redux/Actions/DishesActions";

//WebSocket
import socketIOClient from "socket.io-client";

const PROD = 'http://www.tacumba.es:5000';
const DEV = 'http://localhost:5000';


const WaiterController = () => {

  const [loading,setLoading] = useState(false);

    const recoverCard = useCallback(async ()=>{
      
      const socket = socketIOClient(PROD);
      socket.emit('acceptTable',({accepted:loading}));


    },[loading]);

    useEffect(()=>{

      recoverCard();

    },[recoverCard]);

    return (
<React.Fragment>
      <p>
             <Button onClick={()=>{setLoading(!loading)}}> Aceptar mesas/Rechazar</Button>
      </p>

</React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { dishes: readAllDishes(state)};
};

export default connect(mapStateToProps, {
  getAllDishes
})(WaiterController);

