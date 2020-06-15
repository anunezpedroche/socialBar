import React from "react";
import "./Dishes.css";
// Antd
import { Carousel } from "antd";
import Nav from '../Nav/Nav';
import DishesGrid from '../DishesGrid/DishesGrid';
import { Layout } from 'antd';

const { Header, Content } = Layout;

const Dishes = () => {

  

  return (
    <React.Fragment>
      <Layout>
      <Header style={{minHeight:'10vh', color:'white',fontSize:'30px', textAlign:'center'}}><img style={{width:50}} alt=""src={require("../../img/beer.svg")}/> Social Bar Management Tool <img style={{width:50}} alt="" src={require("../../img/beer.svg")}/></Header>
        <Layout>
        <Nav selectedKey={4}/>
        <Content
          style={{backgroundColor:'darkslateblue'}}
        >
        <Carousel effect="fade" autoplay autoplaySpeed="10"> 
        <DishesGrid/>
      </Carousel></Content>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default Dishes;
