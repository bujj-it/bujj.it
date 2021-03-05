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

  const icon = isMouseHovering || props.isSelected ? <HighlightIcon className="icon" /> : <DefaultIcon className="icon" />;

  let buttonClasses = 'sidebar-button';
  if (isMouseHovering) buttonClasses += ' highlight';
  if (props.isSelected) buttonClasses += ' selected';

  return (
    <button type="button" className={buttonClasses} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {icon}
      <span className="text">
        {props.children}
      </span>
    </button>
  );
};

export default SidebarButton;
