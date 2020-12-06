import React, { useState } from "react";

const DropDownMenu = (props) => {

  const clickedClass = !!props.clicked ? 'clicked' : ''

  return (
    <div className={`nav-dropdown-menu ${clickedClass}`}>
      test
    </div>
  )
};

export default DropDownMenu;