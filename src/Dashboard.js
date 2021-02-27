import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Accordion, Nav, Navbar, ResponsiveEmbed, Image, Jumbotron, ListGroup, Container, Col, Row, Carousel, Card, Button, Form, CardColumns } from 'react-bootstrap';
import HeaderDash from './HeaderDash.js'

export class Dashboard extends React.Component {
    render() {
      return (
        <>
            <HeaderDash/>
        </>
      );
    }
  };

export default Dashboard;