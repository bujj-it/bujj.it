import React from "react";
import DropDownButton from "../elements/DropDownButton"

const DropDownMenu = (props) => {

  const clickedClass = !!props.clicked ? 'clicked' : ''

  return (
    <div className={`nav-dropdown-menu ${clickedClass}`}>
      <DropDownButton buttonLink={'/login'} buttonText={'Login'}/>
      <DropDownButton buttonLink={'/login'} buttonText={'Login'}/>
      <DropDownButton buttonLink={'/login'} buttonText={'Login'}/>
    </div>
  )
};

export default DropDownMenu;