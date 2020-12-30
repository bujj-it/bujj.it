import React from "react";
import NavTitle from "../elements/NavTitle";
import logo from "../assets/chubby_budgie.jpeg";
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
            <NavTitle location={this.props.location} />
          </div>
          <NavMenu />
        </div>
      </section>
    );
  }
}

export default NavBar;
