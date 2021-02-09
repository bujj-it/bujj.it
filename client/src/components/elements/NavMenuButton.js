import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RESET_NAV_MENU } from 'constants/actionTypes'

const mapDispatchToProps = dispatch => ({
  closeNavMenu: () =>
    dispatch({ type: RESET_NAV_MENU })
});

const NavMenuButton = props => {

  useEffect(() => {
    props.closeNavMenu()
  })

  return (
    <div className='nav-menu-button'>
      <Link to={props.buttonLink} onClick={props.onClickNavMenu}>{props.buttonText}</Link>
    </div>
  )
};

export default connect(null, mapDispatchToProps)(NavMenuButton);