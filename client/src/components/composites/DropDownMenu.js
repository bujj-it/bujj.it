import React from "react";
import DropDownButton from "../elements/DropDownButton"

const DropDownMenu = (props) => {

  const clickedClass = !!props.clicked ? 'clicked' : ''

  return (
    <div className={`nav-dropdown-menu ${clickedClass}`}>
      <DropDownButton buttonLink={'/'} buttonText={'Home'}/>
      <DropDownButton buttonLink={'/signup'} buttonText={'Signup'}/>
      <DropDownButton buttonLink={'/login'} buttonText={'Login'}/>
    </div>
  )
};

export default DropDownMenu;