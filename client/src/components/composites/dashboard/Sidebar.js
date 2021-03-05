import React from 'react';
import { connect } from 'react-redux';

import { RiMoneyPoundCircleFill, RiMoneyPoundCircleLine } from 'react-icons/ri';
import SidebarButton from 'components/elements/buttons/SidebarButton';

import { YOUR_BUDGET } from 'constants/dashboardSections.constants';
import { isDashboardSection } from 'selectors/dashboardSectionSelectors';

const mapStateToProps = state => ({
  isYourBudgetSection: isDashboardSection(state, YOUR_BUDGET),
});

const Sidebar = props => {
  return (
    <nav className="sidebar">
      <div className="section-title">
        <span className="text">
          Dashboard
        </span>
      </div>

      <SidebarButton defaultIcon={RiMoneyPoundCircleLine} highlightIcon={RiMoneyPoundCircleFill} isSelected={props.isYourBudgetSection}>
        Your Budget
      </SidebarButton>
    </nav>
  );
};

export default connect(mapStateToProps)(Sidebar);
