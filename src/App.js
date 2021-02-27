import React from 'react'
import './App.css';
import Home from './Home.js'
import About from './About.js'
import Dashboard from './Dashboard.js'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Redirect,
  useHistory
} from "react-router-dom";

export var HOME = '/';
export var ABOUT = '/about';
export var DASHBOARD = '/dashboard'


class App extends React.Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path= {HOME} component={Home}/>
            <Route exact path= {ABOUT} component={About}/>
            <Route exact path= {DASHBOARD} component={Dashboard}/>
          </Switch>
        </Router>

    );
  }
};

export default App;
