import React from "react";
import BurgerMenu from "./BurgerMenu";
import DropDownMenu from "./DropDownMenu";
import NavMenuButton from 'components/elements/NavMenuButton'
import {useLocation} from 'react-router-dom'

const NavMenu = () => {
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