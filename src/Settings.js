import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import "shards-ui/dist/css/shards.min.css";
import { Accordion, Nav, Navbar,ResponsiveEmbed, Image, Jumbotron, Container, Col, Row, Carousel, Card, Form, CardColumns } from 'react-bootstrap';
import {Button} from 'shards-react';
import SideDash from './SideDash.js'
import Bottom from './Bottom.js'
import {setCharAt, encrypt} from './Functions.js'
import { DataStore } from '@aws-amplify/datastore';
import { User, Service } from './models';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { API, graphqlOperation, Auth, Storage } from 'aws-amplify'
import { Layout} from 'antd';
const { Header, Content, Footer, Sider } = Layout;

export class Settings extends React.Component {
    render() {
      return (
        <Layout>
          <Sider>
            <SideDash/>
          </Sider>
          <Layout>
          <Content>
            <Display/>
          </Content>
          </Layout>
        </Layout>
      );
    }
  };

class Display extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      user: "",
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      resume: "",
      file: "",
      fileName: "",
      response: "",
      userExists: false,
      username: "",
      password: "",
      service: "",
      link: ""
    }
    this.onFNameChange = this.onFNameChange.bind(this)
    this.onLNameChange = this.onLNameChange.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onServiceChange = this.onServiceChange.bind(this)
    this.onLinkChange = this.onLinkChange.bind(this)
    this.handleServiceSubmit = this.handleServiceSubmit.bind(this)
  }
  async componentDidMount(){
    let user = ""
    try {
      const currentUserInfo = await Auth.currentUserInfo();
      user = currentUserInfo.username
      this.setState({user: user});
    } catch (err) {
      console.log('error fetching user info: ', err);
    }
    let users;
    try {
      users = await DataStore.query(User)
      } catch (err) {
      console.log('error fetching user info: ', err);
    }
    console.log(users)
    if(users !== []){
      let check = false
      let index = 0;
      for (var i = 0; i < users.length; i ++){
        if (users[i].username === user){
          console.log(users[i].username)
          check = true
          index = i
        }
      }
      this.setState({userExists: check})
      if(check === true){
        this.setState({id: users[index].id})
        this.setState({firstName: users[index].firstName})
        this.setState({lastName: users[index].lastName})
        this.setState({email: users[index].email})
        this.setState({phoneNumber: users[index].phoneNumber})
        this.setState({resume: users[index].resume})
      }
    }
  }
  onFNameChange(e){
    this.setState({firstName: e.target.value})
  }
  onLNameChange(e){
    this.setState({lastName: e.target.value})
  }
  onEmailChange(e){
    this.setState({email: e.target.value})
  }
  onPhoneNumberChange(e){
    this.setState({phoneNumber: e.target.value})
  }
  handleUpload(e){
    e.preventDefault()
    if (e.target.files !== null){
        try{
        this.setState({file: e.target.files[0]});
        this.setState({fileName: e.target.files[0].name})
        console.log(e.target.files[0].name)
        }catch(err){
          console.log('error fetching file: ', err);
        }
    }
  }
  async handleSubmit(e){
    e.preventDefault()
    var time = Date.now()
    if (this.state.user !== "" && this.state.file !== "" && this.state.firstName !== "" && this.state.lastName !== "" && this.state.email !== "" && this.state.phoneNumber !== "") {
      Storage.put(this.state.user + "_" + time, this.state.file, { contentType: this.state.file.type})
      .then((result) => {
        alert("Resume Uploaded")
        this.setState({response:`Success uploading file: ${this.state.fileName}!`})
      })
      .then(() => {
        document.getElementById('file-input').value = null
        this.setState({files:null})
      })
      .catch((err) => {
        console.log(err)
        this.setState({response:`Can't upload file: ${err}`})
      })
        try {
          var link = "https://scrambl32545-staging.s3.amazonaws.com/" + this.state.user + "_" + time
          console.log(link)
          if(this.state.userExists !== true){
            await DataStore.save(
              new User({
              "firstName": this.state.firstName,
              "lastName": this.state.lastName,
              "email": this.state.email,
              "phoneNumber": this.state.phoneNumber,
              "resume": link,
              "username": this.state.user,
              "Services": []
            })
            )
            .then(() => {
              alert("User Created")
              window.location.reload();
            })
          }else{
            const main = await DataStore.query(User, this.state.id)
            await DataStore.save(User.copyOf(main, item => {
              item.firstName = this.state.firstName
              item.lastName = this.state.lastName
              item.email = this.state.email
              item.phoneNumber = this.state.phoneNumber
              item.resume = link
              item.username = this.state.user
            }))
            .then(() => {
              alert("User Updated")
              window.location.reload();
            })
          }
        }
        catch (err){
            console.log('error: ', err)
        }
    } else {
        alert("Please fill out all fields")
    }
  }
  onUsernameChange(e){
    this.setState({username: e.target.value})
  }
  onPasswordChange(e){
    this.setState({password: e.target.value})
  }
  onServiceChange(e){
    this.setState({service: e.target.value})
  }
  onLinkChange(e){
    this.setState({link: e.target.value})
  }
  async handleServiceSubmit(e){
    e.preventDefault()
    await DataStore.save(
      new Service({
        "service": this.state.service,
        "username": this.state.username,
        "password": encrypt(this.state.password, this.state.user),
        "userID": this.state.id
      })
    )
    .then(() => {
      alert("Service Created")
      window.location.reload();
    })
  }
    render(){
        return(
            <Jumbotron fluid style={{height: '100vh', margin: '0px'}}>
                <div style = {{margin: '5vh', marginTop: '0px'}}>
                <h1>Settings</h1>
                <div style = {{margin: '5vh'}}>
                <Card>
                <Accordion defaultActiveKey="0">
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0" style = {{textAlign: 'center'}}>
                        <h3><strong>Account Information</strong></h3>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                        <Form id = 'AccountInformation'>                    
                          <Form.Group controlId="formName">
                              <Form.Row>
                              <Col>
                              <Form.Label>First Name</Form.Label><br/>
                              <Form.Control type = 'text' onChange = {this.onFNameChange} value = {this.state.firstName} />
                              </Col>
                              <Col>
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control type = 'text' onChange = {this.onLNameChange} value = {this.state.lastName}/>
                              </Col>
                              </Form.Row>
                          </Form.Group>
                          <Form.Row>
                              <Col>
                              <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label><br/>
                                <Form.Control type = 'email' onChange = {this.onEmailChange} value = {this.state.email}/>
                              </Form.Group>
                              </Col>
                              <Col>
                              <Form.Group controlId="formPhoneNumber">
                                <Form.Label>Phone Number</Form.Label><br/>
                                <Form.Control type = 'number' onChange = {this.onPhoneNumberChange} value = {this.state.phoneNumber}/>
                              </Form.Group>
                              </Col>
                          </Form.Row>
                          <Form.Group controlId="formResume">
                              <Form.Label>Resume</Form.Label><br/>
                              <input id = 'file-input' type="file" accept=".dox, .docx, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, .pdf, .txt" onChange = {this.handleUpload}/><br/><br/>
                              <strong>{this.state.response}</strong>
                              <strong>Existing Link: </strong> {this.state.resume}
                          </Form.Group>
                          <Button size = 'lg' style = {{backgroundColor: "#92D8FF", color: "#FFFFFF",  alignItems: 'center'}} variant="primary" onClick = {this.handleSubmit}>
                            <strong>Submit</strong>
                          </Button>
                        </Form>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1" style = {{textAlign: 'center'}}>
                        <h3><strong>Services</strong></h3>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>
                        <Form id = 'AccountInformation'>                    
                          <Form.Group controlId="formName">
                              <Form.Row>
                              <Col>
                              <Form.Label>Username</Form.Label><br/>
                              <Form.Control type = 'text' onChange = {this.onUsernameChange} value = {this.state.username} />
                              </Col>
                              <Col>
                              <Form.Label>Password</Form.Label>
                              <Form.Control type = 'password' onChange = {this.onPasswordChange} value = {this.state.password}/>
                              </Col>
                              </Form.Row>
                          </Form.Group>
                          <Form.Row>
                              <Col>
                              <Form.Group controlId="formService">
                                <Form.Label>Service</Form.Label><br/>
                                <Form.Control type = 'text' onChange = {this.onServiceChange} value = {this.state.service}/>
                              </Form.Group>
                              </Col>
                              <Col>
                              <Form.Group controlId="formLink">
                                <Form.Label>URL</Form.Label><br/>
                                <Form.Control type = 'text' onChange = {this.onLinkChange} value = {this.state.link}/>
                              </Form.Group>
                              </Col>
                          </Form.Row>
                          <Button size = 'lg' style = {{backgroundColor: "#92D8FF", color: "#FFFFFF",  alignItems: 'center'}} variant="primary" onClick = {this.handleServiceSubmit}>
                            <strong>Submit</strong>
                          </Button>
                        </Form>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                </Card>
                </div>
                </div>
            </Jumbotron>
        )
    }
}
export default withAuthenticator(Settings);