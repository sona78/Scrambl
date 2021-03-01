import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Accordion, Nav, Navbar,ResponsiveEmbed, Image, Jumbotron, ListGroup, Container, Col, Row, Carousel, Card, Button, Form, CardColumns } from 'react-bootstrap';
import Topper from './Topper.js'
import Bottom from './Bottom.js'
import cover from './assets/cover.png'
import {Layout} from 'antd';
const { Header, Content, Footer, Sider } = Layout;

export class Home extends React.Component {
    render() {
      return (
        <Layout>
            <Topper/>
          <Content>
            <Display/>
          </Content>
            <Bottom/>
        </Layout>
      );
    }
  };

class Display extends React.Component {
  render(){
    return(
      <Jumbotron style = {{backgroundColor: "#050401", margin: '0vh'}} fluid>
        <Jumbotron className = "center" style = {{backgroundColor: "#360CAA", margin: '10vh'}}>
          <div fluid className = "center" style = {{justifyContent: 'center', alignItems: 'center', display: 'flex'}}><img height='250vw' className="img-responsive" style = {{alignSelf: 'center'}} src={cover}  alt="cover"/></div><br/>
          <div className = 'center' >
            <h3  style = {{color: "#FFFFFF", textAlign:'center'}}>Scrambl is a one-size-fits-all job application management platform. With such a variety of similar websites for communicating with companies, Scrambl aims to streamline this process and organize search results, manage authentication, and spread quality information about how to receive an offer.</h3>
          </div>
        </Jumbotron>
      </Jumbotron>
    );
  }
};
export default Home;