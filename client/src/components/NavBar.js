import React from "react";
import BurgerMenu from "./BurgerMenu";
import NavTitle from "./NavTitle";
import logo from "../assets/chubby_budgie.jpeg";

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.divRef = React.createRef()
  }
  
  render() {
 
    return (
      <>
        <section className="navBarContainerSection" ref={this.divRef}>
          <div className="navBarContainerResponsive" >
            <img src={logo} className="navLogo navItem" alt="bujj.it logo" />
            <div className="navItem">
              <NavTitle location={this.props.location} />
            </div>


            <div className="navBurgerMenuContainer navItem">
              <BurgerMenu />
            </div>
          </div>
        </section>
      </>
    );
  }
}

export default NavBar;
