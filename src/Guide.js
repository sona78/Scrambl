import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "shards-ui/dist/css/shards.min.css";
import { Accordion, Nav, Navbar,ResponsiveEmbed, Image, Jumbotron, Container, Col, Row, Carousel, Card, Button, Form, CardColumns } from 'react-bootstrap';
import {ListGroup , ListGroupItem} from 'shards-react';
import Topper from './Topper.js'
import Bottom from './Bottom.js'

import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import SideDash from './SideDash.js'
import { Layout} from 'antd';
const { Header, Content, Footer, Sider } = Layout;

export class Guide extends React.Component {
    render() {
      return (
        <Layout>
          <Sider>
            <SideDash/>
          </Sider>
          <Layout>
          <Content>
            <Info/>
          </Content>
          </Layout>
        </Layout>
      );
    }
  };

class Info extends React.Component{
    render(){
        return(
          <>
            <Jumbotron fluid style={{height: '100vh', backgroundColor: "#FFFFFF", margin: '0px'}}>
            <div style = {{margin: '5vh', marginTop: '0px'}}>
                <h1>Guide</h1>
            <Jumbotron style={{margin: '5vh', backgroundColor: "#360CAA"}}>
                <div style = {{margin: '5vh', marginTop: '0px'}}>
                <Card>
                  <Accordion>
                    <Card style = {{ backgroundColor: "#050401"}}>
                        <Accordion.Toggle as={Card.Header}  eventKey="0" style = {{textAlign: 'center'}}>
                        <h1 style = {{color: "#FFFFFF"}}>Building a Resume</h1>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <ListGroup>
                            <ListGroupItem><strong></strong>  </ListGroupItem>
                          </ListGroup>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </Card>
                </div>
              </Jumbotron>
              <Jumbotron style={{margin: '5vh', backgroundColor: "#360CAA"}}>
                <div style = {{margin: '5vh', marginTop: '0px'}}>
                <Card>
                  <Accordion>
                    <Card style = {{ backgroundColor: "#050401"}}>
                        <Accordion.Toggle as={Card.Header}  eventKey="1" style = {{textAlign: 'center'}}>
                        <h1 style = {{color: "#FFFFFF"}}>Networking</h1>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <ListGroup>
                            <ListGroupItem><strong></strong>  </ListGroupItem>
                          </ListGroup>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </Card>
                </div>
              </Jumbotron>
              <Jumbotron style={{margin: '5vh', backgroundColor: "#360CAA"}}>
                <div style = {{margin: '5vh', marginTop: '0px'}}>
                <Card>
                  <Accordion>
                    <Card style = {{ backgroundColor: "#050401"}}>
                        <Accordion.Toggle as={Card.Header}  eventKey="2" style = {{textAlign: 'center'}}>
                        <h1 style = {{color: "#FFFFFF"}}>Interviews</h1>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <ListGroup>
                            <ListGroupItem><strong></strong>  </ListGroupItem>
                          </ListGroup>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </Card>
                </div>
              </Jumbotron>
              </div>
            </Jumbotron>
          </>
        );
    }
};
export default withAuthenticator(Guide);