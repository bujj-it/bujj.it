import React, { Component } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import "./styles/App.scss";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <div className="App">
            <Route path="/">
              <header className="App-header">
                <NavBar />
              </header>
              Home
            </Route>
            <Route path="/test">Test</Route>
          </div>
        </Switch>
      </Router>
    );
  }
}

export default App;
