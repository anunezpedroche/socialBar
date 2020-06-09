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
import { readAllEstablishments, readEstablishment} from "../../Redux/Reducers/EstablishmentReducer";
import {
  getAllEstablishments,
  selectedEstablishment,
} from "../../Redux/Actions/EstablishmentActions";

const { Header, Content } = Layout;
const { TabPane } = Tabs;

const Locales = ({establishments, getAllEstablishments, selectedEstablishment,establishment}) => {

  const [loading, setLoading] = useState(false);
    const replenishEstablishments = useCallback(async()=>{
        const dataSource = await Http.get("/api/establishments/allEstablishments");

        await dataSource.map(async (est) =>{
          console.log("hola");
          est.id = est.id.toString();
        });
        
        dataSource.unshift({
          id: "0",
          nombre: "Añadir local" 
        });

        await getAllEstablishments(dataSource);
        selectedEstablishment(dataSource[1].id);
        console.log(dataSource);
        setLoading(true);
    },[]);

    useEffect(()=>{
        replenishEstablishments();
    },[])

  return (
    <React.Fragment>
      {(loading)?
            <Layout>
            <Header style={{minHeight:'10vh'}}>header</Header>
            <Layout>
            <Nav selectedKey={2}/>
            <Content
              style={{backgroundColor:'darkslateblue'}}
            >
              <Tabs className="tabsEstablishments" defaultActiveKey={establishment.id.toString()}>
                {establishments.map((establish) =>{

                  return (
                  <TabPane tab={establish.nombre} key={establish.id} >
                    <Establishments establishment={establish}/>
                  </TabPane>
                  );
                })}
                  
              </Tabs>
           </Content>
            </Layout>
          </Layout>
      :
      ""}

    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return { establishments: readAllEstablishments(state), establishment: readEstablishment(state)};
};

export default connect(mapStateToProps, {
  getAllEstablishments,
  selectedEstablishment,
})(Locales);
