import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Accordion, Nav, Navbar, ResponsiveEmbed, Image, Jumbotron, ListGroup, Container, Col, Row, Carousel, Card, Button, Form, CardColumns } from 'react-bootstrap';
import SideDash from './SideDash.js'
import Bottom from './Bottom.js'
import {setCharAt} from './Functions.js'
import { DataStore } from '@aws-amplify/datastore';
import { User } from './models';
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
      fname: "",
      lname: "",
      email: "",
      phoneNumber: "",
      resume: "",
      file: "",
      fileName: "",
      response: "",
      userExists: false
    }
    this.onFNameChange = this.onFNameChange.bind(this)
    this.onLNameChange = this.onLNameChange.bind(this)
    this.onEmailChange = this.onEmailChange.bind(this)
    this.onPhoneNumberChange = this.onPhoneNumberChange.bind(this)
    this.handleUpload = this.handleUpload.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

    try {
      const models = await DataStore.query(User);
      let check = false
      let index = 0;
      for (var i = 0; i < models.length; i ++){
        if (models[i].username === user){
          check = true
          index = i
        }
      }
      this.setState({userExists: check})
      if(check === true){
        this.setState({id: models[index].id})
        this.setState({fname: models[index].firstName})
        this.setState({lname: models[index].lastName})
        this.setState({email: models[index].email})
        this.setState({phoneNumber: models[index].phoneNumber})
        this.setState({resume: models[index].resume})
      }
    } catch (err) {
      console.log('error fetching user info: ', err);
    }
  }
  onFNameChange(e){
    this.setState({fname: e.target.value})
  }
  onLNameChange(e){
    this.setState({lname: e.target.value})
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
    if (this.state.user !== "" && this.state.file !== ""  && this.state. this.state.fname !== "" && this.state.lname !== "" && this.state.email !== "" && this.state.phoneNumber !== "") {
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
              "firstName": this.state.fname,
              "lastName": this.state.lname,
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
              item.firstName = this.state.fname
              item.lastName = this.state.lname
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
                              <Form.Control placeholder="Enter First Name" onChange = {this.onFNameChange} value = {this.state.fName} />
                              </Col>
                              <Col>
                              <Form.Label>Last Name</Form.Label>
                              <Form.Control placeholder="Enter Last Name" onChange = {this.onLNameChange} value = {this.state.lName}/>
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
                              {this.state.resume !== "" ? (<strong>Existing Link: {this.state.resume}</strong>) : (<></>)}
                              <strong>{this.state.response}</strong>
                          </Form.Group>
                          <Button style = {{backgroundColor: "#92D8FF",  alignItems: 'center', height: '4vh', width: '12vw'}} variant="primary" onClick = {this.handleSubmit}>
                            <h4 style = {{color: '#FFFFFF'}}>Submit</h4>
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