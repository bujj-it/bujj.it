import React from "react";
import DropDownButton from "../elements/DropDownButton"

const DropDownMenu = (props) => {

  const clickedClass = !!props.clicked ? 'clicked' : ''

  return (
    <div className={`nav-dropdown-menu ${clickedClass}`}>
      <DropDownButton buttonLink={'/'} buttonText={'Home'} burgerMenuClick={props.burgerMenuClick} />
      <DropDownButton buttonLink={'/login'} buttonText={'Login'} burgerMenuClick={props.burgerMenuClick} />
    </div>
  )
};

export default DropDownMenu;