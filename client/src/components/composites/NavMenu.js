import React, { useState } from "react";
import BurgerMenu from "./BurgerMenu";
import DropDownMenu from "./DropDownMenu";

const NavMenu = () => {
  const [clicked, setClicked] = useState(null);

  const burgerMenuClick = () => {
    setClicked(!clicked)
  }

  return (
    <div className="navBurgerMenuContainer navItem">
      <BurgerMenu burgerMenuClick={burgerMenuClick} clicked={clicked} />
      <DropDownMenu burgerMenuClick={burgerMenuClick} clicked={clicked} />
    </div>
  )
};

export default NavMenu;