import React from "react";
import { Link } from 'react-router-dom';

const DropDownButton = (props) => {

  return (
    <div className='drop-down-button'>
      <Link to={props.buttonLink} onClick={props.burgerMenuClick}>{props.buttonText}</Link>
    </div>
  )
};

export default DropDownButton;