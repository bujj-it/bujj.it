import React from "react";
import BurgerMenu from "./BurgerMenu";
import DropDownMenu from "./DropDownMenu";
import NavMenuButton from 'components/elements/NavMenuButton'
import {useLocation} from 'react-router-dom'

const NavMenu = props => {
  const location = useLocation();

  const navMenuLinksData = [
    {
      pathname: '/',
      text: 'Home'
    },
    {
      pathname: '/login',
      text: 'Login'
    }
  ]

  const navMenuLinks = navMenuLinksData.map(link => {
    if (link.pathname !== location.pathname) {
      return (
        <div className="nav-item" key={link.pathname}>
          <NavMenuButton buttonLink={link.pathname} buttonText={link.text}/>
        </div>
      )
    }
  })
  
  return (
    <>
      {navMenuLinks}
      <div className="nav-item burger-menu">
        <BurgerMenu />
      </div>
      <DropDownMenu />
    </>
  )
};

export default NavMenu;