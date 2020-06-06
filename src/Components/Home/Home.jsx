import React from "react";
import "./Home.css";
// Antd
import { Carousel } from "antd";
import Nav from '../Nav/Nav';
import { Layout } from 'antd';

const { Header, Footer, Sider, Content } = Layout;

const Home = () => {
  return (
    <React.Fragment>
    <Nav/>
    <div>
      <Carousel effect="fade" autoplay autoplaySpeed="10"> 
        <div>
          <h3>SocialBar</h3>
        </div>
        <div>
          <h3>Gestión avanzada para la nueva normalidad</h3>
        </div>
        <div>
          <h3></h3>
        </div>
        <div>
          <h3>Powered by DAW</h3>
        </div>
      </Carousel>
    </div>
    </React.Fragment>
  );
};

export default Home;
