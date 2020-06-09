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
import { readAllCards, readCard} from "../../Redux/Reducers/CardsReducer";
import {
  getAllCards,
  selectedCard,
} from "../../Redux/Actions/CardsActions";

const { Meta } = Card;
// Antd

const EstablishmentsCard = ({ cards, getAllCards, establishment }) => {

  const [loading, setLoading] = useState(false);

  const replenishCards = useCallback(async () => {

    const dataSource = await Http.get("/api/cards/allCardsEstablishmentsId/"+establishment.id);
    console.log(dataSource);
    getAllCards(dataSource);
    setLoading(true);

  }, []);

  useEffect(() => {
    replenishCards();
  }, []);

  return (
    <div className="establishmentWorkspace">
        {loading ? 
         <Card
         style={{ width: 300 }}
         cover={
           "patata"
         }
         actions={[
           <SettingOutlined key="setting" />,
           <EditOutlined key="edit" />,
           <EllipsisOutlined key="ellipsis" />,
         ]}
       >
         <Meta
           avatar={
             <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
           }
           title="Card title"
           description="This is the description"
         />
       </Card>
        :
        ""
        }
     
    </div>
  );
};

const mapStateToProps = (state) => {
    return { cards: readAllCards(state), card: readCard(state)};
  };
  
  export default connect(mapStateToProps, {
    getAllCards,
    selectedCard,
  })(EstablishmentsCard);
  
