import React,{useState} from "react";
import { Menu } from 'antd';
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { connect } from "react-redux";
import { readUser } from "../../Redux/Reducers/UserReducer";
import { logOutUser } from "../../Redux/Actions/UserActions";
import Profile from '../Profile/Profile';
import { Layout } from 'antd';
import { BrowserRouter as  Link } from "react-router-dom";
const { Sider } = Layout;


const Nav = ({user, selectedKey}) => {

    const [collapsed, setCollapsed] = useState(false);
    
    const selectedKeyStr = selectedKey.toString();

    
    const toggleCollapse = () =>{

        setCollapsed(!collapsed);   
    
    }

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