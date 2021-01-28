import React from "react"
import { connect } from 'react-redux';
import DropDownButton from "../elements/DropDownButton"

const mapStateToProps = state => {
  return {
    navMenu: state.navMenu
  };
}

const DropDownMenu = props => {

  const clickedClass = !!props.navMenu ? 'clicked' : ''

  return (
    <div className={`nav-dropdown-menu ${clickedClass}`}>
      <DropDownButton buttonLink={'/'} buttonText={'Home'} burgerMenuClick={props.burgerMenuClick} />
      <DropDownButton buttonLink={'/login'} buttonText={'Login'} burgerMenuClick={props.burgerMenuClick} />
    </div>
  )
};

export default connect(mapStateToProps)(DropDownMenu);;