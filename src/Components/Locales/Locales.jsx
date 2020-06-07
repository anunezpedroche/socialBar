import React from "react";
import "./Locales.css";
// Antd
import { Carousel } from "antd";
import Nav from '../Nav/Nav';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const Locales = () => {
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
