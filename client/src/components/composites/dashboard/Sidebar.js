import React from 'react';
import { RiMoneyPoundCircleFill, RiMoneyPoundCircleLine } from 'react-icons/ri';

import SidebarButton from 'components/elements/buttons/SidebarButton';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="section-title">
        <span className="text">
          Dashboard
        </span>
      </div>

      <SidebarButton defaultIcon={RiMoneyPoundCircleLine} highlightIcon={RiMoneyPoundCircleFill}>
        Your Budget
      </SidebarButton>
    </nav>
  );
};

export default Sidebar;
