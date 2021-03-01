import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Accordion, Nav, Navbar,ResponsiveEmbed, Image, Jumbotron, ListGroup, Container, Col, Row, Carousel, Card, Button, Form, CardColumns } from 'react-bootstrap';
import Topper from './Topper.js'
import Bottom from './Bottom.js'
import StyledSearch from './StyledSearch.js'
import { Layout} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
class Search extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      jobs: []
    }
  }
  async handleSearch(e){
      var values = e.split(":")
      var position = values[0]
      var location = values[1]
        //PYTHON FETCH
      var search = {
        "position": position,
        "location": location
      }
      const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*"
      }
      console.log(search)
      var results;
      await axios.get(encodeURI(`http://35.174.184.139:8080/?position=${position}&location=${location}`))
        .then(res => {
          console.log(res.data)
          results = res.data
      })
      var finalResults = []
      for (var i = 0; i < results.length; i++){
        var result = JSON.parse(results[i])
        if(result.title !== ""){
          finalResults.push(result)
        }
      }
      this.props.onSearch(finalResults)
    }
    render() {
      return (
        <Header style = {{backgroundColor: "#050401", height: '6.2vh', boxShadow:'0vh 0.2vh', display:'flex'}}>
            <StyledSearch onSearch={(e) => this.handleSearch(e)}/>
        </Header>
      );
    }
  };

export default Search;