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
                            <ListGroupItem ><a href = "https://www.indeed.com/career-advice/resumes-cover-letters/best-resume-skills">10 Best Skills to Include on a Resume</a></ListGroupItem>
                            <ListGroupItem ><a href = "https://www.indeed.com/career-advice/resumes-cover-letters/how-to-write-a-federal-resume">How to write a Federal Resume</a></ListGroupItem>
                            <ListGroupItem ><a href = "https://www.indeed.com/career-advice/resumes-cover-letters/steps-for-building-a-resume">10 Steps for Building a Resume</a></ListGroupItem>
                            <ListGroupItem><a href = "https://www.indeed.com/career-advice/resumes-cover-letters/including-hobbies-and-interests-on-resume">Guide to Including Hobbies and Interests</a></ListGroupItem>
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
                            <ListGroupItem><a href = "https://www.monster.com/career-advice/article/network-at-your-new-job">How to Network at a New Job</a></ListGroupItem>
                            <ListGroupItem><a href = "https://www.themuse.com/advice/how-to-network-at-work-keep-job">5 Tips for Networking at Work</a></ListGroupItem>
                            <ListGroupItem><a href = "https://www.helpguide.org/articles/relationships-communication/job-networking-tips.htm">Job Networking Tips</a></ListGroupItem>
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
                            <ListGroupItem ><a href = "https://www.indeed.com/career-advice/interviewing/what-to-wear-to-an-interview">Best Interview Attire</a></ListGroupItem>
                            <ListGroupItem ><a href = "https://www.indeed.com/career-advice/interviewing/interview-question-what-are-you-passionate-about">Interview Question: What are you Passionate About?</a></ListGroupItem>
                            <ListGroupItem ><a href = "https://www.indeed.com/career-advice/interviewing/what-is-your-teaching-philosophy">Interview Question: What is your Teaching Philosophy?</a></ListGroupItem>
                            <ListGroupItem ><a href = "https://www.indeed.com/career-advice/interviewing/top-interview-questions-and-answers">125 Common Interview Questions and Answers</a></ListGroupItem>
                            <ListGroupItem ><a href = "https://www.indeed.com/career-advice/interviewing/list-of-example-weaknesses-for-interviewing">List of Weaknesses: 10 Things To Say in an Interview</a></ListGroupItem>
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
                        <Accordion.Toggle as={Card.Header}  eventKey="3" style = {{textAlign: 'center'}}>
                        <h1 style = {{color: "#FFFFFF"}}>Adapting to COVID-19</h1>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                        <Card.Body>
                          <ListGroup>
                            <ListGroupItem ><a href = "https://www.indeed.com/career-advice/starting-new-job/first-100-days ">How to Conduct Your First 100 Days in a New Remote Job</a></ListGroupItem>
                            <ListGroupItem ><a href = "https://www.paychex.com/articles/human-resources/retaining-talent-in-covid-19-workplace">How to Adapt and Retain Talent in the COVID-19 Workplace</a></ListGroupItem>
                            <ListGroupItem ><a href = "https://slack.com/blog/collaboration/adapting-to-our-remote-work-reality">Adapting to our new remote-work reality</a></ListGroupItem>
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