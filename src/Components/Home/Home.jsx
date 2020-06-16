import React from "react";
import "./Home.css";
// Antd
import { Carousel } from "antd";
import Nav from '../Nav/Nav';
import { Layout } from 'antd';

const { Header, Content } = Layout;

const Home = () => {

  

  return (
    <React.Fragment>
      <Layout>
        <Header style={{minHeight:'10vh',color:'white',fontSize:'30px', textAlign:'center'}}><img style={{width:50}} alt="" src={require("../../img/beer.svg")}/> Social Bar Management Tool <img style={{width:50}} alt="" src={require("../../img/beer.svg")}/></Header>
        <Layout>
        <Nav selectedKey={1}/>
        <Content>
        <Carousel effect="fade" autoplay autoplaySpeed="10"> 
        <div>
          <h3>SocialBar</h3>
        </div>
        <div>
          <h3>Gestión avanzada para la nueva normalidad</h3>
        </div>
        <div> 
          <h3>Probandito</h3>
        </div>
        <div>
          <h3>Powered by DAW</h3>
        </div>
      </Carousel></Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default Home;
