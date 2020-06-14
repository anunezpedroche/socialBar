import React,{useState,useCallback} from "react";
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { connect } from "react-redux";
import { readUser } from "../../Redux/Reducers/UserReducer";
import { logOutUser } from "../../Redux/Actions/UserActions";
import Http from "../../Helpers/Http";
import Profile from '../Profile/Profile';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const { Header, Footer, Sider, Content } = Layout;

const { SubMenu } = Menu;

const Nav = ({user, selectedKey}) => {

    const [collapsed, setCollapsed] = useState(false);
    
    const selectedKeyStr = selectedKey.toString();

    
    const toggleCollapse = () =>{

        setCollapsed(!collapsed);   
    
    }

    const replenishData = useCallback (async () =>{
        const dataSource = await Http.get("/api/establishments/allEstablishments");
    },[]);

        return (
          <div style={{minHeight: '100vh'}}>
            <Sider
              collapsible
              collapsed={collapsed}
              onCollapse={toggleCollapse}
              style={{minHeight:'100vh'}}
            >
            <Menu
              defaultSelectedKeys={[selectedKeyStr]}
              mode="inline"
              theme="dark"
            >
              <Menu.Item key="1" icon={<PieChartOutlined />}>

                Inicio
                <Link to="/Home"/>
              </Menu.Item>
              <Menu.Item key="2" icon={<DesktopOutlined />}>
                Locales
                <Link to="/Locales"/>
              </Menu.Item>
              <Menu.Item key="3" icon={<ContainerOutlined />}>
                Cartas
                <Link to="/Menu"/>
              </Menu.Item>
              
              <Menu.Item key="4" icon={<MailOutlined />}>Mis Platos<Link to="/Dishes"/></Menu.Item>
              <Profile collapsed={collapsed}/>
            </Menu>
            </Sider>
          </div>
        );
}


const mapStateToProps = (state) => {
    return { user: readUser(state)};
  };
  
  export default connect(mapStateToProps, { logOutUser })(Nav);