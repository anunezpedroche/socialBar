import React, {useCallback,useEffect,useState} from "react";
import "./Locales.css";
// Antd
import Establishments from "../Establishments/Establishments";
import { Carousel } from "antd";
import Nav from '../Nav/Nav';
import { Layout } from 'antd';
import Http from "../../Helpers/Http";
import { Tabs } from 'antd';
import { connect } from "react-redux";
import { readAllEstablishments} from "../../Redux/Reducers/EstablishmentReducer";
import {
  getAllEstablishments,
  selectedEstablishment,
} from "../../Redux/Actions/EstablishmentActions";

const { Header, Footer, Sider, Content } = Layout;
const { TabPane } = Tabs;

const Locales = ({establishments, getAllEstablishments, selectedEstablishment}) => {

  const [data,setData] = useState("");
    const replenishEstablishments = useCallback(async()=>{
        const dataSource = await Http.get("/api/establishments/allEstablishments");
        dataSource.unshift({
          id: "add",
          nombre: "Añadir local" 
        });
        await getAllEstablishments(dataSource);
        selectedEstablishment(dataSource[1].id);
    },[]);

    useEffect(()=>{
        replenishEstablishments();
    },[])

  return (
    <React.Fragment>
      <Layout>
        <Header style={{minHeight:'10vh'}}>header</Header>
        <Layout>
        <Nav selectedKey={2}/>
        <Content
          style={{backgroundColor:'darkslateblue'}}
        >
          <Tabs defaultActiveKey={selectedEstablishment} className="tabsEstablishments" onChange={console.log("")}>
            {establishments.map((establish) =>{
              return (
              <TabPane tab={establish.nombre} key={establish.id}>
                <Establishments establishment={establish}/>
              </TabPane>
              );
            })}
              
          </Tabs>
       </Content>
        </Layout>
        <Footer style={{minHeight:'10vh', backgroundColor:'darkblue'}}>footer</Footer>
      </Layout>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { establishments: readAllEstablishments(state)};
};

export default connect(mapStateToProps, {
  getAllEstablishments,
  selectedEstablishment,
})(Locales);
