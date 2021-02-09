import React from "react";
import BurgerMenu from "./BurgerMenu";
import DropDownMenu from "./DropDownMenu";

const NavMenu = () => {
  return (
    <>
      <div className="nav-item">
        <BurgerMenu />
      </div>
      <DropDownMenu />
    </>
  )
};

export default NavMenu;