import React from "react"
import { connect } from 'react-redux';
import DropDownButton from "../elements/DropDownButton"
import {useLocation} from 'react-router-dom'
import { navMenuLinksData } from 'constants/navMenu.constants'

const mapStateToProps = state => {
  return {
    navMenu: state.navMenu
  };
}

const DropDownMenu = props => {
  const location = useLocation();

  const navMenuLinks = navMenuLinksData.map(link => {
    if (link.pathname !== location.pathname) {
      return (
        <DropDownButton buttonLink={link.pathname} buttonText={link.text} key={link.pathname}/>
      )
    }
  })

  const clickedClass = !!props.navMenu ? 'clicked' : ''

  return (
    <div className={`nav-dropdown-menu ${clickedClass}`}>
      {navMenuLinks}
    </div>
  )
};

export default connect(mapStateToProps)(DropDownMenu);