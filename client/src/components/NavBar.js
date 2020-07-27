import React from "react";
import BurgerMenu from "./BurgerMenu";
import logo from "../assets/chubby_budgie.jpeg";

class NavBar extends React.Component {
  render() {
    return (
      <>
        <section className="navBarContainerSection">
          <div className="navBarContainerResponsive">
            <img
              src={logo}
              className="navLogo navItem left"
              alt="bujj.it logoe"
            />
            <div className="navTitle navItem left">bujj.it</div>

            <div className="navBurgerMenuContainer navItem right">
              <BurgerMenu />
            </div>
            <div className="navLoginLink navItem right">Login</div>
          </div>
        </section>
      </>
    );
  }
}

export default NavBar;
