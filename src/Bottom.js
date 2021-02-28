import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Accordion, Nav, Navbar,ResponsiveEmbed, Image, Jumbotron, ListGroup, Container, Col, Row, Carousel, Card, Button, Form, CardColumns } from 'react-bootstrap';
import logo from './assets/default.svg'
import { Layout} from 'antd';
const { Header, Content, Footer, Sider } = Layout;

export class Bottom extends React.Component {
    render() {
      return (
        <Footer style = {{textAlign:'center', backgroundColor: "#360CAA", margin: '0px', color: '#FFFFFF'}} fluid> Made with ❤️ - Kaustubh Sonawane and Aditya Rai</Footer>
      );
    }
  };

export default Bottom;