import React, { Component } from 'react';
import {
  Route, BrowserRouter as Router, Switch, Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store/store';

import NavBar from './components/section/NavBar';
import PageContent from './components/section/PageContent';
import Login from './components/section/Login';

import './styles/App.scss';

const App = props => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header className="header">
            <NavBar />
          </header>
          <main className="page">
            <Switch>
              <Route exact path="/" component={PageContent} />
              <Route path="/login" component={Login} />
              <Route path="/">
                <Redirect to="/" />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
