import React from "react";
import BurgerMenu from "./BurgerMenu";
import DropDownMenu from "./DropDownMenu";

const NavMenu = () => {
  return (
    <div className="navBurgerMenuContainer navItem">
      <BurgerMenu />
      <DropDownMenu />
    </div>
  )
};

export default NavMenu;