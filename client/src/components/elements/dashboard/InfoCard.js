import React from 'react';

const InfoCard = props => {
  return (
    <div className="info-card">
      {props.children}
    </div>
  );
};

export default InfoCard;
