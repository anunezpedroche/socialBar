import React, { useCallback , useEffect , useState } from "react";
import { useParams } from "react-router";
import "./CardFromTable.css";

import Http from "../../Helpers/Http";

import CardPreview from "../CardPreview/CardPreview";
import Delivery from "../Delivery/Delivery";

import { connect } from "react-redux";
import { readAllDishes } from "../../Redux/Reducers/DishesReducer";
import { readCard, readAllCards } from "../../Redux/Reducers/CardsReducer";
import { selectedCard, getAllCards } from "../../Redux/Actions/CardsActions";
import { getAllDishes } from "../../Redux/Actions/DishesActions";

//WebSocket
import socketIOClient from "socket.io-client";

const PROD = 'http://www.tacumba.es:5000';
const DEV = 'http://localhost:5000';

const CardFromTable = ({getAllDishes, selectedCard, getAllCards}) => {
  const [ response, setResponse ] = useState(false);
  const [loading,setLoading] = useState(false);
  let {idCard, idTable} = useParams();

    console.log(idCard,idTable);

    const recoverCards = useCallback(async ()=>{
      const dataCard = await Http.getCard(`/api/cards/cardsFromId/${idCard}`);
      getAllCards(dataCard);
      selectedCard(dataCard[0].id);
    });

    const recoverCard = useCallback(async ()=>{
      const dataSource = await Http.getCard(`/api/tables/cardFromTable/${idTable}/${idCard}`);
      getAllDishes(dataSource.map(item =>{
        item.key = item.id.toString();
        item.cantidad = 1;
        return item}));
      
      const socket = socketIOClient(PROD);
      socket.emit('joinTable', (dataSource));
      socket.on('acceptedTable',({accepted})=>{
        setResponse(accepted.accepted);
      })
    setLoading(true);
    },[]);

    useEffect(()=>{

      //console.log(response);
      recoverCard();

    },[]);

    useEffect(()=>{

      recoverCards();
    },[])

    return (
<React.Fragment>
  <div className="workspace">
      {(response===true)? <p><Delivery/></p> : <CardPreview/>}
  </div>
</React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { dishes: readAllDishes(state), card: readCard(state),cards:readAllCards(state)};
};

export default connect(mapStateToProps, {
  getAllDishes,
  selectedCard,
  getAllCards
})(CardFromTable);

