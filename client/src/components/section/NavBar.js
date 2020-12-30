import React from "react";
import { Route, Switch } from "react-router-dom";

import NavTitleDynamic from "../elements/NavTitleDynamic";
import NavTitleStatic from "../elements/NavTitleStatic";
import logo from "../../assets/chubby_budgie.jpeg";
import NavMenu from '../composites/NavMenu';

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.divRef = React.createRef()
  }

  render() {
    return (
      <section className="navBarContainerSection" ref={this.divRef}>
        <div className="navBarContainerResponsive" >
          <img src={logo} className="navLogo navItem" alt="bujj.it logo" />
          <div className="navItem">
            <Switch >
              <Route exact path='/' component={NavTitleDynamic} />
              <Route path='/' component={NavTitleStatic} />
            </Switch>
          </div>
          <NavMenu />
        </div>
      </section>
    );
  }
}

export default NavBar;
