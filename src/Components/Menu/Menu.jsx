import React, {useCallback,useEffect,useState} from "react";
import "./Menu.css";
// Antd
import EstablishmentsCard from "../EstablishmentsCard/EstablishmentsCard";
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

const { Header, Footer, Sider, Content } = Layout;
const { TabPane } = Tabs;

const Menu = ({establishments, getAllEstablishments, selectedEstablishment,establishment}) => {

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
        console.log(selectedEstablishment);
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
            <Nav selectedKey={3}/>
            <Content
              style={{backgroundColor:'darkslateblue'}}
            >
              <Tabs className="tabsEstablishments" onChange={console.log("11")} defaultActiveKey={establishment.id.toString()}>
                {establishments.map((establish) =>{
    
                  console.log(establish.id);
    
                  return (
                  <TabPane tab={establish.nombre} key={establish.id} >
                    <EstablishmentsCard establishment={establish} />
                  </TabPane>
                  );
                })}
                  
              </Tabs>
           </Content>
            </Layout>
            <Footer style={{minHeight:'10vh', backgroundColor:'darkblue'}}>footer</Footer>
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
})(Menu);
