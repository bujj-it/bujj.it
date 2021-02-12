import React from "react";
import BurgerMenu from "./BurgerMenu";
import DropDownMenu from "./DropDownMenu";
import NavMenuButton from 'components/elements/NavMenuButton'
import {useLocation} from 'react-router-dom'
import { navMenuLinksData } from 'constants/navMenu.constants'

const NavMenu = () => {
  const location = useLocation();

  const navMenuLinks = navMenuLinksData.map(link => {
    if (link.pathname !== location.pathname) {
      return (
        <NavMenuButton buttonLink={link.pathname} buttonText={link.text} key={link.pathname}/>
      )
    }
  })
  
  return (
    <div className='nav-item nav-right'>
      {navMenuLinks}
      <div className="burger-menu">
        <BurgerMenu />
      </div>
      <DropDownMenu />
    </div>
  )
};

export default NavMenu;