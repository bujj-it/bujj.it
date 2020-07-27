import React from "react";
import { useLocation } from "react-router-dom";

const NavTitle = () => {
  let titleClass = "navTitle";
  if (useLocation().pathname == "/") {
    titleClass = "navTitle navTitleHomepage";
    // add event listener for onscroll
  }
  return (
    <>
      <div className={titleClass}>bujj.it</div>
    </>
  );
};

export default NavTitle;
