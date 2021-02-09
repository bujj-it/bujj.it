import React from "react";
import { connect } from 'react-redux';
import { TOGGLE_NAV_MENU } from '../../constants/actionTypes'
import { Link } from 'react-router-dom';

const mapDispatchToProps = dispatch => ({
  onClickNavMenu: () =>
    dispatch({ type: TOGGLE_NAV_MENU })
});


const DropDownButton = props => {
  return (
    <div className='drop-down-button'>
      <Link to={props.buttonLink} onClick={props.onClickNavMenu}>{props.buttonText}</Link>
    </div>
  )
};

export default connect(null, mapDispatchToProps)(DropDownButton);