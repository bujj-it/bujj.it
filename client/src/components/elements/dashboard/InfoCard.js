import React from 'react';

const InfoCard = props => {
  return (
    <div className={`info-card ${props.className ? props.className : ''}`}>
      {props.children}
    </div>
  );
};

export default InfoCard;
