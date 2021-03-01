import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import {
    SearchOutlined
  } from '@ant-design/icons';
import styled from "styled-components";
import icon from './assets/icon.svg'
import "./styles.css";

const Form = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: left;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #57CC99;
  padding: 2rem;
  height: 2rem;
  width: 50rem;
  border-radius: 10rem;
  transition: width 300ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const Input = styled.input`
  font-size: 14px;
  line-height: 1;
  background-color: transparent;
  width: 50rem;
  border: none;
  color: white;
  transition: margin 300ms cubic-bezier(0.645, 0.045, 0.355, 1);

  &:focus,
  &:active {
    outline: none;
  }
  &::placeholder {
    color: white;
  }
`;

const Button = styled.button`
  line-height: 1;
  background-color: transparent;
  border: 1px;
  outline: none;
  color: white;
`;

class StyledSearch extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            input: ""
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    onFormSubmit(e){
    // When form submited, clear input, close the searchbar and do something with input
    e.preventDefault();
    this.props.onSearch(this.state.input)
    this.setState({input: ""})
    // After form submit, do what you want with the input value
    }
    handleChange(e){
        this.setState({input: e.target.value})
    }

    render(){
        return (
            <div className="App">
              <Form
                onSubmit={this.onFormSubmit}
              >
                <Button type="submit">
                  <SearchOutlined/>
                </Button>
                <div style = {{marginLeft: '10px'}}>
                    <Input
                    onChange={this.handleChange}
                    value={this.state.input}
                    placeholder="Enter the job position and job location separated by a colon"
                    />
                </div>

              </Form>
            </div>
          );
    }
}

export default StyledSearch;
