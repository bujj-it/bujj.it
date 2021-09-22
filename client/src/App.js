import React from 'react';

import logo from 'assets/logo.png';

import 'styles/App.scss';

const App = () => {
  return (
    <>
      <header className="flex-center">
        <h1>
          Bujj.it
        </h1>
      </header>
      <main className="flex-center">
        <img src={logo} className="logo" alt="bujjit" />
        <div className="main-text">
          coming soon
        </div>
      </main>
    </>
  );
};

export default App;
