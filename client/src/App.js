import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch, Redirect } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './store/store';

import NavBar from "./components/section/NavBar";
import Homepage from "./components/section/Homepage";
import {Login} from './components/section/Login';

import "./styles/App.scss";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
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
      </Provider>
    );
  }
}

export default App;
