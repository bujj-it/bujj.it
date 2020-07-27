import React from "react";
import logo from './assets/chubby_budgie.jpeg';
import NavBar from './components/NavBar';
import "./styles/App.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <h1>bujj.it</h1>
        <br></br>
        <div className="blurb">Your new budgeting budgie buddy - coming soon!</div>
        <br></br>
        <br></br>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
