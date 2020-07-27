import React from "react";
import BurgerMenu from "./BurgerMenu";
import NavTitle from "./NavTitle";
import logo from "../assets/chubby_budgie.jpeg";

class NavBar extends React.Component {
  render() {
  
    return (
      <>
        <section className="navBarContainerSection">
          <div className="navBarContainerResponsive">
            <img src={logo} className="navLogo navItem" alt="bujj.it logo" />
            <div className="navTitle navItem">
              <NavTitle />
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
