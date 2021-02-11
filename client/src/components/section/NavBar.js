import React from "react";
import { Route, Switch } from "react-router-dom";

import NavTitleDynamic from "components/elements/NavTitleDynamic";
import NavTitleStatic from "components/elements/NavTitleStatic";
import logo from "assets/chubby_budgie.jpeg";
import NavMenu from 'components/composites/NavMenu';

const NavBar = () => {
  return (
    <section className="nav-bar-container-section">
      <div className="nav-bar-container-responsive" >
        <img src={logo} className="nav-logo nav-item" alt="bujj.it logo" />
        <Switch >
          <Route exact path='/' component={NavTitleDynamic} />
          <Route path='/' component={NavTitleStatic} />
        </Switch>
        <NavMenu />
      </div>
    </section>
  )
}

export default NavBar;
