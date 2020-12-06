import React, { useState } from "react";

const BurgerMenu = () => {
  const [clicked, setClicked] = useState(null);

  let clickedClass
  if (clicked === true) {
    clickedClass = 'clicked'
  } else if (clicked === false) {
    clickedClass = "reset_animation"
  } else {
    clickedClass = ''
  }

  return (
    <div className={`hamburger_container ${clickedClass}`} onClick={() => setClicked(!clicked)}>
      <div className="hamburger">
        <div className="hamburger_bar" id="hamburger_crown"></div>
        <div className="hamburger_bar" id="hamburger_patty"></div>
        <div className="hamburger_bar" id="hamburger_heel"></div>
      </div>
    </div>
  );
};

export default BurgerMenu;
