import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'antd/dist/antd.css';
import { Accordion, Nav, Navbar, NavDropdown, Image, Jumbotron, ListGroup, Container, Col, Row, Carousel, Card, Button, Form, CardColumns } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import { Auth } from 'aws-amplify';
import styled from 'styled-components';
import logo from './assets/default.svg'
import icon from './assets/icon.svg'
import{  
BrowserRouter as Router,
  Route,
  NavLink as Link,
  Switch,
  Redirect,
  useHistory
} from "react-router-dom";
import {HOME, ABOUT, DASHBOARD, GUIDE, SETTINGS} from './App.js'
import Bottom from './Bottom.js'
import {
  DashboardOutlined,
  BookOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #15cdfc;
  }
`;

  export class SideDash extends React.Component{
    constructor(props){
      super(props)
      this.state= {
        collapsed: false,
        user: "User"
      }
      this.onCollapse = this.onCollapse.bind(this)
    }
    async componentDidMount(){
      try {
        const currentUserInfo = await Auth.currentUserInfo();
        this.setState({user: currentUserInfo.username});
      } catch (err) {
        console.log('error fetching user info: ', err);
      }
    }
    onCollapse(){
      this.setState({collapsed: !this.state.collapsed})
    }
    signOut(){
      Auth.signOut();
    }
    render(){
      const path = window.location.pathname
      return(
        <Layout>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} style = {{height: '100vh', backgroundColor: "#360CAA"}}>
        <div style = {{color: 'white', marginLeft: '0px', padding: '0.5vw'}}><NavLink to = {HOME}><img height='40vh' className="img-responsive"  src={(!this.state.collapsed) ? logo : icon}  alt="logo"/></NavLink></div>
        <Menu style = {{backgroundColor: "#360CAA"}} theme="dark" defaultSelectedKeys={((path === DASHBOARD) ? ['1'] : (path === GUIDE ? ['2'] : [])) } mode="inline">
          <Menu.Item key="1" href = {DASHBOARD} icon={<DashboardOutlined/>}>
            <a href = {DASHBOARD} style = {{color: "#FFFFFF"}}>Dashboard</a>
          </Menu.Item>
          <Menu.Item key="2"  icon={<BookOutlined />}>
            <a href = {GUIDE} style = {{color: "#FFFFFF"}}>Guide</a>
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title={this.state.user}>
            <Menu.Item key="4"><a href = {SETTINGS} style = {{color: "#FFFFFF"}}>Settings</a></Menu.Item>
            <Menu.Item onClick = {this.signOut} key="5"><a href = {HOME} style = {{color: "#FFFFFF"}}>Sign Out</a></Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      </Layout>
      );
    }
  };

  export default SideDash;