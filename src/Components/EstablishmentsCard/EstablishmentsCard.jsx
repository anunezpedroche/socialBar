import React, { useEffect, useCallback, useState } from "react";
import "./EstablishmentsCard.css";
import Http from "../../Helpers/Http";
import { Card, Avatar, Modal } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import EditCardForm from '../EditCardForm/EditCardForm';
import { connect } from "react-redux";
import { readAllCards, readCard } from "../../Redux/Reducers/CardsReducer";
import { getAllCards, selectedCard } from "../../Redux/Actions/CardsActions";
import { selectedEstablishment } from "../../Redux/Actions/EstablishmentActions";
import { readEstablishment } from "../../Redux/Reducers/EstablishmentReducer";
import { getAllDishes } from "../../Redux/Actions/DishesActions";

const { Meta } = Card;
// Antd

const EstablishmentsCard = ({ card, cards, getAllCards, establishment, selectedCard,getAllDishes}) => {

  const [loading, setLoading] = useState(false);
  const [showEditCardForm, setShowEditCardForm] = useState(false);

  const replenishDishes = useCallback(async()=>{
    const dataSource = await Http.get("/api/dishes/allDishes");
    getAllDishes(dataSource.map(item =>{
      item.key = item.id.toString();
      return item;
    }));
  },[]);

  const replenishCards = useCallback(async () => {
    const dataSource = await Http.get(
      "/api/cards/allCardsEstablishmentsId/" + establishment.id
    );
    getAllCards(dataSource);
    setLoading(true);
  }, [establishment]);

  useEffect(() => {
    replenishCards();
    replenishDishes();
  }, [establishment]);

  const saveDishes = (async()=>{

    setShowEditCardForm(!showEditCardForm);
    const dataSend = await Http.post(card,'/api/cards/dishesToCard');

    if(dataSend){
      
    }


  });

  return (
    <div className="establishmentWorkspace">
      {loading
        ? 
        <div className="cardContainer">{
        cards.map((carta) => {
            return(
            <Card
            className="cartas"
            key={carta.id}
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
              }
              actions={[
                <SettingOutlined key={"setting"+carta.id} />,
                <EditOutlined key={"edit"+carta.id} onClick={()=>{setShowEditCardForm(!showEditCardForm); selectedCard(carta.id)}} />,
                <EllipsisOutlined key={"ellipsis"+carta.id} />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={carta.nombre}
                description={carta.descripcion}
              />
            </Card>
        )})
            }
            </div>: ""}

            <Modal
          title="Añadir platos a la carta"
          visible={showEditCardForm}
          okText="Guardar y salir"
          destroyOnClose={true}
          onOk={() => {
            saveDishes();
          }}
          cancelText="Cancelar"
          onCancel={() => {
            setShowEditCardForm(!showEditCardForm);
          }}
          width={1000}
        >
          <EditCardForm />
        </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { cards: readAllCards(state), card: readCard(state), establishment: readEstablishment(state) };
};

export default connect(mapStateToProps, {
  getAllCards,
  selectedCard,
  selectedEstablishment,
  getAllDishes
})(EstablishmentsCard);
