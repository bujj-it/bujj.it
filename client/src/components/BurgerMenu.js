import React from "react";

const BurgerMenu = () => {
  window.addEventListener("load", function () {
    var hamburgerContainers = document.getElementsByClassName(
      "hamburger_container"
    );
    function addAnimation() {
      this.classList.remove("reset_animation");
      this.classList.add("clicked");
      this.removeEventListener("click", addAnimation);
      this.addEventListener("click", addReverseAnimation);
    }
    function addReverseAnimation() {
      this.classList.remove("clicked");
      this.classList.add("reset_animation");
      this.removeEventListener("click", addReverseAnimation);
      this.addEventListener("click", addAnimation);
    }
    for (var i = 0; i < hamburgerContainers.length; i++) {
      hamburgerContainers[i].addEventListener("click", addAnimation);
    }
  });

  return (
    <>
      <div className="hamburger_container">
        <div className="hamburger">
          <div className="hamburger_bar" id="hamburger_crown"></div>
          <div className="hamburger_bar" id="hamburger_patty"></div>
          <div className="hamburger_bar" id="hamburger_heel"></div>
        </div>
      </div>
    </>
  );
};

export default BurgerMenu;
