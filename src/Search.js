import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Accordion, Nav, Navbar,ResponsiveEmbed, Image, Jumbotron, ListGroup, Container, Col, Row, Carousel, Card, Button, Form, CardColumns } from 'react-bootstrap';
import Topper from './Topper.js'
import Bottom from './Bottom.js'
import StyledSearch from './StyledSearch.js'
import { Layout} from 'antd';
const { Header, Content, Footer, Sider } = Layout;
export class Search extends React.Component {
    async handleSearch(e){
      var values = e.split(":")
      var position = values[0]
      var location = values[1]
        //PYTHON FETCH
      var search = {
        "position": position,
        "location": location
      }

      axios.post(`http://35.174.184.139:5000/`, search)
      .then(res => {
        console.log(res)
      })

      axios.get(`http://35.174.184.139:5000/?position=${position}&location=${location}`)
        .then(res => {
          console.log(res)
      })
        
    }
    render() {
      return (
        <Header style = {{backgroundColor: "#050401", height: '6.2vh', boxShadow:'0vh 0.2vh', display:'flex'}}>
            <StyledSearch onSearch={this.handleSearch}/>
        </Header>
      );
    }
  };

export default Search;