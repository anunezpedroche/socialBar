import React, { useEffect, useCallback, useState } from "react";
import "./EstablishmentsCard.css";
import Http from "../../Helpers/Http";
import { Card, Avatar } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";

import { connect } from "react-redux";
import { readAllCards, readCard } from "../../Redux/Reducers/CardsReducer";
import { getAllCards, selectedCard } from "../../Redux/Actions/CardsActions";
import { selectedEstablishment } from "../../Redux/Actions/EstablishmentActions"
import { readEstablishment } from "../../Redux/Reducers/EstablishmentReducer";

const { Meta } = Card;
// Antd

const EstablishmentsCard = ({ cards, getAllCards, selectedEstablishment, establishment}) => {

  const [loading, setLoading] = useState(false);

    console.log(establishment);

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
                <SettingOutlined key={"setting"+carta.id} />,
                <EditOutlined key={"edit"+carta.id} />,
                <EllipsisOutlined key={"ellipsis"+carta.id} />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={carta.nombre}
                description="This is the description"
              />
            </Card>
        )})
            }</div>: ""}
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
