import React from 'react';
import { connect } from 'react-redux';
import { TOGGLE_NAV_MENU } from 'constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onClickNavMenu: () => dispatch({ type: TOGGLE_NAV_MENU }),
});

const mapStateToProps = state => ({
  navMenu: state.navMenu,
});

const BurgerMenu = props => {
  let clickedClass;
  if (props.navMenu === true) {
    clickedClass = 'clicked';
  } else if (props.navMenu === false) {
    clickedClass = 'reset_animation';
  } else {
    clickedClass = '';
  }

  return (
    <button
      className={`hamburger-container ${clickedClass}`}
      type="button"
      onClick={props.onClickNavMenu}
    >
      <div className="hamburger">
        <div className="hamburger-bar" id="hamburger-crown" />
        <div className="hamburger-bar" id="hamburger-patty" />
        <div className="hamburger-bar" id="hamburger-heel" />
      </div>
    </button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(BurgerMenu);
