import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";

import NavBar from "./components/section/NavBar";
import Homepage from "./components/section/Homepage";
import Login from './components/section/Login';

import "./styles/App.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="header">
            <NavBar />
          </header>
          <main className='page'>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path='/login' component={Login} />
              <Route path='/'>
                <Redirect to='/' />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
