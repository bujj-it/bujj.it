import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import NavBar from "./components/section/NavBar";
import Homepage from "./components/section/Homepage";
import Signup from './components/section/Signup';
import Login from './components/section/Login';

import "./styles/App.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="header">
            <NavBar/>
          </header>
          <main className='page'>
            <Switch>
              <Route path="/" component={Homepage}/>
              <Route path='/signup' component={Signup}/>
              <Route path='/login' component={Login}/>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
