import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {
  Card,
  CardHeader,
  CardColumns,
  CardTitle,
  CardImg,
  CardBody,
  CardFooter,
  Button
} from "shards-react";
import "shards-ui/dist/css/shards.min.css"
import { Accordion, Nav, Navbar, ResponsiveEmbed, Modal, Image, Jumbotron, ListGroup, Container, Col, Row, Carousel } from 'react-bootstrap';
import {encrypt, decrypt, passwordDisplay} from './Functions.js'
import SideDash from './SideDash.js'
import Bottom from './Bottom.js'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { DataStore } from '@aws-amplify/datastore';
import { User } from './models';
import { Service } from './models';
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify'
import { Layout} from 'antd';
import Search from './Search.js'
const { Header, Content, Footer, Sider } = Layout;

export class Dashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      jobs: []
    }
    this.catchSearch = this.catchSearch.bind(this)
  }
  catchSearch(res){
    this.setState({jobs: res})
  }
    render() {
      return (
        <Layout>
          <Sider>
            <SideDash/>
          </Sider>
          <Layout>
          <Search onSearch = {this.catchSearch}/>
          <Content>
            <Login/>
            <Display jobs = {this.state.jobs}/>
          </Content>
          </Layout>
        </Layout>
      );
    }
  };

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      credentials: [],
      user: ""
    }
  }
  async componentDidMount(){
    
  }
  render(){
    return(
      <Jumbotron style={{margin: '5vh', backgroundColor: "#050401"}}>
        <h1 style = {{color: '#FFFFFF'}}>Login Credentials</h1>
        <CardColumns>
            {this.state.credentials.map((auth) => (
              <Card style={{ maxWidth: "300px" }}>
                <CardBody>
                  <CardTitle>{auth.service}</CardTitle>
                  <p><strong>Username: </strong></p>{auth.username}<br/>
                  <p><strong>Password: </strong></p>{decrypt(passwordDisplay(auth.password), this.state.user)}<br/>
                </CardBody>
                <CardFooter><Button href = {auth.link}>Login</Button></CardFooter>
              </Card>
            ))}
        </CardColumns><br/>
          <div style = {{display: 'flex', alignItems: 'center', justifyContent: 'center'}} className = 'center' >
          <Button className= 'center' size = "lg" style = {{backgroundColor: "#92D8FF",  alignItems: 'center',  color: "#FFFFFF"}} href = "/settings">Add New Service</Button>
          </div>
      </Jumbotron>
    );
  }
};
class Display extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      jobs: [],
      showHide: false,
      summary: ""
    }
  }

  openModal(summary) {
    if(summary !== ""){
      this.setState({ showHide: true })
      this.setState({ summary: summary })
    }
  }
  closeModal(){
      this.setState({ showHide: false})
      console.clear()
  }
  render(){
    return(
      <div key = {this.props.jobs}>
      <Jumbotron style={{height: '100vh', margin: '5vh', marginTop: '0vh', backgroundColor: "#050401"}}>
        <h1 style = {{color: '#FFFFFF'}}>Search Results</h1>
        <div style = {{margin: '5vh', marginTop: '0px'}}>
          <CardColumns>
            {this.state.jobs.map((job) => (
              <Card style={{ maxWidth: "300px" }} onClick = {this.openModal(job.summary)}>
                <CardHeader>{job.company}</CardHeader>
                <CardImg src="https://place-hold.it/300x200" />
                <CardBody>
                  <CardTitle>{job.title}</CardTitle>
                  {(job.salary !== null && job.salary !== "") ? (<p><strong>Salary: </strong>{job.salary}<br/></p>) : (<></>)}
                  <p><strong>Location: </strong></p>{job.location}<br/>
                </CardBody>
                <CardFooter><Button href = {job.link}>Read more</Button></CardFooter>
              </Card>
            ))}
          </CardColumns>
        </div>
      </Jumbotron>

      <Modal show={this.state.showHide} centered dialogClassName="modal-90w" size="xl" backdrop = "static">                     
        <Modal.Header closeButton onClick={() => this.closeModal()}>
        <Modal.Title>Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Container>
              <p>{this.state.summary}</p>
            </Container>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={() => this.closeModal()}>
            Close
        </Button>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
};

export default withAuthenticator(Dashboard);