import React, { useState } from 'react';
import { connect } from 'react-redux';
import { isDashboardSection } from 'selectors/dashboardSectionSelectors';

import { UPDATE_DASHBOARD_SECTION } from 'constants/actionTypes';

const mapStateToProps = (state, ownProps) => ({
  isSelectedSection: isDashboardSection(state, ownProps.section),
});
const mapDispatchToProps = dispatch => ({
  updateDashboardSection: section => {
    dispatch({ type: UPDATE_DASHBOARD_SECTION, payload: section });
  },
});

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

  const icon = isMouseHovering || props.isSelectedSection ? <HighlightIcon className="icon" /> : <DefaultIcon className="icon" />;

  let buttonClasses = 'sidebar-button';
  if (isMouseHovering) buttonClasses += ' highlight';
  if (props.isSelectedSection) buttonClasses += ' selected';

  const handleSectionButtonClick = () => {
    props.updateDashboardSection(props.section);
  };

  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={handleSectionButtonClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon}
      <span className="text">
        {props.children}
      </span>
    </button>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SidebarButton);
