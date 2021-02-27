import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Accordion, Nav, Navbar, NavDropdown, Image, Jumbotron, ListGroup, Container, Col, Row, Carousel, Card, Button, Form, CardColumns } from 'react-bootstrap';
import { FaBars } from 'react-icons/fa';
import styled from 'styled-components';
import{  
BrowserRouter as Router,
  Route,
  NavLink as Link,
  Switch,
  Redirect,
  useHistory
} from "react-router-dom";
import {HOME, ABOUT, DASHBOARD} from './App.js'
const NavLink = styled(Link)`
  color: #fff;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  &.active {
    color: #15cdfc;
  }
`;


const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #db3d44;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #010606;
  }
`;

  export function Header(){
    return(
        <>
        <Navbar style = {{backgroundColor: "#360CAA"}}  expand="lg">
          <Navbar.Brand style = {{color: 'white', padding: '10px'}}><NavLink to = {HOME} style = {{color: 'white', font:"Arimo-Regular", fontSize:"30px"}} >LungStat</NavLink></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" style = {{backgroundColor: "white"}}/>
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="mr-auto" >
              <NavLink to={HOME} style = {{color: "white", margin: '5px'}}>
                Home
              </NavLink>
              <NavLink to={ABOUT} style = {{color: "white", margin: '5px'}}>
                About
              </NavLink>
            </Nav>
            <NavBtn>
              <NavBtnLink to={DASHBOARD}>Login</NavBtnLink>
            </NavBtn>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
  }

  export default Header;


