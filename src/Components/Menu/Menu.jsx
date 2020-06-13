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

const { Header, Content } = Layout;
const { TabPane } = Tabs;

const Menu = ({establishments, getAllEstablishments, selectedEstablishment,establishment}) => {

  const [loading, setLoading] = useState(false);
    const replenishEstablishments = useCallback(async()=>{
        const dataSource = await Http.get("/api/establishments/allEstablishments");

        await dataSource.map(async (est) =>{
          est.id = est.id.toString();
        });

        dataSource.unshift({
          id: "0",
          nombre: "Añadir local",
          add : 1
        });

        getAllEstablishments(dataSource);
        if(dataSource[1]){
          selectedEstablishment(dataSource[1].id);
        }else{
          selectedEstablishment(dataSource[0].id);
        }
        setLoading(true);
    },[]);

    useEffect(()=>{
        replenishEstablishments();
    },[])

    const changeEstablish = (id) => {
      selectedEstablishment(id);
    }

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
              <Tabs className="tabsEstablishments" defaultActiveKey={establishment.id} onTabClick={(activeKey)=>{(activeKey==='0')?selectedEstablishment('1'):selectedEstablishment(activeKey)}}>
                {establishments.map((establish) =>{

                  console.log(establish);
                  return (

                    (establish.add===1)?
                      <TabPane tab={establish.nombre} key={establish.id}>
                        {console.log("entro aqui")}
                        Añadir local
                      </TabPane>
                      
                    :
                  <TabPane tab={establish.nombre} key={establish.id}>
                    {console.log("mejor entro aqui")}
<EstablishmentsCard/>                  </TabPane>
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
})(Menu);
