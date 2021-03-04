import React from "react";
import { connect } from 'react-redux';
import { TOGGLE_NAV_MENU } from 'constants/actionTypes'

const mapDispatchToProps = dispatch => ({
  onClickNavMenu: () =>
    dispatch({ type: TOGGLE_NAV_MENU })
});

const mapStateToProps = state => {
  return {
    navMenu: state.navMenu
  };
}

const BurgerMenu = (props) => {

  let clickedClass
  if (props.navMenu === true) {
    clickedClass = 'clicked'
  } else if (props.navMenu === false) {
    clickedClass = "reset_animation"
  } else {
    clickedClass = ''
  }

  return (
    <div className={`hamburger_container ${clickedClass}`} onClick={props.onClickNavMenu}>
      <div className="hamburger">
        <div className="hamburger_bar" id="hamburger_crown"></div>
        <div className="hamburger_bar" id="hamburger_patty"></div>
        <div className="hamburger_bar" id="hamburger_heel"></div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerMenu);
