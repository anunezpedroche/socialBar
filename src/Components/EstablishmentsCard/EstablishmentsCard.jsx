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

const { Meta } = Card;
// Antd

const EstablishmentsCard = ({ cards, getAllCards, selectedEstablishment, establishment, selectedCard}) => {

  const [loading, setLoading] = useState(false);
  const [showEditCardForm, setShowEditCardForm] = useState(false);

    console.log(typeof(cards));

  const replenishCards = useCallback(async () => {
    const dataSource = await Http.get(
      "/api/cards/allCardsEstablishmentsId/" + establishment.id
    );
    getAllCards(dataSource);
    setLoading(true);
  }, [establishment]);

  useEffect(() => {
    replenishCards();
  }, [establishment]);

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
                <SettingOutlined key={"setting"+carta.id} onClick={()=>{setShowEditCardForm(!showEditCardForm); selectedCard(carta.id)}}/>,
                <EditOutlined key={"edit"+carta.id} />,
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
          okText="Salir"
          destroyOnClose={true}
          onOk={() => {
            setShowEditCardForm(!showEditCardForm);
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
})(EstablishmentsCard);
