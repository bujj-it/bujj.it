import React from 'react';

import {
  RiMoneyPoundCircleFill, RiMoneyPoundCircleLine, RiLoginBoxLine, RiLoginBoxFill, RiEdit2Line, RiEdit2Fill,
} from 'react-icons/ri';
import SidebarButton from 'components/elements/buttons/SidebarButton';

import { YOUR_BUDGET, SIGNUP, LOGIN } from 'constants/dashboardSections.constants';

const Sidebar = props => {
  return (
    <nav className="sidebar">
      <div className="sidebar-title">
        <span className="text">
          Dashboard
        </span>
      </div>

      <div className="section-title">
        budgets
      </div>

      <SidebarButton defaultIcon={RiMoneyPoundCircleLine} highlightIcon={RiMoneyPoundCircleFill} section={YOUR_BUDGET}>
        Your Budget
      </SidebarButton>

      <div className="section-title offset">
        account
      </div>

      <SidebarButton defaultIcon={RiEdit2Line} highlightIcon={RiEdit2Fill} isSelected={false} section={SIGNUP}>
        Sign Up
      </SidebarButton>

      <SidebarButton defaultIcon={RiLoginBoxLine} highlightIcon={RiLoginBoxFill} isSelected={false} section={LOGIN}>
        Login
      </SidebarButton>
    </nav>
  );
};

export default Sidebar;
