import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavTitleDynamic from 'components/elements/navbar/NavTitleDynamic';
import NavTitleStatic from 'components/elements/navbar/NavTitleStatic';
import logo from 'assets/chubby_budgie.jpeg';
import NavMenu from 'components/composites/navbar/NavMenu';

const NavBar = () => (
  <section className="nav-bar-container-section">
    <div className="nav-bar-container-responsive">
      <img src={logo} className="nav-logo nav-item nav-left" alt="bujj.it logo" />
      <Switch>
        <Route exact path="/" component={NavTitleDynamic} />
        <Route path="/" component={NavTitleStatic} />
      </Switch>
      <NavMenu />
    </div>
  </section>
);

export default NavBar;
