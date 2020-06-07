import React, {useCallback,useEffect} from "react";
import "./Locales.css";
// Antd
import { Carousel } from "antd";
import Nav from '../Nav/Nav';
import { Layout } from 'antd';
import Http from "../../Helpers/Http";

const { Header, Footer, Sider, Content } = Layout;

const Locales = () => {

    const replenishEstablishments = useCallback(async()=>{
        const dataSource = await Http.get("/api/establishments/allEstablishments");

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
            Haciendo pruebas
       </Content>
        </Layout>
        <Footer style={{minHeight:'10vh', backgroundColor:'darkblue'}}>footer</Footer>
      </Layout>
    </React.Fragment>
  );
};

export default Locales;
