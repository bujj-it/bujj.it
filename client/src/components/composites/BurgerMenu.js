import React from "react";

const BurgerMenu = (props) => {

  let clickedClass
  if (props.clicked === true) {
    clickedClass = 'clicked'
  } else if (props.clicked === false) {
    clickedClass = "reset_animation"
  } else {
    clickedClass = ''
  }

  return (
    <div className={`hamburger_container ${clickedClass}`} onClick={props.burgerMenuClick}>
      <div className="hamburger">
        <div className="hamburger_bar" id="hamburger_crown"></div>
        <div className="hamburger_bar" id="hamburger_patty"></div>
        <div className="hamburger_bar" id="hamburger_heel"></div>
      </div>
    </div>
  );
};

export default BurgerMenu;
