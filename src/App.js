import React from 'react'
import './App.css';
import Home from './Home.js'
import Dashboard from './Dashboard.js'
import Guide from './Guide.js'
import Settings from './Settings.js'
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
export var DASHBOARD = '/dashboard';
export var GUIDE = '/guide'
export var SETTINGS = '/settings'


class App extends React.Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path= {HOME} component={Home}/>
            <Route path= {DASHBOARD} component={Dashboard}/>
            <Route path= {GUIDE} component={Guide}/>
            <Route path= {SETTINGS} component={Settings}/>
          </Switch>
        </Router>

    );
  }
};

export default App;
