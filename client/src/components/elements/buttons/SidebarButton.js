import React, { useState } from 'react';

const SidebarButton = props => {
  const [isMouseHovering, setIsMouseHovering] = useState(false);

  const handleMouseEnter = () => {
    setIsMouseHovering(true);
  };

  const handleMouseLeave = () => {
    setIsMouseHovering(false);
  };

  const DefaultIcon = props.defaultIcon;
  const HighlightIcon = props.highlightIcon;

  const icon = isMouseHovering ? <HighlightIcon className="icon" /> : <DefaultIcon className="icon" />;

  return (
    <button type="button" className="sidebar-button" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {icon}
      <span className="text">
        {props.children}
      </span>
    </button>
  );
};

export default SidebarButton;
