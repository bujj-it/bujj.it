import React from "react";
import { Link } from 'react-router-dom';

const DropDownButton = (props) => {

  return (
    <div className='drop-down-button'>
      <Link to={props.buttonLink}>{props.buttonText}</Link>
    </div>
  )
};

export default DropDownButton;