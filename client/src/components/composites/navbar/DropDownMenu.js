import React from "react"
import { useLocation } from 'react-router-dom'
import { connect } from 'react-redux';

import DropDownButton from "components/elements/buttons/DropDownButton"
import { navMenuLinksData } from 'constants/navMenu.constants'
import { TOGGLE_NAV_MENU } from 'constants/actionTypes'

const mapStateToProps = state => {
  return {
    navMenu: state.navMenu
  };
}

const mapDispatchToProps = dispatch => ({
  toggleNavMenu: () =>
    dispatch({ type: TOGGLE_NAV_MENU })
});

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

  const handleScreenCoverClick = () => {
    props.toggleNavMenu()
  }

  return (
    <div className={`nav-dropdown-menu ${clickedClass}`}>
      <div className='links'>
        {navMenuLinks}
      </div>
      <div className='screen-cover' onClick={handleScreenCoverClick}></div>
    </div>
  )
};

export default connect(mapStateToProps, mapDispatchToProps)(DropDownMenu);